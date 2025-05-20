"use client"
import styles from './page.module.css'
import { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image'

export default function NavBar() {
  const [ouvert, setOuvert] = useState(false)

  return (
    <header>
      <nav className={styles.navBar}>
        <span className={styles.logo}><Image src="/img/logo.png" alt='logo OnWay' width={48} height={48} /></span>
        <button className={styles.toggleButton} onClick={() => setOuvert(!ouvert)} aria-label="Toggle navigation">
          ☰
        </button>
        <div className={`${styles.menu} ${ouvert ? styles.ouvert : ''}`}>
            <Link href="/">Accueil</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/inscription">Inscription</Link>
            <Link href="/connexion">Connexion</Link>
        </div>
      </nav>
    </header>
  )
}
