import DetailCovoit from "@/components/DetailCovoit";
import { connecter } from "@/utils/verifCookies";
export default async function DetailCovoitPage() {
    const utilConnecter = await connecter();
    return (<>
        <DetailCovoit connecter={utilConnecter} />
    </>)
}