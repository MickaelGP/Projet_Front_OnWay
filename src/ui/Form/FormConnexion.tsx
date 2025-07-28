"use client"
import { useState, useEffect } from "react";
import { validationEmail, validationMdp } from '@/utils/validation';
import { useRouter } from 'next/navigation';
import InfoConnexion from '@/interfaces/infoConexion';
export default function FormConnexion() {
    const router = useRouter();
    const [infoConnexion, setInfoConnexion] = useState<InfoConnexion>({utilEmail: '', utilMdp: ''});
    // État pour stocker l'email saisi par l'utilisateur
    // const [utilEmail, setUtilEmail] = useState<string>('');
    // État pour stocker le mot de passe saisi par l'utilisateur
    // const [utilMdp, setUtilMdp] = useState<string>('');

    // État pour savoir si le formulaire est valide
    const [valide, setValide] = useState(false);
    // État pour afficher un message d'erreur si besoin
    const [erreur, setErreur] = useState<string>('');

    // Vérifie si l'email et le mot de passe sont valides à chaque modification
    useEffect(() => {
        setValide(validationEmail(infoConnexion.utilEmail) && validationMdp(infoConnexion.utilMdp));
    }, [infoConnexion]); // Ce code s'exécute à chaque fois que l'email ou le mot de passe change

    // Fonction appelée lors de la soumission du formulaire
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Empêche le rechargement de la page
        try {
            // Envoie une requête POST à l'API pour tenter de se connecter
            const resp = await fetch('/api/connexion/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ infoConnexion })
            });

            // Si la connexion échoue, on affiche un message d'erreur adapté
            if (!resp.ok) {
                const err = await resp.json(); // On récupère l'erreur envoyée par le backend
                // Gestion des différents cas d'erreur
                if (resp.status == 400) {
                    setErreur(err.error);
                    return;
                } else if (err.data.status == 401) {
                    setErreur(err.data.detail);
                    return;
                } else if (err.data.status == 404) {
                    setErreur(err.data.detail);
                    return;
                }
            }

            // Si la connexion réussit, on récupère les données de l'utilisateur
            const data = await resp.json();

            // Si l'utilisateur est un passager, on le redirige vers la page précédente ou vers /utilisateur
            if (data.data.utilisateur.roleLabel === "Passager") {
                if (window.localStorage.getItem("covoitPath")) {
                    const path = window.localStorage.getItem("covoitPath");
                    router.push(path as string);
                    window.localStorage.removeItem("covoitPath");
                    return;
                }
                router.push("/utilisateur");
            } else if (data.data.utilisateur.roleLabel === "Admin") {
                // Si l'utilisateur est un admin, on le redirige vers la page admin
                router.push("/admin");
            }
            // On vide les champs du formulaire après la connexion
            // setUtilEmail("");
            // setUtilMdp("");
            setInfoConnexion({utilEmail:'', utilMdp: ''})

        } catch (err) {
            // Affiche une erreur en cas de problème réseau ou autre
            console.log(err);
        }
    }
    return (
        <section className="sectionConexion container py-5">
            {erreur && (
                <div className="w-50 mt-5 alert alert-danger text-center container">
                    {erreur}
                </div>
            )}
            <h1 className="text-center">Connexion</h1>
            <div className="container w-75 py-5">
                <form onSubmit={handleSubmit} className="my-5">
                    <div className="mb-3">
                        <label htmlFor="utilEmail" className="form-label">Votre email :</label>
                        <input type="email" className="form-control" name="utilEmail" id="connexionEmail" placeholder="Email :" required value={infoConnexion.utilEmail} onChange={(e) => setInfoConnexion({...infoConnexion, utilEmail: e.target.value})} />
                        {infoConnexion.utilEmail && !validationEmail(infoConnexion.utilEmail) && (
                            <p className="text-danger">Format invalide</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="utilMdp" className="form-label">Votre mot de passe :</label>
                        <input type="password" className="form-control" name="utilMdp" id="connexionPassword" placeholder="Mot de passe :" required value={infoConnexion.utilMdp} onChange={(e) => setInfoConnexion({...infoConnexion, utilMdp: e.target.value})} />
                        {infoConnexion.utilMdp && !validationMdp(infoConnexion.utilMdp) && (
                            <p className="text-danger">Le mot de passe doit comporter au minimun 8 carractéres, un chiffre et un carractéres spécial</p>
                        )}
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary" id="btnConexion" disabled={!valide}>Connexion</button>
                    </div>
                </form>
            </div>
        </section>
    );
}