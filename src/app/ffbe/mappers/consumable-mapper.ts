import {Consumable} from '../model/consumable.model';
import {Objet} from '../model/objet/objet.model';
import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {ItemCategoryFactory} from '../model/item-category.model';
import {CategorieObjet} from '../model/objet/categorie-objet.model';
import {FfbeUtils} from '../utils/ffbe-utils';

export class ConsumableMapper {

  public static toObjet(consumable: Consumable): Objet {
    const objet = new Objet(null,
      ConsumableMapper.mapTypeIntoCategorie(consumable.type),
      consumable.strings.names[FFBE_FRENCH_TABLE_INDEX],
      consumable.strings.names[FFBE_ENGLISH_TABLE_INDEX],
      null,
      null,
      consumable.gumi_id,
      consumable.strings.desc_short[FFBE_FRENCH_TABLE_INDEX],
      consumable.strings.desc_short[FFBE_ENGLISH_TABLE_INDEX],
      null,
      (Array.isArray(consumable.effects) && consumable.effects.length > 0) ? consumable.effects.join('<br />') : null,
      null,
      null,
      null
    );

    objet.extended_gumi_id = ItemCategoryFactory.toString('ItemCategory.Consumable') + ':' + consumable.gumi_id;
    objet.prix_vente = consumable.price_sell;

    return objet;
  }

  public static mapTypeIntoCategorie(type: string): CategorieObjet {
    let categorie = FfbeUtils.findObjetCategorieByFfchId(5);

    if (type === '4') {
      categorie = FfbeUtils.findObjetCategorieByFfchId(36);
    } else if (type === 'Awakening') {
      categorie = FfbeUtils.findObjetCategorieByFfchId(79);
    } else if (type === 'Item') {
      categorie = FfbeUtils.findObjetCategorieByFfchId(4);
    }

    return categorie;
  }

}
