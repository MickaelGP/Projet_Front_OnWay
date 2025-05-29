import UtilUpdateInfo from "@/components/utilisateurs/UtilUpdateInfo";
import { verifToken } from "@/utils/verifCookies"
export default async function ModifProfilPage(){
    await verifToken();
    return(<>
        <UtilUpdateInfo/>
    </>)
}