import styles from '@/ui/Form/styles/rechercheCovoit.module.css'
import Footer from "@/ui/Footer/Footer";
import FormRechercheCovoit from "@/ui/Form/FormRechercheCovoit";
import NavBar from "@/ui/Nav/NavBar";
import CovoitCard from '@/ui/card/covoitCard';

export default function RechercheCovoitPage() {
    return (<>
        <NavBar />
        <main className={`${styles.rechercheBackground} py-5`}>
            <FormRechercheCovoit />
            <CovoitCard/>
        </main>
        <Footer />
    </>);
}