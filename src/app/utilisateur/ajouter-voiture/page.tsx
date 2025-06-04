import FormAjoutVoiture from "@/ui/utilisateur/form/formAjoutVoiture";
import { verifToken } from "@/utils/verifCookies";
export default async function AjoutVoiturePage(){
    await verifToken();
    return (<>
        <FormAjoutVoiture/>
    </>)
}