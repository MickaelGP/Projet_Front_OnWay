import DetailTrajet from "@/components/utilisateurs/DetailTrajet";
import { verifToken } from "@/utils/verifCookies";
export default async function DetailsTrajetPage(){
    await verifToken();
    return (<>
        <DetailTrajet/>
    </>)
}