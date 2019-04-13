import {Formule} from './formule.model';
import {Objet} from './objet.model';

export class Recette {

  public id: number;
  public recette: Objet;
  public resultat: Objet;

  constructor(public recette_gumi_id: number,
              public resultat_gumi_id: number,
              public craft_time: number,
              public formule: Formule,
              public nb_resultat: number) {
  }
}
