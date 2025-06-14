import FormAjoutEmploye from "@/ui/admin/FormAjoutEmploye";
import { verifToken } from "@/utils/verifCookies";
export default async function AjouterUnEmployePage() {
    await verifToken();
    return (<>
        <FormAjoutEmploye/>
    </>);
}