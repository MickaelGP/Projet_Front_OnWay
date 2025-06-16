import TrajetConduc from "@/components/utilisateurs/TrajetConduc";
import { verifToken } from "@/utils/verifCookies"
export default async function MesTrajetsPage() {
    await verifToken();
    return (<>
        <TrajetConduc />
    </>)
}