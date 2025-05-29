import FooterUtilisateurs from "@/ui/Footer/utilisateurs/FooterUtilisateurs"
import NavBarUtilisateurs from "@/ui/Nav/utilisateurs/NavBarUtilisateurs"
export default function UtilisateurLayout({ children }: { children: React.ReactNode }) {
    return (<>
        <NavBarUtilisateurs />
            <main className="py-5">
                {children}
            </main>
        <FooterUtilisateurs />
    </>)
}