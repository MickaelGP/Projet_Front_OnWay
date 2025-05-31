"use client";

import { useRouter } from 'next/navigation';

export default function UtilSupProfilBtn() { 
    // Utilise le hook useRouter de Next.js pour naviguer entre les pages 
    const router = useRouter();

    // Fonction pour gérer la suppression du profil utilisateur
    const handelDelete = async () => {
        try {
            // Envoie une requête DELETE à l'API pour supprimer le profil utilisateur
            const resp = await fetch('/api/utilisateur/deleteProfil', {
                method: 'DELETE', // Méthode HTTP pour supprimer
            })
            let data = null; 
            // Vérifie si la réponse contient des données JSON
            if (resp.headers.get("content-type")?.includes("application/json")) {
                data = await resp.json();
                console.log(data);
            }
            // Si la réponse est OK, redirige l'utilisateur vers la page d'accueil
            if (resp.ok) {
                router.push("/");
            } else {
                console.error("Erreur API :", data || resp.statusText);
            }
        } catch (err) {
            console.error("Erreur lors de la suppression du compte :", err);
        }
    }
    return (<>
        <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#deleteProfil">Supprimer</button>

        <div className="modal fade" id="deleteProfil" tabIndex={-1} aria-labelledby="deleteProfilLabel">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="deleteProfilLabel">Supprimer son compte</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Êtes-vous sûr de vouloir supprimer votre compte ?</p>
                        <p>Cette action est irréversible.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                        <button type="button" className="btn btn-danger" onClick={handelDelete}>Supprimer</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}