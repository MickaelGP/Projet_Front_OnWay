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
export const mdpIdentique = (mdp: string, confirmMdp: string) => {
  let resultat;
  if (mdp == confirmMdp) {
    resultat = true;
  } else {
    resultat = false;
  }
  return resultat;
};
