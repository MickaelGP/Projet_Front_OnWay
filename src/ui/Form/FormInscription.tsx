"use client"
// Import des hooks React nécessaires et des fonctions de validation personnalisées
import { useState, useEffect } from "react";
import { validationEmail, validationMdp, mdpIdentique, verifAge, valideNom } from '@/utils/validation';
import SelectGenre from "@/components/SelectGenre";

export default function FormInscription() {
    // Déclaration des états (state) pour chaque champ du formulaire
    const [UtilEmail, setUtilEmail] = useState('');
    const [UtilMdp, setUtilMdp] = useState('');
    const [UtilPseudo, setUtilPseudo] = useState('');
    const [UtilNaissance, setUtilNaissance] = useState('');
    const [UtilMdpConfirm, setUtilMdpConfirm] = useState('');
    const [UtilGenre, setUtilGenre] = useState('');

    // États pour la validation générale, les erreurs et les messages de succès
    const [valide, setValide] = useState(false);
    const [erreur, setErreur] = useState("")
    const [success, setSuccess] = useState("");

    // useEffect permet de vérifier la validité globale du formulaire à chaque changement des champs concernés
    useEffect(() => {
        setValide(validationEmail(UtilEmail) && validationMdp(UtilMdp) && mdpIdentique(UtilMdp, UtilMdpConfirm) && verifAge(UtilNaissance) && valideNom(UtilPseudo));
    }, [UtilEmail, UtilMdp, UtilMdpConfirm, UtilNaissance, UtilPseudo]); // Le hook est déclenché à chaque changement de ces champ

    // Fonction déclenchée à la soumission du formulaire
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();// Empêche le rechargement de la page
        try {
            // Envoie des données utilisateur au backend via une requête POST
            const resp = await fetch('/api/inscription/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ UtilEmail, UtilMdp, UtilPseudo, UtilGenre, UtilNaissance }) // Seuls les champs requis par l’API sont envoyés
            });
           
            // Si la réponse n’est pas "OK", on gère les erreurs
            if (!resp.ok) {
                const err = await resp.json();// Récupère l'erreur renvoyée par le backend
                console.log(err)
                // Exemple de gestion d'erreur spécifique
                if (err.error) {
                    setErreur(err.error);
                    return
                }

                // Message d’erreur générique
                setErreur(err.data.detail);
            }
            // Si tout se passe bien, on vide les champs et affiche un message de succès
            const data = await resp.json();
            setUtilEmail("");
            setUtilGenre("");
            setUtilMdp("");
            setUtilMdpConfirm("")
            setUtilNaissance("");
            setUtilPseudo("")
            setSuccess(data.data.message) // Message retourné par l’API

        } catch (err) {
            // Si une erreur réseau ou serveur survient, on l'affiche dans la console
            console.log(err);
        }
    }
    return (
        <section className="sectionConexion container my-5">
            {erreur && (
                <div className="w-50 mt-5 alert alert-danger text-center container">
                    {erreur}
                </div>
            )}
            {success && (
                <div className="w-50 mt-5 alert alert-success text-center container">
                    {success}
                </div>
            )}
            <h1 className="text-center">Inscription</h1>
            <div className="container w-75 my-5">
                <form onSubmit={handleSubmit} className="my-5">
                    <div className="mb-3">
                        <input type="text" className="form-control" name="UtilPseudo" id="inscriptionPseudo" placeholder="Pseudo :" required value={UtilPseudo} onChange={(e) => setUtilPseudo(e.target.value)} />
                        {UtilPseudo && !valideNom(UtilPseudo) && (
                            <p className="text-danger">Le pseudo doit être compris entre 5 et 10 carractéres</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" name="UtilEmail" id="inscriptionEmail" placeholder="Email :" required value={UtilEmail} onChange={(e) => setUtilEmail(e.target.value)} />
                        {UtilEmail && !validationEmail(UtilEmail) && (
                            <p className="text-danger">Format invalide</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" name="UtilMdp" id="inscriptionPassword" placeholder="Mot de passe :" required value={UtilMdp} onChange={(e) => setUtilMdp(e.target.value)} />
                        {UtilMdp && !validationMdp(UtilMdp) && (
                            <p className="text-danger">Le mot de passe doit comporter au minimun 8 carractéres, un chiffre et un carractéres spécial</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" name="confirmation_UtilMdp" id="inscriptionPasswordConfirmation" placeholder="Confirmation du mot de passe :" required value={UtilMdpConfirm} onChange={(e) => setUtilMdpConfirm(e.target.value)} />
                        {UtilMdpConfirm && !mdpIdentique(UtilMdp, UtilMdpConfirm) && (
                            <p className="text-danger">Les mot de passe ne corresponde pas</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inscriptionNaissance" className="form-label">Votre date de naissance</label>
                        <input type="date" className="form-control" name="UtilNaissance" id="inscriptionNaissance" required value={UtilNaissance} onChange={(e) => setUtilNaissance(e.target.value)} />
                        {UtilNaissance && !verifAge(UtilNaissance) && (
                            <p className="text-danger">Vous n&apos;êtes pas majeur</p>
                        )}
                    </div>
                    <SelectGenre genre={UtilGenre} setGenre={setUtilGenre} />
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary" id="btnInscription" disabled={!valide}>Inscription</button>
                    </div>
                </form>
            </div>
        </section>
    );
}