"use client"
import { useState } from 'react';
import RechercheCovoitData from '@/interfaces/rechercheCovoitData';
import styles from '@/ui/Form/styles/rechercheCovoit.module.css'
import Footer from "@/ui/Footer/Footer";
import FormRechercheCovoit from "@/ui/Form/FormRechercheCovoit";
import NavBar from "@/ui/Nav/NavBar";
import CovoitCard from '@/ui/card/covoitCard';

export default function RechercheCovoitPage() {
    const [resultat, setResultat] = useState<RechercheCovoitData[]>([]);
    const handelResults = (data: RechercheCovoitData[])=>{
        setResultat(data);
    }
    return (<>
        <NavBar />
        <main className={`${styles.rechercheBackground} py-5`}>
            <FormRechercheCovoit onResult={handelResults} />
            <CovoitCard data={resultat}/>
        </main>
        <Footer />
    </>);
}