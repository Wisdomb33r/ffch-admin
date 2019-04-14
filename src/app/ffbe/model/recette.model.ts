import {Formule} from './formule.model';
import {Objet} from './objet.model';
import {isNullOrUndefined} from 'util';

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

  public static produce(recette: Recette): Recette {
    const objetRecette = isNullOrUndefined(recette.recette) ? null : Objet.produce(recette.recette);
    const objetResultat = isNullOrUndefined(recette.resultat) ? null :  Objet.produce(recette.resultat);
    const formule = isNullOrUndefined(recette.formule) ? null : Formule.produce(recette.formule);
    let newRecette = new Recette(recette.recette_gumi_id, recette.resultat_gumi_id, recette.craft_time,
      formule, recette.nb_resultat);
    newRecette.recette = objetRecette;
    newRecette.resultat = objetResultat;
    return newRecette;
  }
}
