import {Formule} from '../model/formule.model';
import {FfbeUtils} from '../utils/ffbe-utils';
import {Ingredient} from '../model/ingredient.model';
import {isNumber} from 'util';

export class AwakeningMaterialsMapper {

  public static toFormule(awakening: any) {

    let gils: number = 0;
    if (awakening && awakening.gils && isNumber(awakening.gils)) {
      gils = awakening.gils;
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
