"use client"
// Import des hooks React nécessaires et des fonctions de validation personnalisées
import { useState, useEffect } from "react";
import { validationEmail, valideTelephone, valideMessageContact, valideTitreContact, valideNom } from '@/utils/validation';
import PrimaryButton from "@/components/PrimaryButton";
import ErreurAlert from "@/components/ErreurAlert";
import SuccesAlert from "@/components/SuccessAlert";
import InputForm from "@/components/InputForm";
import TextArea from "@/components/TexteArea";
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
        setValide(validationEmail(adresseEmail) && valideTelephone(telephone) && valideTitreContact(titre) && valideMessageContact(message) && valideNom(nom));
    }, [adresseEmail, telephone, titre, message, nom]); // Le hook est déclenché à chaque changement de ces champ

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
            console.error(err)
            setErreur("Service momentanément inutilisable merci de ressayer plus tard")
        }
    }
    console.log(message)
    return (
        <section className="sectionConexion container my-5">
            {erreur && (<ErreurAlert message={erreur} />)}
            {success && (<SuccesAlert message={success} />)}
            <h1 className="text-center">Nous contacter</h1>
            <div className="container w-75 my-5">
                <form onSubmit={handleSubmit} className="my-5 py-5 px-3">
                    <InputForm label="Votre nom :" type="text" name="nom" id="ContactNom" classDiv="mb-3" required value={nom} onChange={(value: string) => setNom(value)} />
                    {nom && !valideNom(nom) && (
                        <p className="text-danger">Le nom doit faire au minimum 5 caractères.</p>
                    )}

                    <InputForm label="Votre email :" type="email" name="adresseEmail" id="ContactEmail" classDiv="mb-3" required value={adresseEmail} onChange={(value: string) => setAdresseEmail(value)} />
                    {adresseEmail && !validationEmail(adresseEmail) && (
                        <p className="text-danger">Format invalide</p>
                    )}

                    <InputForm label="Votre téléphone :" type="tel" name="telephone" id="contactTelephone" classDiv="mb-3" required value={telephone} onChange={(value: string) => setTelephone(value)} />
                    {telephone && !valideTelephone(telephone) && (
                        <p className="text-danger">Format invalide</p>
                    )}

                    <InputForm label="L'objet de votre demande :" type="text" name="titre" id="contactTitre" classDiv="mb-3" required value={titre} onChange={(value: string) => setTitre(value)} />
                    {titre && !valideTitreContact(titre) && (
                        <p className="text-danger">Votre titre doit faire au minimum 5 caractères.</p>
                    )}

                    <TextArea classDiv="mb-3" label="Votre message :" name="message" id="contactMessage" placeHolder="Votre message :" required value={message} onChange={(value: string) => setMessage(value)} />
                    {message && !valideMessageContact(message) && (
                        <p className="text-danger">Votre message doit faire au minimum 10 caractères et maximun 255.</p>
                    )}
                    <PrimaryButton type="submit" classDiv="text-center" classBtn="btn btn-primary" id="btnContact" disabled={!valide} text="Envoyer" />
                </form>
            </div>
        </section>
    );
}