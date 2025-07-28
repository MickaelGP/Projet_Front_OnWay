"use client";
import ListeComptes from "@/interfaces/listeComptes";
import { useEffect, useState } from "react";
import ErreurAlert from "../ErreurAlert";
import SuccesAlert from "../SuccessAlert";
import TableauComptes from "@/ui/admin/TableauComptes";
export default function ListeCompte() {
    const [comptes, setComptes] = useState<ListeComptes[]>([]);
    const [erreur, setErreur] = useState<string>("");
    const [success, setSuccess] = useState<string>('');

    useEffect(() => {
        const fetchListeComptes = async () => {
            try {
                const reponse = await fetch('/api/admin/listeComptes');
                if (!reponse.ok) {
                    const err = await reponse.json();
                    console.log(err);
                }
                const data: ListeComptes[] = await reponse.json();
                setComptes(data.data);
            } catch (error) {
                console.error('Error fetching comptes:', error);
            }
        }
        fetchListeComptes();
    }, [])

    const handleDelete = async (utilId: number) => {
        try {
            const reponse = await fetch('/api/admin/deleteCompte', {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({utilId})
            });
            if (!reponse.ok) {
                const err = await reponse.json();
                if (err.data.status == 400) {
                    setErreur(err.data.detail);
                    return;
                } else {
                    setErreur(err.data.detail);
                    return;
                }
            }
            const data = await reponse.json();
            setSuccess(data.data.message);
            // Met à jour la liste en supprimant l'utilisateur concerné
            setComptes(prevComptes => prevComptes.filter(compte => compte.utilId !== utilId));
        } catch (erreur) {
            console.error(erreur);
            setErreur('Une erreur est survenue merci de réessayer ultérieurment');
        }
    }

    if (comptes.length === 0) {
        return <p>Chagement des comptes...</p>
    }
    return (<>
        <section>
             {erreur && (
                <ErreurAlert message={erreur}/>
            )}
            {success && (
                <SuccesAlert message={success}/>
            )}
            <h1 className="text-center my-5">Liste des comptes</h1>
            <div className="table-responsive container my-5">
               <TableauComptes comptes={comptes} handleDelete={handleDelete} />
            </div>
        </section>
    </>)
}