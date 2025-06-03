export const validationEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let resultat;
  if (regex.test(email)) {
    resultat = true;
  } else {
    resultat = false;
  }
  return resultat;
};
export const validationMdp = (mdp: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
  let resultat;
  if (regex.test(mdp)) {
    resultat = true;
  } else {
    resultat = false;
  }
  return resultat;
};
export const valideTelephone = (telephone: string) => {
  const regex = /^((\+|00)33\s?|0)[67](\s?\d{2}){4}$/;
  let resultat;
  if (regex.test(telephone)) {
    resultat = true;
  } else {
    resultat = false;
  }
  return resultat;
};
export const mdpIdentique = (mdp: string, confirmMdp: string) => {
  let resultat;
  if (mdp == confirmMdp) {
    resultat = true;
  } else {
    resultat = false;
  }
  return resultat;
};
export const verifAge = (date: string) =>{
  let resultat;
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
  let resultat;
  if(unTitre.length >= 5){
    resultat = true;
  }else{
    resultat = false;
  }
  return resultat
}
export const valideMessageContact = (unMessage: string) =>{
  let resultat;
  if(unMessage.length >= 10 && unMessage.length <= 255){
    resultat = true;
  }else{
    resultat = false;
  }
  return resultat
}
export const valideNom = (unNom: string) =>{
   let resultat;
  if(unNom.length >= 5){
    resultat = true;
  }else{
    resultat = false;
  }
  return resultat
}

export const validePlaque = (unePlaque: string) =>{
  const regex = /^[A-Z]{2}-\d{3}-[A-Z]{2}$/;
  let resultat;
  if (regex.test(unePlaque)) {
    resultat = true;
  } else {
    resultat = false;
  }
  return resultat;
}

export const valideEnergie = (uneEnergie: string) =>{
  const energies = ["Essence", "Diesel", "Electrique"];
  let resultat;
  if (energies.includes(uneEnergie)) {
    resultat = true;
  } else {
    resultat = false;
  }
  return resultat;
}