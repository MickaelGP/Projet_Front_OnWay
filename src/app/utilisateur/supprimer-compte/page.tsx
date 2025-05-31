import UtilSupProfilBtn from "@/components/utilisateurs/UtilSupProfilBtn";
import { verifToken } from "@/utils/verifCookies";
export default async function SupprimerComptePage() {
    await verifToken();
    return(<>
        <section>
            <h1 className="text-center py-5">Supprimer son compte</h1>
            <div className="container text-center my-5">
                <p>En cliquant sur le bouton supprimer toutes vos données seront effacées.</p>
                <UtilSupProfilBtn/>
            </div>
        </section>
    </>)
}