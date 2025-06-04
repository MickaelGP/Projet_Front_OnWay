import FormAjoutVoiture from "@/ui/utilisateur/form/formAjoutCovoit";
import { verifToken } from "@/utils/verifCookies";
export  default async function AjouterCovoituragePage(){
    await verifToken();
    return(<>
        <FormAjoutVoiture />
    </>)
}