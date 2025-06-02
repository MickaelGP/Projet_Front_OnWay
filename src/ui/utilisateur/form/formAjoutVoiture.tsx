"use client";
import SelectCouleur from "@/components/utilisateurs/SelectCouleur";
import SelectModeles from "@/components/utilisateurs/SelectModele";
import { useState, useEffect } from "react";
export default function FormAjoutVoiture() {
    const [selectedCouleur, setSelectedCouleur] = useState<number | null>(null);
    const [selectedModele, setSelectedModele] = useState<number | null>(null);
    const handelSelectChangeModele = (value: number) => {
        setSelectedModele(value);
    }
    const handelSelectChangeCouleur = (value: number) => {
        setSelectedCouleur(value);
    }
    const ajoutVoiture = () => {
        console.log("Couleur sélectionnée :", selectedCouleur);
        console.log("Modèle sélectionné :", selectedModele);
    }
    // useEffect(() => {


    // }, [selectedCouleur, selectedModele]);
    return (<>
        <div className="container my-5">
            <h1 className="text-center">Ajouter une Voiture</h1>
            <form action="">
                <div className="mb-3">
                    <label htmlFor="energie" className="form-label">Energie :</label>
                    <input type="text" className="form-control" id="energie" name="voitEnergie" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="plaque" className="form-label">Plaque d&apos;immatriculation :</label>
                    <input type="text" className="form-control" id="plaque" name="voitPlaque" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="nbSiege" className="form-label">Nombre de siége :</label>
                    <input type="number" className="form-control" id="nbSiege" name="voitNbSiege" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="immat" className="form-label">Année</label>
                    <input type="date" className="form-control" id="immat" name="voitDateImat" required />
                </div>
                <SelectCouleur onChange={handelSelectChangeCouleur} />
                <SelectModeles onChange={handelSelectChangeModele} />
                <div className="mb-3 text-center">
                    <button type="submit" className="btn btn-primary" onClick={ajoutVoiture}>Ajouter</button>
                </div>
            </form>
        </div>
    </>)
}