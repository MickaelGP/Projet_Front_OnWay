"use client"

import Footer from "@/ui/Footer/Footer"
import NavBar from "@/ui/Nav/NavBar"
import styles from '@/ui/Form/styles/rechercheCovoit.module.css'
//import { useParams } from "next/navigation"

export default function DetailCovoitPage() {
    // const params = useParams<{covoitId: string}>()
    // console.log(params.covoitId)
    return (<>
        <NavBar />
            <main className={`${styles.rechercheBackground}`}>
                <section className="d-flex justify-content-between bg-white shadow p-3 mb-3">
                    <div className="d-flex flex-column">
                        <span>11:00</span>
                        <span>11:00</span>
                        <span>11:00</span>
                    </div>
                    <div>
                        <h1>Le 17 mars</h1>
                    </div>
                    <div>
                        <div>
                            <p>Nice</p>
                        </div>
                        <div>
                            <p>Paris</p>
                        </div>
                    </div>
                </section>
                <section className="d-flex justify-content-between bg-white shadow p-3 mb-3">
                    <h2>Prix</h2>
                    <span>15.00£</span>
                </section>
                <section className="text-center bg-white shadow p-3 mb-3">
                    <h2>Véhicule</h2>
                    <div>
                        <div>
                            <div>
                                <img src="" alt="" />
                            </div>
                            <div>
                                Renault
                            </div>
                        </div>
                        <div>
                            <div>
                                <img src="" alt="" />
                            </div>
                            <div>
                                Essence
                            </div>
                        </div>
                        <div>
                            <div>
                                <img src="" alt="" />
                            </div>
                            <div>
                                Rouge
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-white shadow p-3">
                    <div className="d-flex border-bottom ">
                        <div>
                            <img src="" alt="" />
                        </div>
                        <div>
                            <h4>Dylan</h4>
                        </div>
                        <div>
                            <img src="" alt="" />
                            <span>4</span>
                        </div>
                    </div>
                    <div className="text-center my-3 border-bottom">
                        <h4>Préférences</h4>
                        <p>Musique</p>
                        <p>Musique</p>
                        <p>Musique</p>
                        <p>Musique</p>
                    </div>
                    <div>
                        <h5 className="text-center my-5">Les avis</h5>
                        <div className="border-bottom pb-3">
                            <div>
                                <img src="" alt="" />
                                <span>Super</span>
                            </div>
                            <div>
                                <p>Nom</p>
                                <span>Note</span>
                            </div>
                            <div>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto odit cum ipsam perferendis eligendi suscipit? 
                                Quas adipisci corrupti ratione nemo sed doloribus soluta asperiores tempore nam, mollitia atque sequi! A.
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-5">
                        <button className="btn btn-primary"> Participer</button>
                    </div>
                </section>
            </main>
        <Footer />
    </>)
}