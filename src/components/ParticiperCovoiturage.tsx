"use client"
import { useEffect, useState } from "react";
type Props = {
    date: string;
    resaCovoit: number;
}
export default function ParticiperCovoiturage({ date, resaCovoit }: Props) {
    const formatFr = new Date(date).toLocaleDateString('fr');
    const resaDate = date;
    const [resaNbSiege, setResaNbSiege] = useState<number>(0);
    
    const [erreur, setErreur] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [valide, setValide] = useState<boolean>(false);

    useEffect(() => {
        setValide(resaNbSiege > 0);
    }, [resaNbSiege]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const reponse = await fetch('/api/resaCovoit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ resaDate, resaNbSiege, resaCovoit })
            })
            // Si la réponse n’est pas "OK", on gère les erreurs
            if (!reponse.ok) {
                const err = await reponse.json();// Récupère l'erreur renvoyée par le backend

                // Exemple de gestion d'erreur spécifique
                if (err.data.status == 400) {
                    setErreur("Tous les champs sont requis");
                    return;
                } else {
                    setErreur(err.data.detail);
                    return;
                }
            }
            const data = await reponse.json();
            setResaNbSiege(0);
            setSuccess(data.data.message);
        } catch (error) {
            console.error("Erreur lors de la réservation :", error);
            setErreur("Une erreur est survenue lors de la réservation. Veuillez réessayer plus tard.");
        }

    }
    return (<>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#participerModal">
            Participer
        </button>
        <div className="modal fade" id="participerModal" tabIndex={-1} aria-labelledby="exampleModalLabel">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="participerModalLabel">Reservation pour le {formatFr}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit} action="">
                            <div className="mb-3">
                                <label htmlFor="resaNbSiege" className="form-label">Nombre de siéges :</label>
                                <input type="number" className="form-control" name="resaNbSiege" id="resaNbSiege" required value={resaNbSiege} onChange={(e) => setResaNbSiege(Number(e.target.value))} />
                            </div>
                            <div className="mb-3 d-flex justify-content-center gap-3">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                <button type="submit" className="btn btn-primary" disabled={!valide}>Réserver</button>
                            </div>
                        </form>
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
                    </div>
                </div>
            </div>
        </div>
    </>)
}