export const validationEmail = (email: string) => {
  const regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let resultat: boolean;
  if (regex.test(email)) {
    resultat = true;
  } else {
    resultat = false;
  }
  return resultat;
};
export const validationMdp = (mdp: string) => {
  const regex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
  let resultat: boolean;
  if (regex.test(mdp)) {
    resultat = true;
  } else {
    resultat = false;
  }
  return resultat;
};
export const valideTelephone = (telephone: string) => {
  const regex: RegExp = /^((\+|00)33\s?|0)[67](\s?\d{2}){4}$/;
  let resultat: boolean;
  if (regex.test(telephone)) {
    resultat = true;
  } else {
    resultat = false;
  }
  return resultat;
};
export const mdpIdentique = (mdp: string, confirmMdp: string) => {
 let resultat: boolean;
  if (mdp == confirmMdp) {
    resultat = true;
  } else {
    resultat = false;
  }
  return resultat;
};
export const verifAge = (date: string) =>{
  let resultat: boolean;
  const unDate = new Date();
  const unAnnee = unDate.getFullYear();
  const naissance = date.split("-");
  const utilAnneeNaissance = naissance[0];
  if((unAnnee - parseInt(utilAnneeNaissance)) >= 18){
    resultat = true;
  }else{
    resultat = false;
  }
  return resultat
}
export const valideTitreContact = (unTitre: string) =>{
  let resultat: boolean;
  if(unTitre.length >= 5){
    resultat = true;
  }else{
    resultat = false;
  }
  return resultat
}
export const valideMessageContact = (unMessage: string) =>{
  let resultat: boolean;
  if(unMessage.length >= 10 && unMessage.length <= 255){
    resultat = true;
  }else{
    resultat = false;
  }
  return resultat
}
export const valideNom = (unNom: string) =>{
   let resultat: boolean;
  if(unNom.length >= 5){
    resultat = true;
  }else{
    resultat = false;
  }
  return resultat
}

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

export const valideEnergie = (uneEnergie: string) =>{
  const energies: string[] = ["Essence", "Diesel", "Electrique"];
  let resultat: boolean;
  if (energies.includes(uneEnergie)) {
    resultat = true;
  } else {
    resultat = false;
  }
  return resultat;
}

export const valideNombreSiege = (nbSiege: string) => {
  let resultat: boolean;
  if (parseInt(nbSiege) >= 1 && parseInt(nbSiege) <= 7) {
    resultat = true;
  } else {
    resultat = false;
  }
  return resultat;
}

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

export const valideAdresse = (uneAdresse: string) =>{
  let resultat: boolean;
  if(uneAdresse.length >= 3 && uneAdresse.length <= 60){
    resultat = true;
  }else{
    resultat = false;
  }
  return resultat;
}