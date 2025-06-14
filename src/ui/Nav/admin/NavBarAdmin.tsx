"use client";
import Link from 'next/link';
import styles from '@/ui/Nav/page.module.css'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function NavBarAdmin() {
    const router = useRouter();
    const handelLogout = async () => {
        try {
            const resp = await fetch('/api/deconnexion/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if(resp.ok){
                router.push("/");
            }
            const data = await resp.json();
            console.log(data);
        } catch (err) {
            console.error(err)
        }
    }
    return (<>
        <header>
            <nav className={`${styles.navBar} navbar navbar-expand-lg`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" href="/"><Image src={"/img/logo.png"} width={48} height={48} alt='Logo OnWay' className={`${styles.logoNavBar}`} /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link href="/admin" className={`${styles.navLinkColor} nav-link`}>Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/admin/liste-comptes" className={`${styles.navLinkColor} nav-link`}>Voir les comptes</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/admin/ajouter-un-employe" className={`${styles.navLinkColor} nav-link`}>Ajouter un employé</Link>
                            </li>
                            <li className="nav-item">
                                <button className={`${styles.navLinkColor} nav-link`} onClick={handelLogout}>Déconnexion</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    </>)
}