export const API_URL = process.env.API_URL!
export const API_ROUTES = {
    connexion: '/connexion',
    deconnexion: '/deconnexion',
    inscription: '/inscription',
    contact: '/contact',
    rechercheCovoit: '/recherche-covoiturage',
    detailsCovoit: '/details/',
    infoProfil:"/info-profil",
    modifProfil:"/update-profil",
    modifMdp:"/update-mot-de-passe",
    supprimerCompte: "/delete-profil",
    couleurs:'/couleurs',
    modeles:"/modeles",
    ajoutVoiture: "/ajout-voitures",
    listeVoitures: "/liste-voitures",
    ajouterCovoiturage: "/ajouter-covoiturage",
    reserverCovoit: "/participer-covoiturage",
    listeComptes: "/liste-comptes",
    detailsCompte: "/details-compte/",
    majStatut: "/update-compte",
    ajoutEmploye: "/ajout-compte-employé",
    deleteCompte : "/delete-compte-employé"
}