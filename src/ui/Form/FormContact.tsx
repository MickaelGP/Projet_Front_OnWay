"use client"
// Import des hooks React nécessaires et des fonctions de validation personnalisées
import { useState, useEffect } from "react";
import { validationEmail, valideTelephone } from '@/utils/validation';
export default function FormContact() {
    // Déclaration des états (state) pour chaque champ du formulaire
    const [nom, setNom] = useState('');
    const [adresseEmail, setAdresseEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [titre, setTitre] = useState('');
    const [message, setMessage] = useState('');

    // États pour la validation générale, les erreurs et les messages de succès
    const [valide, setValide] = useState(false);
    const [erreur, setErreur] = useState("")
    const [success, setSuccess] = useState("");

    // useEffect permet de vérifier la validité globale du formulaire à chaque changement des champs concernés
    useEffect(() => {
        setValide(validationEmail(adresseEmail) && valideTelephone(telephone));
    }, [adresseEmail, telephone]); // Le hook est déclenché à chaque changement de ces champ

    // Fonction déclenchée à la soumission du formulaire
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();// Empêche le rechargement de la page
        try {
            // Envoie des données utilisateur au backend via une requête POST
            const resp = await fetch('/api/contact/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nom, adresseEmail, telephone, titre, message }) // Seuls les champs requis par l’API sont envoyés
            });

            // Si la réponse n’est pas "OK", on gère les erreurs
            if (!resp.ok) {
                const err = await resp.json();// Récupère l'erreur renvoyée par le backend

                // Exemple de gestion d'erreur spécifique
                if (err.data.status == 400) {
                    setErreur("Tous les champs sont requis");
                }

                // Message d’erreur générique
                setErreur(err.data.detail);
            }
            // Si tout se passe bien, on vide les champs et affiche un message de succès
            const data = await resp.json();
            setAdresseEmail("");
            setNom("");
            setTelephone("");
            setTitre("")
            setMessage("");

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
            <h1 className="text-center">Nous contacter</h1>
            <div className="container w-75 my-5">
                <form onSubmit={handleSubmit} className="my-5 py-5 px-3">
                    <div className="mb-3">
                        <label htmlFor="contactNom" className="form-label">Votre nom :</label>
                        <input type="text" className="form-control" name="nom" id="contactNom" placeholder="Nom :" required value={nom} onChange={(e) => setNom(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contactEmail" className="form-label">Votre email :</label>
                        <input type="email" className="form-control" name="adresseEmail" id="contactEmail" placeholder="Email :" required value={adresseEmail} onChange={(e) => setAdresseEmail(e.target.value)} />
                        {adresseEmail && !validationEmail(adresseEmail) && (
                            <p className="text-danger">Format invalide</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contactTelephone" className="form-label">Votre téléphone :</label>
                        <input type="tel" className="form-control" name="telephone" id="contactTelephone" placeholder="Téléphone :" required value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                        {telephone && !valideTelephone(telephone) && (
                            <p className="text-danger">Format invalide</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contactTitre" className="form-label">L'objet de votre demande :</label>
                        <input type="text" className="form-control" name="titre" id="contactTitre" placeholder="Titre :" required value={titre} onChange={(e) => setTitre(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contactDescription" className="form-label">Votre message :</label>
                        <textarea className="form-control" name="message" id="contactDescription" placeholder="Votre message :" required value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary" id="btnContact" disabled={!valide}>Envoyer</button>
                    </div>
                </form>
            </div>
        </section>
    );
}