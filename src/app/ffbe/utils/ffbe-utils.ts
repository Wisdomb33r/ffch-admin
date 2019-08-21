import {FFBE_GAMES, FFBE_CATEGORIES_OBJETS} from '../ffbe.constants';
import {Game} from '../model/game.model';
import {CategorieObjet} from '../model/objet/categorie-objet.model';
import {Ingredient} from '../model/ingredient.model';
import {isNullOrUndefined} from 'util';

export class FfbeUtils {
  public static findGameByGumiId(game_id: number): Game {
    const gameFound: Game = FFBE_GAMES.find(game => game.gumiId === game_id);
    return isNullOrUndefined(gameFound) ? new Game(game_id, undefined, 'Jeu inconnu') : gameFound;
  }

  public static findObjetCategorieByGumiId(categorie_id: number): CategorieObjet {
    return FFBE_CATEGORIES_OBJETS.find(categorie => categorie.gumiId === categorie_id);
  }

  public static findObjetCategoriesByGumiIds(categories_ids: Array<number>): Array<CategorieObjet> {
    const categories = new Array<CategorieObjet>();
    categories_ids.forEach(id => categories.push(FfbeUtils.findObjetCategorieByGumiId(id)));
    return categories;
  }

  public static findObjetCategorieByFfchId(categorie_ffch_id: number): CategorieObjet {
    return FFBE_CATEGORIES_OBJETS.find(categorie => categorie.ffchId === categorie_ffch_id);
  }

  public static findObjetCategoriesByFfchIds(categories_ffch_ids: Array<number>): Array<CategorieObjet> {
    return categories_ffch_ids.map(id => FfbeUtils.findObjetCategorieByFfchId(id))
      .sort((categorie1, categorie2) => categorie1.gumiId - categorie2.gumiId);
  }

  public static sortArrayIngredients(ingredients: Array<Ingredient>) {
    if (Array.isArray(ingredients) && ingredients.length > 0) {
        ingredients.sort((ingredient1, ingredient2) => {
        return (ingredient1.quantite !== ingredient2.quantite) ?
          (ingredient2.quantite - ingredient1.quantite) : (+ingredient1.gumi_id - +ingredient2.gumi_id);
      });
    }
  }

  public static checkIfStringsDifferent(s1: string, s2: string) {
    if (s1 && s2) {
      return ('' + s1) !== ('' + s2);
    }
    if ((s1 && !s2) || (!s1 && s2)) {
      return true;
    }
    return false;
  }

  public static checkIfNumbersDifferent(n1: number, n2: number) {
    if (n1 && n2) {
      return +n1 !== +n2;
    }
    if ((n1 && !n2) || (!n1 && n2)) {
      return true;
    }
    return false;
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
