"use client";
import ListeComptes from "@/interfaces/listeComptes";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function ListeCompte() {
    const [comptes, setComptes] = useState<ListeComptes[]>([]);
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
    if (comptes.length === 0) {
        return <p>Chagement des comptes...</p>
    }
    return (<>
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
                                        <button className="btn btn-danger">Supprimer</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>)
}