import {Formule} from './formule.model';
import {Objet} from './objet.model';

export class Recette {

  public recette: Objet;
  public resultat: Objet;

  constructor(public gumi_id_recette: number,
              public gumi_id_resultat: number,
              public craft_time: number,
              public formule: Formule,
              public nb_resultat: number) {
  }
}
