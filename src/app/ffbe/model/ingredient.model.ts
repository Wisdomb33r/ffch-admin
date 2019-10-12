import {Objet} from './objet/objet.model';
import {FfbeUtils} from '../utils/ffbe-utils';

export class Ingredient {
  public materiau: Objet;

  constructor(public gumi_id: number,
              public quantite: number) {
  }

  public static produce(m: Ingredient) {
    const ingredient = new Ingredient(m.gumi_id, m.quantite);
    ingredient.materiau = Objet.produce(m.materiau);
    return ingredient;
  }

  public isPresentInFfchDb(): boolean {
    return !FfbeUtils.isNullOrUndefined(this.materiau) && this.materiau.isPresentInFfchDb();
  }

  public isImagePresentInFfchDb(): boolean {
    return !FfbeUtils.isNullOrUndefined(this.materiau) && this.materiau.isImagePresentInFfchDb();
  }
}
