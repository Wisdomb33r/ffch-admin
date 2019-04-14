import {ItemRecipe} from '../model/item-recipe.model';
import {Recette} from '../model/recette.model';
import {Formule} from '../model/formule.model';
import {FfbeUtils} from '../utils/ffbe-utils';
import {Ingredient} from '../model/ingredient.model';
import {isNumber} from 'util';
import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';

export class ItemRecipeMapper {

  public static toRecette(itemRecipe: ItemRecipe) {

    let gumiIdResultat = 0;
    if (itemRecipe && itemRecipe.item) {
      gumiIdResultat = FfbeUtils.extractGumiId(itemRecipe.item);
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
    if (itemRecipe && itemRecipe.dmItem && itemRecipe.dmItem.price_sell) {
      gils = 2 * itemRecipe.dmItem.price_sell;
    }

    const ingredients: Array<Ingredient> = [];
    if (itemRecipe && itemRecipe.mats) {
      const materialsNames: string[] = Object.getOwnPropertyNames(itemRecipe.mats);

      for (const materialName of materialsNames) {
        const ingredient = new Ingredient(FfbeUtils.extractGumiId(materialName), itemRecipe.mats[materialName]);
        ingredients.push(ingredient);
      }
      FfbeUtils.sortArrayIngredients(ingredients);
    }

    let recette = new Recette(itemRecipe.gumi_id, gumiIdResultat, time, new Formule(ingredients, gils), count);

    if (itemRecipe && itemRecipe.dmItem && itemRecipe.dmItem.strings && itemRecipe.dmItem.strings.names) {
      recette.nom_item = itemRecipe.dmItem.strings.names[FFBE_FRENCH_TABLE_INDEX];
      recette.nom_item_en = itemRecipe.dmItem.strings.names[FFBE_ENGLISH_TABLE_INDEX];

    }

    return recette;

  }

}
