import {Ingredient} from './ingredient.model';
import {FfbeUtils} from '../utils/ffbe-utils';

export class Formule {

  constructor(public ingredients: Array<Ingredient>,
              public gils: number) {
  }

  public static produce(formule: Formule): Formule {
    const ingredients = formule.ingredients.map(ingredient => Ingredient.produce(ingredient));
    return new Formule(ingredients, formule.gils);
  }

  public isEqual(formule: Formule) {
    return this.areIngredientsEqual(formule) && this.areCostsEqual(formule);
  }

  public areIngredientsEqual(formule: Formule): boolean {
    return !FfbeUtils.isNullOrUndefined(formule)
      && (this.ingredients.length === formule.ingredients.length)
      && this.ingredients.every(ingredient => formule.ingredients.some(otherIngredient =>
        (otherIngredient.gumi_id === ingredient.gumi_id) && (otherIngredient.quantite === ingredient.quantite))
      );
  }

  public areCostsEqual(formule: Formule): boolean {
    return !FfbeUtils.isNullOrUndefined(formule) && (this.gils === formule.gils);
  }
}
