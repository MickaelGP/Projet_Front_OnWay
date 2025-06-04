"use client";
import ListeVoituresUtil from "@/interfaces/listeVoituresUtil";
import { useEffect, useState } from "react";
type Props = {
    onChange: (value: number) => void;
}
export default function VoitureUtil({ onChange }: Props) {
    const [voitures, setVoitures] = useState<ListeVoituresUtil[]>([]);
    const [selectedVoiture, setSelectedVoiture] = useState<number | null>(null);
    useEffect(() => {
        const fetchVoitures = async () => {
            try {
                const reponse = await fetch('/api/utilisateur/listeVoitures');
                if (!reponse.ok) {
                    const err = await reponse.json();
                    console.log(err);
                }
                const data: ListeVoituresUtil[] = await reponse.json();
                setVoitures(data.data);
            } catch (error) {
                console.error('Error fetching voitures:', error);
            }
        }
        fetchVoitures();
    }, []);
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value);
        setSelectedVoiture(value);
        onChange(value);
    }
    if (voitures.length === 0) {
        return <p>Chargement des voitures...</p>
    }
    return (<>
        <div className="mb-3">
            <label htmlFor="couleurs" className="form-label">Vos voitures :</label>
            <select className="form-select" aria-label="Selectionner une voiture" id="couleurs" required value={selectedVoiture ?? ''} onChange={handleChange}>
                <option value="">Sélectionner une voiture</option>
                {voitures.map((voiture) => (
                    <option key={voiture.voitId} value={voiture.voitId}>
                        {voiture.modeleNom}
                    </option>
                ))}
            </select>
        </div>
    </>)
}