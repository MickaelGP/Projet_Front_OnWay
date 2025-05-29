import UtilInfoDashboard from "@/components/utilisateurs/UtilInfoDashboard";
import { verifToken } from "@/utils/verifCookies"
// import InfoUtil from "@/ui/utilisateur/InfoUtil";
export default async function UtilisateurPage() {
    await verifToken();
    return (<>
        <section>
            {/* <InfoUtil /> */}
            <UtilInfoDashboard/>
        </section>
    </>)
}