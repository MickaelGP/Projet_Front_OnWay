export const mois = (unDate: string): string => {
  const listeMois = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
  const timeStamp = Date.parse(unDate);
  const date = new Date(timeStamp);
  const mois = listeMois[date.getMonth()];

  return mois;
};

export const jour = (unDate: string): number => {
  const timeStamp = Date.parse(unDate);
  const date = new Date(timeStamp);
  const jour = date.getDate();

  return jour;
};

export const tempsTrajet = (unDep: string, unArr: string): string => {
  const heureDebut = unDep;
  const heureFin = unArr;
  const dateDep = new Date(`1970-01-01T${heureDebut}Z`);
  const dateArr = new Date(`1970-01-01T${heureFin}Z`);
  const diffMs = dateArr - dateDep;
  const diffSec = diffMs / 1000;
  const heures = Math.floor(diffSec / 3600);
  const minutes = Math.floor((diffSec % 3600) / 60);
  const secondes = diffSec % 60;
  const tempTrajet = `${heures}:${minutes}:${secondes}`;
  
  return tempTrajet;
};
