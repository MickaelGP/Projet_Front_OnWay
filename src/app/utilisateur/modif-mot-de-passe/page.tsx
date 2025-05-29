import UtilModifMdp from "@/components/utilisateurs/UtilModifMdp";
import { verifToken } from "@/utils/verifCookies"
export default async function ModifMdpPage(){
    await verifToken();
    return(<>
        <UtilModifMdp/>
    </>)
} 