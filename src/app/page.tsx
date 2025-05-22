import NavHome from '@/ui/navHome/NavHome';
import FooterHome from '@/ui/footerHome/FooterHome';
import styles from '@/app/page.module.css'
export default function Home() {
  return (<>
  <NavHome/>
    <main>
      <section className={styles.heroSection}>
        <h1>OnWay</h1>
      </section>
      <div className={styles.sectionSearchBar}>
        <div className={styles.searchBar}>
          <input type="text" name="villeDepart" id="villeDepart" placeholder="Départ" />
          <input type="text" name="villeArriver" id="villeArriver" placeholder="Destination" />
          <input type="date" name="covoitDate" id="covoitDate" />
          <input type="button" value="Rechercher" />
        </div>
      </div>
      <section className={styles.sectionTrajet}>
        <div>
          <h2>Vos trajets à petits prix</h2>
          <p>
            Où que vous alliez, vous trouvez le trajet idéal
            parmi notre large choix de destinations à petits prix.
          </p>
        </div>
        <div className={styles.imageTrajet}>
          <img src="/img/imageTrajet.JPG" alt="" />
        </div>
      </section>
      <section className={styles.sectionSecurite}>
        <div>
          <h2>Votre sécurité est notre priorité</h2>
          <p>
            Chez OnWay, nous nous sommes fixé comme objectif
            de construire une communauté de covoiturage fiable et digne
            de confiance.
          </p>
        </div>
        <div className={styles.imageCouple}>
          <img src="/img/imageCouple.png" alt="" />
        </div>
      </section>
      <section className={styles.sectionTrajetDirect}>
        <h2>Ou allez-vous ?</h2>
        <div className={styles.choix}>
          <div className={styles.choixTrajet}>
            <p>Nice <span><span><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m9 18l6-6l-6-6"/></svg></span></span> Paris</p>
          </div>
          <div className={styles.choixTrajet}>
            <p>Paris <span><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m9 18l6-6l-6-6"/></svg></span> Annecy</p>
          </div>
          <div className={styles.choixTrajet}>
            <p>Lyon <span><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m9 18l6-6l-6-6"/></svg></span> Bordeaux</p>
          </div>
        </div>
      </section>
    </main>
    <FooterHome/>
  </>);
}
