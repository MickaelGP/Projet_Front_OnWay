import DetailsCompte from "@/components/admin/DetailsCompte";
import { verifToken } from "@/utils/verifCookies"
export default async function DetailsComptePage(){
    await verifToken();
    return(<>
        <DetailsCompte/>
    </>)
}