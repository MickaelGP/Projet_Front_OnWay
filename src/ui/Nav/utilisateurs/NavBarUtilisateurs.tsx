"use client";
import Link from 'next/link';
import styles from '@/ui/Nav/page.module.css'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function NavBarUtilisateurs() {
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
                                <Link href="/utilisateur" className={`${styles.navLinkColor} nav-link`}>Dashboard</Link>
                            </li>
                            <li className={`nav-item dropdown`}>
                                <a className={`${styles.navLinkColor} nav-link dropdown-toggle`} href="#" id="navbarDropdownMenuCovoit" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Covoiturages
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuCovoit">
                                    <li><Link href="/recherche-covoiturage" className={`dropdown-item`}>Rechercher</Link></li>
                                    <li><Link href="/utilisateur/ajouter-voiture" className={`dropdown-item`}>Ajouter une voiture</Link></li>
                                    <li><Link href="/utilisateur/ajouter-covoiturage" className={`dropdown-item`}>Créer un covoiturage</Link></li>
                                    <li><Link href="#" className={`dropdown-item`}>Modifier un covoiturage</Link></li>
                                    <li><Link href="#" className={`dropdown-item`}>Supprimer un covoiturage</Link></li>
                                </ul>
                            </li>
                            <li className={`nav-item dropdown`}>
                                <a className={`${styles.navLinkColor} nav-link dropdown-toggle`} href="#" id="navbarDropdownMenuProfil" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Profil
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuProfil">
                                    <li><Link href="/utilisateur/modif-mot-de-passe" className={`dropdown-item`}>Modifier le mot de passe</Link></li>
                                    <li><Link href="/utilisateur/supprimer-compte" className={`dropdown-item`}>Supprimer le profil</Link></li>
                                </ul>
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