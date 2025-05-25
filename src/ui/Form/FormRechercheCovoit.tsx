"use client"

import { useState } from "react";
import rechercheCovoitData from '@/interfaces/rechercheCovoitData';

type Props = {
    onResult: (data: rechercheCovoitData[]) => void
}
export default function FormRechercheCovoit({ onResult }: Props) {
    const [villeDepart, setVilleDepart] = useState("");
    const [villeArriver, setVilleArriver] = useState("");
    const [covoitDate, setCovoitDate] = useState("");
    const [erreur, setErreur] = useState("");
    // Fonction déclenchée à la soumission du formulaire
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();// Empêche le rechargement de la page
        try {
            // Envoie des données utilisateur au backend via une requête POST
            const resp = await fetch('/api/rechercheCovoit/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ villeDepart, villeArriver, covoitDate }) // Seuls les champs requis par l’API sont envoyés
            });

            // Si la réponse n’est pas "OK", on gère les erreurs
            if (!resp.ok) {
                const err = await resp.json();// Récupère l'erreur renvoyée par le backend
                console.log(err.data.status)
                // Gestion d'erreur spécifique
                if (err.data.status == 400) {
                    setErreur("Tous les champs sont requis");
                } else if (err.data.status == 404) {
                    setErreur("Aucun covoiturage trouvé ");
                }
            }
            else {
                // Si tout se passe bien, on vide les champs et affiche un message de succès
                const data = await resp.json();
                onResult(data.data);
                setVilleDepart("");
                setVilleArriver("");
                setCovoitDate("");
            }

        } catch (err) {
            // Si une erreur réseau ou serveur survient, on l'affiche dans la console
            console.error(err)
            setErreur("Service momentanément inutilisable merci de ressayer plus tard")
        }
    }
    return (<>
        {erreur && (
            <div className="w-50 mt-5 alert alert-danger text-center container">
                {erreur}
            </div>
        )}
        <div className={`container py-5`}>
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <button className="btn btn-primary" type="button">Filtres</button>
                    <input type="text" className="form-control" placeholder="Départ" aria-label="Ville de départ" required value={villeDepart} onChange={(e) => setVilleDepart(e.target.value)} />
                    <input type="text" className="form-control" placeholder="Arriver" aria-label="Ville d'arriver" required value={villeArriver} onChange={(e) => setVilleArriver(e.target.value)} />
                    <input type="date" className="form-control" placeholder="" aria-label="Date de départ" required value={covoitDate} onChange={(e) => setCovoitDate(e.target.value)} />
                    <button type="submit" className="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path fill="currentColor" fillRule="evenodd" d="M469.297 439.13L347.982 317.816C370.466 288.907 384 252.707 384 213.334c0-94.104-76.562-170.667-170.666-170.667S42.667 119.23 42.667 213.334S119.23 384 213.334 384c39.373 0 75.573-13.534 104.481-36.018l121.316 121.315zm-255.963-97.796c-70.584 0-128-57.417-128-128c0-70.584 57.416-128 128-128c70.583 0 128 57.416 128 128c0 70.583-57.417 128-128 128" /></svg></button>
                </div>
            </form>
        </div>
    </>);
}