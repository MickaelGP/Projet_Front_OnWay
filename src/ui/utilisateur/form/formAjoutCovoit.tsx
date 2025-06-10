"use client";
// Importation des composants
import VoitureUtil from "@/components/utilisateurs/VoitureUtil";
// Importation des fonctions de validations
import { valideCpVille, valideAdresse } from "@/utils/validation";
// Importation des hooks React
import { useState, useEffect } from "react";

export default function FormAjoutCovoit() {
    // Etat pour les champs du formulaire
    const [voitId, setVoitId] = useState<number | null>(null);
    const [covoitDate, setCovoitDate] = useState<string>("");
    const [adresseNumDepart, setAdresseNumDepart] = useState<string>("");
    const [adresseRueDepart, setAdresseRueDepart] = useState<string>("");
    const [adresseCpDepart, setAdresseCpDepart] = useState<string>("");
    const [adresseVilleDepart, setAdresseVilleDepart] = useState<string>("");
    const [adresseNumArriver, setAdresseNumArriver] = useState<string>("");
    const [adresseRueArriver, setAdresseRueArriver] = useState<string>("");
    const [adresseCpArriver, setAdresseCpArriver] = useState<string>("");
    const [adresseVilleArriver, setAdresseVilleArriver] = useState<string>("");
    const [covoitPrix, setCovoitPrix] = useState<string>("");
    const [covoitDep, setCovoitDep] = useState<string>("");
    const [covoitArr, setCovoitArr] = useState<string>("");
    const [covoitFumer, setCovoitFumer] = useState<boolean>(false);
    const [covoitAnimaux, setCovoitAnimaux] = useState<boolean>(false);
    const [covoitMusique, setCovoitMusique] = useState<boolean>(false);

    // Etat pour la validation et les messages
    const [erreur, setErreur] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [valide, setValide] = useState<boolean>(false);

    // Fonction pour gérer la sélection de la voiture
    const handleSelectChangeVoiture = (value: number) => {
        setVoitId(value);
    }

    // Validation les champs du formulaire
    useEffect(() => {
        setValide(valideCpVille(adresseCpDepart) && valideCpVille(adresseCpArriver) && valideAdresse(adresseRueDepart) && valideAdresse(adresseRueArriver) && valideAdresse(adresseVilleArriver) && valideAdresse(adresseVilleDepart) && parseFloat(covoitPrix) > 0)
    }, [adresseCpArriver, adresseCpDepart, adresseRueArriver, adresseRueDepart, adresseVilleArriver, adresseVilleDepart, covoitPrix]);

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // Empêche le rechargement de la page
        e.preventDefault();
        try {
            const response = await fetch("/api/utilisateur/ajouterCovoit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    voitId,
                    covoitDate,
                    adresseNumDepart,
                    adresseRueDepart,
                    adresseCpDepart,
                    adresseVilleDepart,
                    adresseNumArriver,
                    adresseRueArriver,
                    adresseCpArriver,
                    adresseVilleArriver,
                    covoitPrix,
                    covoitDep,
                    covoitArr,
                    covoitFumer,
                    covoitAnimaux,
                    covoitMusique
                })
            });
            // Vérifie si la réponse est correcte
            if (!response.ok) {
                // Si la réponse n'est pas correcte, on récupère le message d'erreur
                const error = await response.json();
                // Gère les erreurs spécifiques
                if (error.data.status === 400) {
                    // Si le statut est 400, on affiche un message d'erreur générique
                    setErreur("Tous les champs sont obligatoires.");
                    return;
                } else if (error.data.status === 409) {
                    // Si le statut est 409, on affiche un message d'erreur spécifique
                    setErreur(error.data.detail);
                    return;
                }
                // Pour les autres erreurs, on affiche le détail de l'erreur
                setErreur(error.data.detail);
                return;
            }

            // Si la réponse est correcte, on récupère le message de succès
            const data = await response.json();

            // On affiche le message de succès
            setSuccess(data.data.message);

            // On réinitialise les champs du formulaire
            setCovoitDate("");
            setAdresseNumDepart("");
            setAdresseRueDepart("");
            setAdresseCpDepart("");
            setAdresseVilleDepart("");
            setAdresseNumArriver("");
            setAdresseRueArriver("");
            setAdresseCpArriver("");
            setAdresseVilleArriver("");
            setCovoitPrix("");
            setCovoitDep("");
            setCovoitArr("");
            setVoitId(null);
            setCovoitFumer(false);
            setCovoitAnimaux(false);
            setCovoitMusique(false);
        } catch (error) {
            console.error("Erreur lors de l'ajout du covoiturage :", error);
            setErreur("Une erreur est survenue lors de l'ajout du covoiturage.");
        }
    }
    return (<>
        <section className="container my-5">
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
            <h1 className="text-center my-5">Ajouter un covoiturage</h1>
            <form onSubmit={handleSubmit} action="">
                <div className="mb-3">
                    <label htmlFor="covoitDate" className="form-label">Date du covoiturage :</label>
                    <input type="date" className="form-control" id="covoitDate" name="covoitDate" required value={covoitDate} onChange={(e) => setCovoitDate(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="adresseNumDepart" className="form-label">Numéros de la rue de départ :</label>
                    <input type="number" className="form-control" id="adresseNumDepart" name="adresseNumDepart" required value={adresseNumDepart} onChange={(e) => setAdresseNumDepart(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="adresseRueDepart" className="form-label">Rue de départ :</label>
                    <input type="text" className="form-control" id="adresseRueDepart" name="adresseRueDepart" required value={adresseRueDepart} onChange={(e) => setAdresseRueDepart(e.target.value)} />
                    {adresseRueDepart && !valideAdresse(adresseRueDepart) && (
                        <p className="text-danger">Il faut entre 3 et 60 caractères.</p>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="adresseCpDepart" className="form-label">Code postal :</label>
                    <input type="text" className="form-control" id="adresseCpDepart" name="adresseCpDepart" required value={adresseCpDepart} onChange={(e) => setAdresseCpDepart(e.target.value)} />
                    {adresseCpDepart && !valideCpVille(adresseCpDepart) && (
                        <p className="text-danger">Format invalide le code postal doit comporter 6 caractères.</p>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="adresseVilleDepart" className="form-label">Ville de départ :</label>
                    <input type="text" className="form-control" id="adresseVilleDepart" name="adresseVilleDepart" required value={adresseVilleDepart} onChange={(e) => setAdresseVilleDepart(e.target.value)} />
                    {adresseVilleDepart && !valideAdresse(adresseVilleDepart) && (
                        <p className="text-danger">Il faut entre 3 et 60 caractères.</p>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="adresseNumArriver" className="form-label">Numéros de la rue d&apos;arrivée :</label>
                    <input type="number" className="form-control" id="adresseNumArriver" name="adresseNumArriver" required value={adresseNumArriver} onChange={(e) => setAdresseNumArriver(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="adresseRueArriver" className="form-label">Rue d&apos;arrivée :</label>
                    <input type="text" className="form-control" id="adresseRueArriver" name="adresseRueArriver" required value={adresseRueArriver} onChange={(e) => setAdresseRueArriver(e.target.value)} />
                    {adresseRueArriver && !valideAdresse(adresseRueArriver) && (
                        <p className="text-danger">Il faut entre 3 et 60 caractères.</p>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="adresseCpArriver" className="form-label">Code postal :</label>
                    <input type="text" className="form-control" id="adresseCpArriver" name="adresseCpArriver" required value={adresseCpArriver} onChange={(e) => setAdresseCpArriver(e.target.value)} />
                    {adresseCpArriver && !valideCpVille(adresseCpArriver) && (
                        <p className="text-danger">Format invalide le code postal doit comporter 6 caractères.</p>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="adresseVilleArriver" className="form-label">Ville d&apos;arrivée :</label>
                    <input type="text" className="form-control" id="adresseVilleArriver" name="adresseVilleArriver" required value={adresseVilleArriver} onChange={(e) => setAdresseVilleArriver(e.target.value)} />
                    {adresseVilleArriver && !valideAdresse(adresseVilleArriver) && (
                        <p className="text-danger">Il faut entre 3 et 60 caractères.</p>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="covoitPrix" className="form-label">Prix :</label>
                    <input type="number" className="form-control" id="covoitPrix" name="covoitPrix" required value={covoitPrix} onChange={(e) => setCovoitPrix(e.target.value)} />
                    {covoitPrix && parseFloat(covoitPrix) === 0 && (
                        <p className="text-danger">Le prix est obligatoire et ne peut pas être a zero</p>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="covoitDep" className="form-label">Heure de départ :</label>
                    <input type="time" className="form-control" id="covoitDep" name="covoitDep" required value={covoitDep} onChange={(e) => setCovoitDep(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="covoitArr" className="form-label">Heure d&apos;arrivée :</label>
                    <input type="time" className="form-control" id="covoitArr" name="covoitArr" required value={covoitArr} onChange={(e) => setCovoitArr(e.target.value)} />
                </div>
                <VoitureUtil onChange={handleSelectChangeVoiture} />
                <div className="form-check form-switch mb-3">
                    <input className="form-check-input" type="checkbox" id="covoitFumer" checked={!covoitFumer} onChange={() => setCovoitFumer(!covoitFumer)} />
                    <label className="form-check-label" htmlFor="covoitFumer">{!covoitFumer ? 'Non fumeur' : 'La cigarette ne me dérange pas'}</label>
                </div>
                <div className="form-check form-switch mb-3">
                    <input className="form-check-input" type="checkbox" id="covoitAnimaux" checked={!covoitAnimaux} onChange={() => setCovoitAnimaux(!covoitAnimaux)} />
                    <label className="form-check-label" htmlFor="covoitAnimaux">{!covoitAnimaux ? 'Sans animaux' : "J'aime les animaux"}</label>
                </div>
                <div className="form-check form-switch mb-3">
                    <input className="form-check-input" type="checkbox" id="covoitMusique" checked={!covoitMusique} onChange={() => setCovoitMusique(!covoitMusique)} />
                    <label className="form-check-label" htmlFor="covoitMusique">{!covoitMusique ? 'Pas un bruit' : "J'aime la musique"}</label>
                </div>
                <div className="mb-3 text-center">
                    <button type="submit" className="btn btn-primary" disabled={!valide}>Ajouter</button>
                </div>
            </form>
        </section>
    </>)

}