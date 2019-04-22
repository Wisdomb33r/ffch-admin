import {ItemRecipe} from '../model/item-recipe.model';
import {Recette} from '../model/recette.model';
import {Formule} from '../model/formule.model';
import {FfbeUtils} from '../utils/ffbe-utils';
import {Ingredient} from '../model/ingredient.model';
import {isNumber} from 'util';
import {Objet} from '../model/objet.model';
import {ItemMapper} from './item-mapper';

export class ItemRecipeMapper {

  public static toRecette(itemRecipe: ItemRecipe) {

    let resultat: Objet = null;

    if (itemRecipe && itemRecipe.dmItem) {
      resultat = ItemMapper.toObjet(itemRecipe.dmItem);
    }

    let gumiIdResultat = 0;
    if (resultat) {
      gumiIdResultat = resultat.gumi_id;
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
    if (resultat) {
      gils = 2 * resultat.prix_vente;
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

    const recette = new Recette(itemRecipe.gumi_id, gumiIdResultat, time, new Formule(ingredients, gils), count);

    if (resultat) {
      recette.nom_item = resultat.nom;
      recette.nom_item_en = resultat.nom_en;
    }

    return recette;

  }

}
