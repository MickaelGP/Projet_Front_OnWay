import { verifToken } from "@/utils/verifCookies"
export default async function UtilisateurPage(){
    await verifToken();
    return(<>
        <h1>Bienvenue sur votre espace Admin</h1>
    </>)
}