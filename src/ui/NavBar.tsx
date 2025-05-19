import Link from 'next/link';
export default function NavBar() {
    return (<>
        <header>
            <nav className="navBar navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="/"><img src="/img/logo.png" alt="Logo OnWay" className="logoNavBar"/></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link href="/" className="nav-link">Accueil</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/contact" className="nav-link">Contact</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/connexion" className="nav-link">Connexion</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/inscription" className="nav-link">Inscription</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    </>)
}