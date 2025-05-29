"use client";
import { useState, useEffect } from "react";
import { validationMdp, mdpIdentique } from '@/utils/validation';
export default function UtilModifMdp() {
    const [valide, setValide] = useState<boolean>(false);
    const [erreur, setErreur] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    // Déclaration des états pour les champs du formulaire
    const [utilMdp, setUtilMdp] = useState<string>('');
    const [oldMdp, setOldMdp] = useState<string>('');
    const [confirmMdp, setConfirmMdp] = useState<string>('');
    //
    useEffect(() => {
        setValide(validationMdp(utilMdp) && mdpIdentique(utilMdp, confirmMdp) && validationMdp(oldMdp));
    }, [utilMdp, confirmMdp, oldMdp]); // Le hook est déclenché à chaque changement de ces champs

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();// Empêche le rechargement de la page
        try {
            // Envoie des données utilisateur au backend via une requête POST
            const resp = await fetch('/api/utilisateur/updateMdp', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ utilMdp, oldMdp }) // Seuls les champs requis par l’API sont envoyés
            });

            // Si la réponse n’est pas "OK", on gère les erreurs
            if (!resp.ok) {
                const err = await resp.json();// Récupère l'erreur renvoyée par le backend

                // Exemple de gestion d'erreur spécifique
                if (err.data.status == 400) {
                    setErreur(err.data.detail);
                    return;
                } else {
                    setErreur(err.data.detail);
                    return;
                }

                // Message d’erreur générique

            }
            // Si tout se passe bien, on vide les champs et affiche un message de succès
            const data = await resp.json();

            setSuccess(data.data.message) // Message retourné par l’API

        } catch (err) {
            // Si une erreur réseau ou serveur survient, on l'affiche dans la console
            console.log(err);
        }
    }

    return (<>
        <section>
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
            <h1 className="text-center">Modifier votre mot de passe</h1>
            <form onSubmit={handleSubmit} className="container my-5">
                <div className="mb-3">
                    <label htmlFor="oldMdp">Mot de passe actuel :</label>
                    <input type="password" id="oldMdp" name="oldMdp" className="form-control" required value={oldMdp} onChange={(e) => setOldMdp(e.target.value)} />
                    {oldMdp && !validationMdp(oldMdp) && (
                        <p className="text-danger">Le mot de passe doit comporter au minimun 8 carractéres, un chiffre et un carractéres spécial</p>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="nouveauMdp">Nouveau mot de passe :</label>
                    <input type="password" id="utilMdp" name="utilMdp" className="form-control" required value={utilMdp} onChange={(e) => setUtilMdp(e.target.value)} />
                    {utilMdp && !validationMdp(utilMdp) && (
                        <p className="text-danger">Le mot de passe doit comporter au minimun 8 carractéres, un chiffre et un carractéres spécial</p>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmMdp">Confirmer le nouveau mot de passe :</label>
                    <input type="password" id="confirmMdp" name="confirmMdp" className="form-control" required value={confirmMdp} onChange={(e) => setConfirmMdp(e.target.value)} />
                    {confirmMdp && !mdpIdentique(utilMdp, confirmMdp) && (
                        <p className="text-danger">Les mot de passe ne corespondent pas</p>
                    )}
                </div>
                <div className="my-5 text-center">
                    <button type="submit" className="btn btn-primary" disabled={!valide}>Modifier le mot de passe</button>
                </div>
            </form>
        </section>
    </>)
}