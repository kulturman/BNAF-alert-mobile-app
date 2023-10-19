
export interface UserOptions {
  username: string;
  password: string;
}

export interface User {
  nom: string;
  prenom: string;
  nip: string;
}


export interface Alert {
  nom: string;
  prenom: string;
  nip: string;
  ville: string;
  secteur: string;
  arrondissement: string;
  structure: string;
  commentaire: string;
}
