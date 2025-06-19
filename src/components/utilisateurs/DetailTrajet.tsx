"use client"
// Importation du hook useParams fourni par Next.js permet de récupérer les paramètres dynamiques de l’URL (par exemple l’ID d’un covoiturage)
import { useParams } from "next/navigation"

// Importation des hooks React pour gérer l’état
import React, { useEffect, useState } from "react"
import DetailTrajetUtil from "@/interfaces/detailTrajetUtil";
import PrimaryButton from "../PrimaryButton";
export default function DetailTrajet() {
    const [trajet, setTrajet] = useState<DetailTrajetUtil>({} as DetailTrajetUtil);
    const [cocher, setCocher] = useState<boolean>(false);
    // État pour stocker un éventuel message d’erreur
    const [erreur, setErreur] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [chargement, setChargement] = useState<boolean>(true);
    const [active, setActive] = useState<boolean>(false);
    const [statutTemporaire, setStatutTemporaire] = useState<string>("");
    // Récupération de l’ID du covoiturage depuis l’URL
    const params = useParams<{ covoitId: string }>();
    // Fonction interne pour effectuer la requête HTTP
    const detailsTrajet = React.useCallback(async () => {
        // Si aucun ID n’est trouvé dans l’URL, on ne fait rien
        if (!params?.covoitId) {
            return;
        }

        try {
            // Appel à l’API interne pour récupérer les détails du covoiturage
            const resp = await fetch(`/api/utilisateur/detailTrajet/${params.covoitId}`);
            const data = await resp.json();

            // Si la réponse n’est pas "OK" (statut 200)
            if (!resp.ok) {
                // Si l’API renvoie un statut 404, cela signifie que le covoiturage n’existe pas
                if (data.data.status === 404) {
                    setErreur(data.data.title)
                    return
                    // Si statut 400, il y a une erreur dans l’URL
                } else if (data.data.status === 400) {
                    setErreur("Probléme d'url")
                    return
                }
            }
            // Si tout va bien, on stocke les données dans l’état local
            setTrajet(data.data);
        } catch (err) {
            // En cas de problème réseau
            console.error("Erreur réseau :", err);
            setErreur("Erreur réseau.");
        } finally {
            setChargement(false)
        }
    }, [params?.covoitId]);
    // useEffect est appelé automatiquement après le rendu du composant il est utilisé pour aller chercher les données du covoiturage à afficher
    useEffect(() => {
        // Exécution de la fonction dès que le composant est monté
        detailsTrajet();
    }, [detailsTrajet]);
    useEffect(() => {
        if (cocher) {
            let nouveauStatut = trajet.covoitStatut;
            if (trajet.covoitStatut === "En attente") {
                nouveauStatut = "Démarré";
            } else if (trajet.covoitStatut === "Démarré") {
                nouveauStatut = "Terminé";
            }
            setStatutTemporaire(nouveauStatut);
        }
    }, [cocher, trajet.covoitStatut]);
    useEffect(() => {
        setActive(trajet.covoitDate === "" || trajet.covoitDep === "" || trajet.covoitArr === "" || trajet.covoitPrix === 0)
    }, [trajet.covoitDate, trajet.covoitDep, trajet.covoitArr, trajet.covoitPrix])
    const handleModifTrajet = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const reponse = await fetch('/api/utilisateur/modifTrajet', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
               body: JSON.stringify({
                ...trajet,
                covoitStatut: statutTemporaire || trajet.covoitStatut,
            })
            });
            if (!reponse.ok) {
                const data = await reponse.json();
                if (data.data.status === 400) {
                    setErreur(data.data.title);
                    return
                } else if (data.data.status === 409) {
                    setErreur(data.data.detail);
                    return
                }
            }
            const data = await reponse.json();
            setSuccess(data.data.message)
            setCocher(false);
            await detailsTrajet();

        } catch (erreur) {
            console.error("Erreur lors de la modification du trajet :", erreur);
            setErreur("Erreur lors de la modification du trajet.");
        }
    }
    if (chargement) {
        return <p>Chargement ...</p>
    } else if (erreur) {
        return (<>
            <div className="container alert alert-danger my-5 text-center w-50">
                <p>{erreur}</p>
            </div>
        </>)
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
            <h1 className="text-center">Modifer le trajet</h1>
            <div>
                <form onSubmit={handleModifTrajet} action="" method="POST">
                    {trajet.covoitStatut != "Démarré" && (<>
                        <div className="mb-3">
                            <label htmlFor="covoitDate" className="form-label">Date du covoiturage :</label>
                            <input type="date" className="form-control" name="covoitDate" id="covoitDate" required value={trajet.covoitDate} onChange={(e) => setTrajet({ ...trajet, covoitDate: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="covoitDep" className="form-label">Heure de départ :</label>
                            <input type="time" className="form-control" name="covoitDep" id="covoitDep" required value={trajet.covoitDep} onChange={(e) => setTrajet({ ...trajet, covoitDep: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="covoitArr" className="form-label">Heure d&apos;arrivée :</label>
                            <input type="time" className="form-control" name="covoitArr" id="covoitArr" required value={trajet.covoitArr} onChange={(e) => setTrajet({ ...trajet, covoitArr: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="covoitPrix" className="form-label">Prix :</label>
                            <input type="number" className="form-control" name="covoitPrix" id="covoitPrix" required value={trajet.covoitPrix} onChange={(e) => setTrajet({ ...trajet, covoitPrix: Number(e.target.value) })} />
                        </div>
                        <div className="form-check form-switch mb-3">
                            <input className="form-check-input" type="checkbox" id="covoitFumer" checked={!trajet.covoitFumeur} onChange={(e) => setTrajet({ ...trajet, covoitFumeur: !e.target.checked })} />
                            <label className="form-check-label" htmlFor="covoitFumer">{!trajet.covoitFumeur ? 'Non fumeur' : 'La cigarette ne me dérange pas'}</label>
                        </div>
                        <div className="form-check form-switch mb-3">
                            <input className="form-check-input" type="checkbox" id="covoitAnimaux" checked={!trajet.covoitAnimaux} onChange={(e) => setTrajet({ ...trajet, covoitAnimaux: !e.target.checked })} />
                            <label className="form-check-label" htmlFor="covoitAnimaux">{!trajet.covoitAnimaux ? 'Sans animaux' : "J'aime les animaux"}</label>
                        </div>
                        <div className="form-check form-switch mb-3">
                            <input className="form-check-input" type="checkbox" id="covoitMusique" checked={!trajet.covoitMusique} onChange={(e) => setTrajet({ ...trajet, covoitMusique: !e.target.checked })} />
                            <label className="form-check-label" htmlFor="covoitMusique">{!trajet.covoitMusique ? 'Pas un bruit' : "J'aime la musique"}</label>
                        </div>
                    </>)}
                    {trajet.covoitStatut === "En attente" && (
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="flexCheckDefault" checked={cocher} onChange={(e) => setCocher(e.target.checked)} />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Démarrer le covoiturage
                            </label>
                        </div>
                    )}
                    {trajet.covoitStatut === "Démarré" && (
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="flexCheckDefault" checked={cocher} onChange={(e) => setCocher(e.target.checked)} />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Arréter le covoiturage
                            </label>
                        </div>
                    )}
                    <PrimaryButton classBtn="btn btn-primary" type="submit" classDiv="text-center my-3" id="btnModifTrajet" disabled={active} text="Enregister" />
                </form>
            </div>
        </section>
    </>)
}