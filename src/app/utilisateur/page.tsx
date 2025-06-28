import UtilInfoDashboard from "@/components/utilisateurs/UtilInfoDashboard";
//import { verifToken } from "@/utils/verifCookies"
export default async function UtilisateurPage() {
    //await verifToken();
    return (<>
        <section>
            <UtilInfoDashboard/>
        </section>
    </>)
}