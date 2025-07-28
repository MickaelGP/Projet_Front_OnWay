import ListeComptes from "@/interfaces/listeComptes"
import Link from "next/link";

type Props = {
    comptes: ListeComptes[],
    handleDelete: (utilId: number) => void;
}
export default function TableauComptes({ comptes, handleDelete }: Props) {
    return (<>
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
    </>)
}