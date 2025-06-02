"use client";
import CouleurVoitures from "@/interfaces/couleurVoitures";
type Props = {
    onChange: (value: number) => void;
}
import { useEffect, useState } from "react";
export default function SelectCouleur({ onChange }: Props) {
    const [couleurs, setCouleurs] = useState<CouleurVoitures[]>([]);
    const [selectedCouleur, setSelectedCouleur] = useState<number | null>(null);
    useEffect(() => {
        const fetchCouleurs = async () => {
            try {
                const response = await fetch('/api/utilisateur/couleurs');
                if (!response.ok) {
                    const err = await response.json();
                    console.log(err);
                }
                const data: CouleurVoitures[] = await response.json();
                setCouleurs(data.data);
            } catch (error) {
                console.error('Error fetching couleurs:', error);
            }
        };
        fetchCouleurs();
    }, []);
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value);
        setSelectedCouleur(value);
        onChange(value);
    }
    if (couleurs.length === 0) {
        return <p>Chargement des couleurs...</p>;
    }
    return (<>
        <div className="mb-3">
            <label htmlFor="couleurs" className="form-label">Couleur :</label>
            <select className="form-select" aria-label="Selection genre" required value={selectedCouleur ?? ''} onChange={handleChange}>
                <option value="">Sélectionner une couleur</option>
                {couleurs.map((couleur) => (
                    <option key={couleur.couleurId} value={couleur.couleurId}>
                        {couleur.couleurNom} 
                    </option>
                ))}
            </select>
        </div>
    </>)
}