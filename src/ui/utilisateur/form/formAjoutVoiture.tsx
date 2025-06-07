"use client";
import SelectCouleur from "@/components/utilisateurs/SelectCouleur";
import SelectModeles from "@/components/utilisateurs/SelectModele";
import { validePlaque, valideEnergie, valideNombreSiege } from "@/utils/validation";
import { useState, useEffect } from "react";
export default function FormAjoutVoiture() {
    const [voitCouleur, setVoitCouleur] = useState<number | null>(null);
    const [voitModele, setVoitModele] = useState<number | null>(null);
    const [voitEnergie, setVoitEnergie] = useState<string>("");
    const [voitPlaque, setVoitPlaque] = useState<string>("");
    const [voitNbSiege, setVoitNbSiege] = useState<string>("");
    const [voitDateImat, setVoitDateImat] = useState<string>("");

    const [erreur, setErreur] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [valide, setValide] = useState<boolean>(false);
    const handelSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Empêche le rechargement de la page
        try {
            const response = await fetch("/api/utilisateur/ajouterVoiture", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    voitEnergie,
                    voitPlaque,
                    voitNbSiege,
                    voitDateImat,
                    voitCouleur,
                    voitModele
                })
            })
            if (!response.ok) {
                const error = await response.json();
                if (error.data.status === 400) {
                    setErreur("Tous les champs sont obligatoires.");
                    return;
                }
                setErreur(error.data.detail);
                return;
            }
            const data = await response.json();
            setSuccess(data.data.message);
            setVoitEnergie("");
            setVoitPlaque("");
            setVoitNbSiege("");
            setVoitDateImat("");
            setVoitCouleur(null);
            setVoitModele(null);
            setValide(false);
        } catch (error) {
            console.error("Erreur lors de l'ajout de la voiture :", error);
            setErreur("Une erreur est survenue lors de l'ajout de la voiture.");
        }
    }
    const handelSelectChangeModele = (value: number) => {
        setVoitModele(value);
    }
    const handelSelectChangeCouleur = (value: number) => {
        setVoitCouleur(value);
    }

    useEffect(() => {
        setValide(validePlaque(voitPlaque) && valideEnergie(voitEnergie) && valideNombreSiege(voitNbSiege))

    }, [voitPlaque, voitEnergie, voitNbSiege]);
    return (<>
        <div className="container my-5">
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
            <h1 className="text-center">Ajouter une Voiture</h1>
            <form onSubmit={handelSubmit} action="">
                <div className="mb-3">
                    <label htmlFor="energie" className="form-label">Energie :</label>
                    <select className="form-select" aria-label="Sélectionner un type d'énergie" id="energie" required value={voitEnergie} onChange={(e) => setVoitEnergie(e.target.value)}>
                        <option value="">Type d&apos;énergie</option>
                        <option value="Essence">Essence</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electrique">Électrique</option>
                    </select>
                    {voitEnergie && !valideEnergie(voitEnergie) && (
                        <p className="text-danger">Format invalide</p>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="plaque" className="form-label">Plaque d&apos;immatriculation :</label>
                    <input type="text" className="form-control" id="plaque" name="voitPlaque" required value={voitPlaque} onChange={(e) => setVoitPlaque(e.target.value.toUpperCase())} />
                    {voitPlaque && !validePlaque(voitPlaque) && (
                        <p className="text-danger">Format invalide</p>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="nbSiege" className="form-label">Nombre de siége :</label>
                    <input type="number" className="form-control" id="nbSiege" name="voitNbSiege" required value={voitNbSiege} onChange={(e) => setVoitNbSiege(e.target.value)} />
                    {voitNbSiege && !valideNombreSiege(voitNbSiege) && (
                        <p className="text-danger">Le nombre de sièges doit être compris entre 1 et 7</p>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="immat" className="form-label">Année</label>
                    <input type="date" className="form-control" id="immat" name="voitDateImat" required value={voitDateImat} onChange={(e) => setVoitDateImat(e.target.value)} />
                </div>
                <SelectCouleur onChange={handelSelectChangeCouleur} />
                <SelectModeles onChange={handelSelectChangeModele} />
                <div className="mb-3 text-center">
                    <button type="submit" className="btn btn-primary" disabled={!valide}>Ajouter</button>
                </div>
            </form>
        </div>
    </>)
}