"use client";
import modeleVoiture from "@/interfaces/modeleVoiture";
type Props = {
    onChange: (value: number) => void;
}
import { useEffect, useState } from "react";
export default function SelectModeles({ onChange }: Props) {
    const [modeles, setModeles] = useState<modeleVoiture[]>([]);
    const [selectedModele, setSelectedModele] = useState<number | null>(null);
    useEffect(() => {
        const fetchModeles = async () => {
            try {
                const response = await fetch('/api/utilisateur/modeles');
                if (!response.ok) {
                    const err = await response.json();
                    console.log(err);
                }
                const data: modeleVoiture[] = await response.json();
                setModeles(data.data);
            } catch (error) {
                console.error('Error fetching couleurs:', error);
            }
        };
        fetchModeles();
    }, []);
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value);
        setSelectedModele(value);
        onChange(value);
    }
    if (modeles.length === 0) {
        return <p>Chargement des modeles...</p>;
    }
    return (<>
        <div className="mb-3">
            <label htmlFor="modeles" className="form-label">Modèle :</label>
            <select className="form-select" aria-label="Selection genre" id="modeles" required value={selectedModele ?? ''} onChange={handleChange}>
                <option value="">Sélectionner un modèle</option>
                {modeles.map((modele) => (
                    <option key={modele.modeleId} value={modele.modeleId}>
                        {modele.modeleNom} 
                    </option>
                ))}
            </select>
        </div>
    </>)
}