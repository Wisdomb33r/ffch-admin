import {Ingredient} from './ingredient.model';

export class Formule {

  constructor(public ingredients: Array<Ingredient>,
              public gils: number) {
  }

  public static produce(formule: Formule): Formule {
    const ingredients = formule.ingredients.map(ingredient => Ingredient.produce(ingredient));
    return new Formule(ingredients, formule.gils);
  }
}
