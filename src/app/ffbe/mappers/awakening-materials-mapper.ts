import {Formule} from '../model/formule.model';
import {FfbeUtils} from '../utils/ffbe-utils';
import {Ingredient} from '../model/ingredient.model';
import {isNumber} from 'util';

export class AwakeningMaterialsMapper {

  public static toFormule(awakening: any) {

    let gils = 0;
    if (awakening && awakening.gil && isNumber(awakening.gil)) {
      gils = awakening.gil;
    }

    const ingredients: Array<Ingredient> = [];
    if (awakening && awakening.materials) {
      const awakeningMaterialsNames: string[] = Object.getOwnPropertyNames(awakening.materials);

      for (const awakeningMaterialName of awakeningMaterialsNames) {
        const ingredient = new Ingredient(+awakeningMaterialName, awakening.materials[awakeningMaterialName]);
        ingredients.push(ingredient);
      }
      FfbeUtils.sortArrayIngredients(ingredients);
    }

    return new Formule(ingredients, gils);
  }

}
