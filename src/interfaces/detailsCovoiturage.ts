export default interface DetailsCovoiturage {
  covoitId: number;
  covoitPrix: number;
  covoitDate: string;
  covoitDep: string;
  covoitArr: string;
  covoitAnimaux: boolean;
  covoitFumeur: boolean;
  covoitMusique: boolean;
  departNum: number;
  departRue: string;
  departVille: string;
  arriverNum: number;
  arriveRue: string;
  arriveVille: string;
  voitEnergie: string;
  voitCouleur: string;
  voitModele: string;
  voitMarque: string;
  conducId: number;
  conducPseudo: string;
  note: number;
  nbCom: number;
}
