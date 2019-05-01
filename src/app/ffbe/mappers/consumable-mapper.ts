import {Consumable} from '../model/consumable.model';
import {Objet} from '../model/objet.model';
import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {ItemCategoryFactory} from '../model/item-category.model';

export class ConsumableMapper {

  public static toObjet(consumable: Consumable): Objet {
    const objet = new Objet(null,
      consumable.strings.names[FFBE_FRENCH_TABLE_INDEX],
      consumable.strings.names[FFBE_ENGLISH_TABLE_INDEX],
      null,
      consumable.gumi_id,
      consumable.strings.desc_short[FFBE_FRENCH_TABLE_INDEX],
      consumable.strings.desc_short[FFBE_ENGLISH_TABLE_INDEX],
      null,
      (Array.isArray(consumable.effects) && consumable.effects.length > 0) ? consumable.effects.join('<br />') : null,
      null
    );

    objet.extended_gumi_id = ItemCategoryFactory.toString('ItemCategory.Consumable') + ':' + consumable.gumi_id;
    objet.prix_vente = consumable.price_sell;

    return objet;
  }

}
