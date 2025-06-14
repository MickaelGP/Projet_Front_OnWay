"use client";
import ListeComptes from "@/interfaces/listeComptes";
import Link from "next/link";
import { useEffect, useState } from "react";
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
                <div className="w-50 mt-5 alert alert-danger text-center container">
                    {erreur}
                </div>
            )}
            {success && (
                <div className="w-50 mt-5 alert alert-success text-center container">
                    {success}
                </div>
            )}
            <h1 className="text-center my-5">Liste des comptes</h1>
            <div className="table-responsive container my-5">
                <table className="table">
                    <thead className="text-center">
                        <tr>
                            <th>Pseudo</th>
                            <th>Email</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {comptes.map((compte) => (
                            <tr key={compte.utilId}>
                                <th>{compte.utilPseudo}</th>
                                <td>{compte.utilEmail}</td>
                                <td>{compte.utilSuspendu ? 'Suspendu' : 'Actif'}</td>
                                <td className="d-flex gap-2 justify-content-center">
                                    {compte.roleLabel === 'Passager' || compte.roleLabel === 'Admin' ? (
                                        <Link href={`/admin/details-compte/${compte.utilId}`} className="btn btn-info">Voir</Link>
                                    ) : (
                                        <>
                                            <Link href={`/admin/details-compte/${compte.utilId}`} className="btn btn-info">Voir</Link>
                                            <button className="btn btn-danger" type="button" onClick={() => handleDelete(compte.utilId)}>Supprimer</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    </>)
}