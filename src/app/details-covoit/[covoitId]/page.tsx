"use client"
// Importation du composant Footer
import Footer from "@/ui/Footer/Footer";

// Importation du composant NavBar
import NavBar from "@/ui/Nav/NavBar";

// Importation de styles CSS
import styles from '@/ui/Form/styles/rechercheCovoit.module.css';

// Importation du hook useParams fourni par Next.js permet de récupérer les paramètres dynamiques de l’URL (par exemple l’ID d’un covoiturage)
import { useParams } from "next/navigation"

// Importation des hooks React pour gérer l’état
import { useEffect, useState } from "react"

// Importation de l’interface TypeScript définissant la structure des données de covoiturage
import DetailsCovoiturage from "@/interfaces/detailsCovoiturage"

// Importation d’utilitaires pour formater les dates et durées
import { jour, mois, tempsTrajet } from "@/utils/dateHeure";

// Importation de Link, un composant Next.js pour les liens internes
import Link from "next/link"


export default function DetailCovoitPage() {
    // État pour stocker un éventuel message d’erreur
    const [erreur, setErreur] = useState("");

    // État pour stocker les données du covoiturage
    const [dataDetails, setDataDetails] = useState<DetailsCovoiturage | null>(null);

    // Récupération de l’ID du covoiturage depuis l’URL
    const params = useParams<{ covoitId: string }>();

    // useEffect est appelé automatiquement après le rendu du composant il est utilisé pour aller chercher les données du covoiturage à afficher
    useEffect(() => {
        // Fonction interne pour effectuer la requête HTTP
        const detailsCovoit = async () => {
            // Si aucun ID n’est trouvé dans l’URL, on ne fait rien
            if (!params?.covoitId){
                return;
            } 
                

            try {
                // Appel à l’API interne pour récupérer les détails du covoiturage
                const resp = await fetch(`/api/detailsCovoit/${params.covoitId}`);
                const data = await resp.json();

                // Si la réponse n’est pas "OK" (statut 200)
                if (!resp.ok) {
                    // Si l’API renvoie un statut 404, cela signifie que le covoiturage n’existe pas
                    if (data.data.status === 404) {
                        setErreur("Aucun détails pour le covoiturage")
                        return
                    // Si statut 400, il y a une erreur dans l’URL
                    } else if (data.data.status === 400) {
                        setErreur("Probléme d'url")
                        return
                    }
                }
                // Si tout va bien, on stocke les données dans l’état local
                setDataDetails(data.data);
            } catch (err) {
                // En cas de problème réseau
                console.error("Erreur réseau :", err);
                setErreur("Erreur réseau.");
            }
        };

        // Exécution de la fonction dès que le composant est monté ou si l’ID change
        detailsCovoit();
    }, [params?.covoitId]);

    // Si les données ne sont pas encore chargées, on affiche un message de chargement
    if (!dataDetails) {
        return (<span>Chargement</span>)
    }
    return (<>
        <NavBar />
        <main className={`${styles.rechercheBackground}`}>
            {erreur && (
                <div className="w-50 p-5 alert alert-danger text-center container">
                    {erreur}
                </div>
            )}
            <section className="d-flex justify-content-between bg-white shadow p-sm-3 mb-3">
                <div className="d-flex flex-column">
                    <span>{dataDetails.covoitDep}</span>
                    <span>{tempsTrajet(dataDetails.covoitDep, dataDetails.covoitArr)}</span>
                    <span>{dataDetails.covoitArr}</span>
                </div>
                <div>
                    <h1>Le {jour(dataDetails.covoitDate)} {mois(dataDetails.covoitDate)}</h1>
                </div>
                <div>
                    <div>
                        <p>{dataDetails.departVille}</p>
                        <p>{dataDetails.departNum} {dataDetails.departRue}</p>
                    </div>
                    <div>
                        <p>{dataDetails.arriveVille}</p>
                        <p>{dataDetails.arriverNum} {dataDetails.arriveRue}</p>
                    </div>
                </div>
            </section>
            <section className="d-flex justify-content-between bg-white shadow p-3 mb-3">
                <h2>Prix</h2>
                <span>{dataDetails.covoitPrix}</span>
            </section>
            <section className="text-center bg-white shadow p-3 mb-3">
                <h2>Véhicule</h2>
                <div className="my-3">
                    <div>
                        <div>
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 15 15"><path fill="currentColor" d="M13.84 6.852L12.6 5.7l-1.1-2.2a1.05 1.05 0 0 0-.9-.5H4.4a1.05 1.05 0 0 0-.9.5L2.4 5.7L1.16 6.852a.5.5 0 0 0-.16.367V11.5a.5.5 0 0 0 .5.5h2c.2 0 .5-.2.5-.4V11h7v.5c0 .2.2.5.4.5h2.1a.5.5 0 0 0 .5-.5V7.219a.5.5 0 0 0-.16-.367M4.5 4h6l1 2h-8ZM5 8.6c0 .2-.3.4-.5.4H2.4c-.2 0-.4-.3-.4-.5V7.4c.1-.3.3-.5.6-.4l2 .4c.2 0 .4.3.4.5Zm8-.1c0 .2-.2.5-.4.5h-2.1c-.2 0-.5-.2-.5-.4v-.7c0-.2.2-.5.4-.5l2-.4c.3-.1.5.1.6.4Z"/></svg></span>
                        </div>
                        <div>
                            <p>{dataDetails.voitMarque} {dataDetails.voitModele}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 15 15"><path fill="currentColor" d="M2.646 7.801L7.752.838a.826.826 0 0 1 1.463.705L8.086 5.684A.25.25 0 0 0 8.327 6h3.42a.753.753 0 0 1 .607 1.199l-5.106 6.964a.826.826 0 0 1-1.463-.706l1.129-4.141A.25.25 0 0 0 6.673 9h-3.42a.753.753 0 0 1-.607-1.199"/></svg></span>
                        </div>
                        <div>
                            <p>{dataDetails.voitEnergie}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="#4fc3f7" d="M12.278 8a1.167 1.167 0 0 1-1.167-1.167a1.167 1.167 0 0 1 1.167-1.166a1.167 1.167 0 0 1 1.166 1.166A1.167 1.167 0 0 1 12.278 8M9.944 4.889a1.167 1.167 0 0 1-1.166-1.167a1.167 1.167 0 0 1 1.166-1.166a1.167 1.167 0 0 1 1.167 1.166A1.167 1.167 0 0 1 9.944 4.89m-3.888 0a1.167 1.167 0 0 1-1.167-1.167a1.167 1.167 0 0 1 1.167-1.166a1.167 1.167 0 0 1 1.166 1.166A1.167 1.167 0 0 1 6.056 4.89M3.722 8a1.167 1.167 0 0 1-1.166-1.167a1.167 1.167 0 0 1 1.166-1.166A1.167 1.167 0 0 1 4.89 6.833A1.167 1.167 0 0 1 3.722 8M8 1a7 7 0 0 0-7 7a7 7 0 0 0 7 7a1.167 1.167 0 0 0 1.167-1.167c0-.303-.117-.575-.304-.777a1.2 1.2 0 0 1-.295-.778a1.167 1.167 0 0 1 1.166-1.167h1.377A3.89 3.89 0 0 0 15 7.222C15 3.784 11.866 1 8 1"/></svg></span>
                        </div>
                        <div>
                           {dataDetails.voitCouleur}
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-white shadow p-3">
                <div className="d-sm-flex justify-content-sm-center align-items-sm-baseline gap-3 border-bottom ">
                    <div>
                        <h4>{dataDetails.conducPseudo}</h4>
                    </div>
                    <div>
                        <span className="px-2">Nombre de commentaires : {dataDetails.nbCom}</span>
                        <span>Note : {dataDetails.note}</span>
                    </div>
                </div>
                <div className="text-center my-3 border-bottom">
                    <h4>Préférences</h4>
                    {dataDetails.covoitAnimaux && (
                        <p>J&apos;aime les annimaux</p>
                    )}
                    {dataDetails.covoitFumeur && (
                        <p>La cigarette ne me dérange pas.</p>
                    )}
                    {dataDetails.covoitMusique && (
                        <p>J&apos;aime la musique</p>
                    )}
                </div>
                <div className="d-flex justify-content-center gap-3 my-5">
                    <button className="btn btn-primary"> Participer</button>
                    <Link href={`/avis/${dataDetails.conducId}`} className="btn btn-info">Voir les avis</Link>
                </div>
            </section>
        </main>
        <Footer />
    </>)
}