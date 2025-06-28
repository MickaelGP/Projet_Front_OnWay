// Fonction pour valider un email
export const validationEmail = (email: string) => {
  // Regex pour vérifier le format de l'email
  const regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let resultat: boolean;
  // Si l'email correspond au format, c'est valide
  if (regex.test(email)) {
    resultat = true;
  } else {
    resultat = false;
  }
  return resultat;
};

// Fonction pour valider un mot de passe sécurisé
export const validationMdp = (mdp: string) => {
  // Regex pour vérifier la sécurité du mot de passe
  const regex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
  let resultat: boolean;
  // Si le mot de passe correspond au format, c'est valide
  if (regex.test(mdp)) {
    resultat = true;
  } else {
    resultat = false;
  }
  return resultat;
};

// Fonction pour valider un numéro de téléphone français
export const valideTelephone = (telephone: string) => {
  // Regex pour vérifier le format du numéro
  const regex: RegExp = /^((\+|00)33\s?|0)[67](\s?\d{2}){4}$/;
  let resultat: boolean;
  // Si le numéro correspond au format, c'est valide
  if (regex.test(telephone)) {
    resultat = true;
  } else {
    resultat = false;
  }
  return resultat;
};

// Fonction pour vérifier si deux mots de passe sont identiques
export const mdpIdentique = (mdp: string, confirmMdp: string) => {
 let resultat: boolean;
  // Si les deux mots de passe sont égaux, c'est valide
  if (mdp == confirmMdp) {
    resultat = true;
  } else {
    resultat = false;
  }
  return resultat;
};

// Fonction pour vérifier si l'utilisateur a au moins 18 ans
export const verifAge = (date: string) =>{
  let resultat: boolean;
  const unDate = new Date();
  const unAnnee = unDate.getFullYear();
  const naissance = date.split("-");
  const utilAnneeNaissance = naissance[0];
  // On vérifie la différence d'années
  if((unAnnee - parseInt(utilAnneeNaissance)) >= 18){
    resultat = true;
  }else{
    resultat = false;
  }
  return resultat
}

// Fonction pour valider le titre d'un message de contact
export const valideTitreContact = (unTitre: string) =>{
  let resultat: boolean;
  // Le titre doit faire au moins 5 caractères
  if(unTitre.length >= 5){
    resultat = true;
  }else{
    resultat = false;
  }
  return resultat
}

// Fonction pour valider le contenu d'un message de contact
export const valideMessageContact = (unMessage: string) =>{
  let resultat: boolean;
  // Le message doit faire entre 10 et 255 caractères
  if(unMessage.length >= 10 && unMessage.length <= 255){
    resultat = true;
  }else{
    resultat = false;
  }
  return resultat
}

// Fonction pour valider un nom (au moins 5 caractères)
export const valideNom = (unNom: string) =>{
   let resultat: boolean;
  if(unNom.length >= 5){
    resultat = true;
  }else{
    resultat = false;
  }
  return resultat
}

// Fonction pour valider une plaque d'immatriculation française (format AA-123-AA)
export const validePlaque = (unePlaque: string) =>{
  const regex: RegExp = /^[A-Z]{2}-\d{3}-[A-Z]{2}$/;
 let resultat: boolean;
  if (regex.test(unePlaque)) {
    resultat = true;
  } else {
    resultat = false;
  }
  return resultat;
}

// Fonction pour valider le type d'énergie du véhicule
export const valideEnergie = (uneEnergie: string) =>{
  const energies: string[] = ["Essence", "Diesel", "Electrique"];
  let resultat: boolean;
  // L'énergie doit être dans la liste
  if (energies.includes(uneEnergie)) {
    resultat = true;
  } else {
    resultat = false;
  }
  return resultat;
}

// Fonction pour valider le nombre de sièges (entre 1 et 7)
export const valideNombreSiege = (nbSiege: string) => {
  let resultat: boolean;
  if (parseInt(nbSiege) >= 1 && parseInt(nbSiege) <= 7) {
    resultat = true;
  } else {
    resultat = false;
  }
  return resultat;
}

// Fonction pour valider un code postal (5 chiffres)
export const valideCpVille = (unCpVille: string) =>{
  const regex: RegExp = /^[0-9]{5}$/;
  let resultat: boolean;
  if (regex.test(unCpVille)) {
    resultat = true;
  } else {
    resultat = false;
  }
  return resultat;
}

// Fonction pour valider une adresse (entre 3 et 60 caractères)
export const valideAdresse = (uneAdresse: string) =>{
  let resultat: boolean;
  if(uneAdresse.length >= 3 && uneAdresse.length <= 60){
    resultat = true;
  }else{
    resultat = false;
  }
  return resultat;
}