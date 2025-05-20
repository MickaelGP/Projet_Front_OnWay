import Link from 'next/link';
import styles from '@/ui/Nav/page.module.css'
export default function NavBar() {
    return (<>
        <header>
            <nav className={`${styles.navBar} navbar navbar-expand-lg`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" href="/"><img src="/img/logo.png" alt="Logo OnWay" className={`${styles.logoNavBar}`}/></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link href="/" className={`${styles.navLinkColor} nav-link`}>Accueil</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/contact" className={`${styles.navLinkColor} nav-link`}>Contact</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/inscription" className={`${styles.navLinkColor} nav-link`}>Inscription</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/connexion" className={`${styles.navLinkColor} nav-link`}>Connexion</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    </>)
}