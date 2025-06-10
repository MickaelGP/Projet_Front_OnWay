"use client"
import { useState, useEffect } from "react";
import { validationEmail, validationMdp } from '@/utils/validation';
import { useRouter } from 'next/navigation';
export default function FormConnexion() {
    const router = useRouter();

    const [utilEmail, setUtilEmail] = useState<string>('');
    const [utilMdp, setUtilMdp] = useState<string>('');

    // États pour la validation générale, les erreurs et les messages de succès
    const [valide, setValide] = useState(false);
    const [erreur, setErreur] = useState<string>('');

    // useEffect permet de vérifier la validité globale du formulaire à chaque changement des champs concernés
    useEffect(() => {
        setValide(validationEmail(utilEmail) && validationMdp(utilMdp));
    }, [utilEmail, utilMdp]); // Le hook est déclenché à chaque changement de ces champ

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const resp = await fetch('/api/connexion/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ utilEmail, utilMdp })
            });

            // Si la réponse n’est pas "OK", on gère les erreurs
            if (!resp.ok) {
                const err = await resp.json();// Récupère l'erreur renvoyée par le backend

                // Exemple de gestion d'erreur spécifique
                if (err.data.status == 400) {
                    setErreur("Tous les champs sont requis");
                    return;
                } else if (err.data.status == 401) {
                    setErreur(err.data.detail);
                    return;
                } else if (err.data.status == 404) {
                    setErreur(err.data.detail);
                    return;
                }
            }

            const data = await resp.json();
            if (data.data.utilisateur.roleLabel === "Passager") {
                if (window.localStorage.getItem("covoitPath")) {
                    const path = window.localStorage.getItem("covoitPath");
                    router.push(path as string);
                    window.localStorage.removeItem("covoitPath");
                    return;
                }
                router.push("/utilisateur");
            } else if (data.data.utilisateur.roleLabel === "Admin") {
                router.push("/admin");
            }
            setUtilEmail("");
            setUtilMdp("");

        } catch (err) {
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
                        <input type="email" className="form-control" name="utilEmail" id="connexionEmail" placeholder="Email :" required value={utilEmail} onChange={(e) => setUtilEmail(e.target.value)} />
                        {utilEmail && !validationEmail(utilEmail) && (
                            <p className="text-danger">Format invalide</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="utilMdp" className="form-label">Votre mot de passe :</label>
                        <input type="password" className="form-control" name="utilMdp" id="connexionPassword" placeholder="Mot de passe :" required value={utilMdp} onChange={(e) => setUtilMdp(e.target.value)} />
                        {utilMdp && !validationMdp(utilMdp) && (
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