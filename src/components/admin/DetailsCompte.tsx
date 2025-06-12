"use client"
import ListeComptes from "@/interfaces/listeComptes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"
export default function DetailsCompte() {
    const [infoUtil, setInfoUtil] = useState<ListeComptes | null>(null);
    const [utilSuspendu, setUtilSuspendu] = useState<boolean>(false);
    const [utilId, setUtilId] = useState<number>(0);
    const [erreur, setErreur] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const params = useParams<{ utilId: string }>();

    useEffect(() => {
        const detailsProfil = async () => {
            if (!params.utilId) {
                return;
            }
            try {
                const reponse = await fetch(`/api/admin/detailsCompte/${params.utilId}`);
                const data = await reponse.json();
                if (data.data.status === 404) {
                    setErreur("Aucun détails pour le compte")
                    setInfoUtil(null)
                    return
                }
                setInfoUtil(data.data);
                setUtilSuspendu(data.data.utilSuspendu);
                setUtilId(data.data.utilId);
            } catch (erreur) {
                console.error("Erreur serveur :", erreur);
                setErreur("Erreur serveur")
            }
        }
        detailsProfil();
    }, [params?.utilId]);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErreur("");
        setMessage("");
        try {
            const reponse = await fetch('/api/admin/updateCompte', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ utilSuspendu, utilId })
            })
            if (!reponse.ok) {
                setErreur("Erreur lors de la mise à jour");
            }
            setMessage("Statut mis à jour avec succès !");
        } catch (erreur) {
            console.error("Erreur : ", erreur);
            setErreur("La mise à jour a échoué.");
        }
    }
    if (erreur) {
        return (
            <section className="container">
                <div className="w-50 my-5 alert alert-danger text-center container">
                    {erreur}
                </div>
            </section>
        );
    }
    if (!infoUtil) {
        return <p>Chargement...</p>
    }
    return (<>
        <section className="container">
            {erreur && (
                <div className="w-50 p-5 alert alert-danger text-center container">
                    {erreur}
                </div>
            )}
            <h1 className="text-center">Details du profil de : {infoUtil.utilPseudo}</h1>
            <div className="my-5 d-flex flex-column align-items-center ">
                <p>Role : {infoUtil.roleLabel}</p>
                <p>Adresse email : {infoUtil.utilEmail}</p>
                <p>Nom : {infoUtil.utilNom}</p>
                <form onSubmit={handleSubmit} className="w-50 d-flex flex-column align-items-center">
                    <div className="form-check form-switch mb-3">
                        <input className="form-check-input" type="checkbox" id="utilSuspendu" checked={!utilSuspendu} onChange={() => setUtilSuspendu(!utilSuspendu)} />
                        <label className="form-check-label" htmlFor="utilSuspendu">
                            {!utilSuspendu ? "Actif" : "Suspendu"}
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Enregistrer
                    </button>
                </form>
            </div>
            {message && <div className="alert alert-success mt-3 text-center"><p>{message}</p></div>}
            {erreur && <div className="alert alert-danger mt-3">{erreur}</div>}
        </section>
    </>)
}