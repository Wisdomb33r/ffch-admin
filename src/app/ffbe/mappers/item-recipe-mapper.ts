import {ItemRecipe} from '../model/item-recipe.model';
import {Recette} from '../model/recette.model';
import {Formule} from '../model/formule.model';
import {FfbeUtils} from '../utils/ffbe-utils';
import {Ingredient} from '../model/ingredient.model';
import {isNumber} from 'util';

export class ItemRecipeMapper {

  public static toRecette(itemRecipe: ItemRecipe) {

    let gumiIdResultat=0;
    if(itemRecipe && itemRecipe.item)
    {
      gumiIdResultat = this.extractGumiId(itemRecipe.item);
    }

    let time = 0;
    if (itemRecipe && itemRecipe.time && isNumber(itemRecipe.time)) {
      time = itemRecipe.time;
    }

    let count = 0;
    if (itemRecipe && itemRecipe.count && isNumber(itemRecipe.count)) {
      count = itemRecipe.count;
    }

    let gils = 0;

    const ingredients: Array<Ingredient> = [];
    if (itemRecipe && itemRecipe.mats) {
      const materialsNames: string[] = Object.getOwnPropertyNames(itemRecipe.mats);

      for (const materialName of materialsNames) {
        const ingredient = new Ingredient(this.extractGumiId(materialName), itemRecipe.mats[materialName]);
        ingredients.push(ingredient);
      }
      FfbeUtils.sortArrayIngredients(ingredients);
    }

    return new Recette(itemRecipe.gumi_id, gumiIdResultat, time, new Formule(ingredients, gils), count);
  }

  public static extractGumiId(rawGumiId: string): number {
    let gumiId: number;

    const splitGumiId = rawGumiId.split(':');

    if (splitGumiId.length === 0) {
      gumiId = 0;
    } else {
      gumiId = +splitGumiId[splitGumiId.length - 1];
    }

    return gumiId;
  }

}
