"use client"
// Importation du hook useParams fourni par Next.js permet de récupérer les paramètres dynamiques de l’URL (par exemple l’ID d’un covoiturage)
import { useParams } from "next/navigation"

// Importation des hooks React pour gérer l’état
import { useEffect, useState } from "react"
import DetailTrajetUtil from "@/interfaces/detailTrajetUtil";
export default function DetailTrajet() {
    const [trajet, setTrajet] = useState<DetailTrajetUtil>({} as DetailTrajetUtil);
    const [covoitDate, setCovoitDate] = useState<string>("");
    // État pour stocker un éventuel message d’erreur
    const [erreur, setErreur] = useState<string>("");
    const [chargement, setChargement] = useState<boolean>(true);
    // Récupération de l’ID du covoiturage depuis l’URL
    const params = useParams<{ covoitId: string }>();
    // useEffect est appelé automatiquement après le rendu du composant il est utilisé pour aller chercher les données du covoiturage à afficher
    useEffect(() => {
        // Fonction interne pour effectuer la requête HTTP
        const detailsTrajet = async () => {
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
        };
        // Exécution de la fonction dès que le composant est monté ou si l’ID change
        detailsTrajet();
    }, [params?.covoitId]);
    if (chargement) {
        return <p>Chargement ...</p>
    } else if (erreur) {
        return (<>
            <div className="container alert alert-danger my-5 text-center w-50">
                <p>{erreur}</p>
            </div>
        </>)
    }
    console.log(trajet.covoitAnimaux)
    return (<>
        <section>
            <h1>Modifer le trajet</h1>
            <div>
                <form action="">
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
                    <div className="mb-3">
                        
                    </div>
                </form>
            </div>
        </section>
    </>)
}