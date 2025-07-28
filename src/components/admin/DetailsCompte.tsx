"use client"
import ListeComptes from "@/interfaces/listeComptes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"
import ErreurAlert from "../ErreurAlert";
import SuccesAlert from "../SuccessAlert";
import PrimaryButton from "../PrimaryButton";
export default function DetailsCompte() {
    const [infoUtil, setInfoUtil] = useState<ListeComptes | null>(null);
    const [erreur, setErreur] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
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
        setSuccess("");
        try {
            const reponse = await fetch('/api/admin/updateCompte', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({utilId: infoUtil?.utilId,utilSuspendu: infoUtil?.utilSuspendu  })
            })
            if (!reponse.ok) {
                setErreur("Erreur lors de la mise à jour");
            }
            setSuccess("Statut mis à jour avec succès !");
        } catch (erreur) {
            console.error("Erreur : ", erreur);
            setErreur("La mise à jour a échoué.");
        }
    }
    if (erreur) {
        return (
            <section className="container">
                <ErreurAlert message={erreur}/>
            </section>
        );
    }
    if (!infoUtil) {
        return <p>Chargement...</p>
    }
    return (<>
        <section className="container">
            <h1 className="text-center">Details du profil de : {infoUtil.utilPseudo}</h1>
            <div className="my-5 d-flex flex-column align-items-center ">
                <p>Role : {infoUtil.roleLabel}</p>
                <p>Adresse email : {infoUtil.utilEmail}</p>
                <p>Nom : {infoUtil.utilNom}</p>
                <form onSubmit={handleSubmit} className="w-50 d-flex flex-column align-items-center">
                    <div className="form-check form-switch mb-3">
                        <input className="form-check-input" type="checkbox" id="utilSuspendu" checked={!infoUtil.utilSuspendu} onChange={() => setInfoUtil({...infoUtil, utilSuspendu: !infoUtil.utilSuspendu})} />
                        <label className="form-check-label" htmlFor="utilSuspendu">
                            {!infoUtil.utilSuspendu ? "Actif" : "Suspendu"}
                        </label>
                    </div>
                    <PrimaryButton type="submit" classDiv="my-3" classBtn="btn btn-primary" id="detailsCompteBtn" disabled={false} text="Enregistrer"/>
                </form>
            </div>
            {success && (<SuccesAlert message={success}/>)}
        </section>
    </>)
}