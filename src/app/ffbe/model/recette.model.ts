import {Formule} from './formule.model';
import {Objet} from './objet/objet.model';
import {FfbeUtils} from '../utils/ffbe-utils';

export class Recette {

  public id: number;
  public recette: Objet;
  public resultat: Objet;
  public nom_item: string;
  public nom_item_en: string;

  constructor(public recette_gumi_id: number,
              public resultat_gumi_id: number,
              public craft_time: number,
              public formule: Formule,
              public nb_resultat: number) {
  }

  public static produce(recette: Recette): Recette {
    const objetRecette = FfbeUtils.isNullOrUndefined(recette.recette) ? null : Objet.produce(recette.recette);
    const objetResultat = FfbeUtils.isNullOrUndefined(recette.resultat) ? null : Objet.produce(recette.resultat);
    const formule = FfbeUtils.isNullOrUndefined(recette.formule) ? null : Formule.produce(recette.formule);
    const newRecette = new Recette(recette.recette_gumi_id, recette.resultat_gumi_id, recette.craft_time,
      formule, recette.nb_resultat);
    newRecette.recette = objetRecette;
    newRecette.resultat = objetResultat;
    return newRecette;
  }
}
