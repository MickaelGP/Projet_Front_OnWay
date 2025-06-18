"use client";
import CovoitByUtilId from "@/interfaces/covoitByUtilId";
import Link from "next/link";
import { useState, useEffect } from "react";
export default function TrajetConduc(){
      const [covoit, setCovoit] = useState<CovoitByUtilId[]>([]);
        const [chargement, setChargement] = useState(true);
        useEffect(() => {
            const fetchCovoiConduc = async () => {
                try {
                    const reponse = await fetch('/api/utilisateur/trajetConduc');
                    const data: CovoitByUtilId[] = await reponse.json();
                    setCovoit(data.data);
    
                } catch (erreur) {
                    console.error("Erreur lors du chargement des trajets :", erreur);
                } finally {
                    setChargement(false);
                }
            }
            fetchCovoiConduc();
        }, [])
        if (chargement) {
            return <p>Chargement des trajets...</p>;
        }
        if (covoit.length === 0) {
            return <p>Vous n&apos;avez créé aucun trajet.</p>;
        }
     return (<>
        <section>
            <h1 className="text-center my-5">Mes trajets</h1>
            <div className="container">
                {covoit.map((trajet) => (
                    <div className="card text-center my-3" key={trajet.covoitId}>
                        <div className="card-body">
                            <h5 className="card-title py-2">
                                Trajet du {new Date(trajet.covoitDate).toLocaleDateString()}
                            </h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                {trajet.departVille} | {trajet.arriveVille}
                            </h6>
                            <p className="card-text">
                                De {trajet.covoitDep} à {trajet.covoitArr}
                            </p>
                            {trajet.covoitStatut === "En attente" && (
                                <div className="d-flex justify-content-center gap-3">
                                    <Link href={`/utilisateur/mes-trajets/${trajet.covoitId}`} className="btn btn-primary">
                                        Modifier
                                    </Link>
                                    <button className="btn btn-danger">Supprimer</button>
                                </div>
                            )}
                             {trajet.covoitStatut === "Démarrer" && (
                                <div className="d-flex justify-content-center gap-3">
                                    <Link href={`/utilisateur/mes-trajets/${trajet.covoitId}`} className="btn btn-primary">
                                        Modifier
                                    </Link>
                                </div>
                            )}
                             {trajet.covoitStatut === "Términer" && (
                                <div className="d-flex justify-content-center gap-3">
                                    <button className="btn btn-danger">Supprimer</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </>)
}