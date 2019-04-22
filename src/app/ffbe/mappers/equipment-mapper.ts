import {Equipment} from '../model/equipment/equipment.model';
import {Objet} from '../model/objet.model';
import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {ItemCategory, ItemCategoryFactory} from '../model/item-category.model';

export class EquipmentMapper {

  public static toObjet(equipment: Equipment) {
    const objet = new Objet(null,
      equipment.strings.name[FFBE_FRENCH_TABLE_INDEX],
      equipment.strings.name[FFBE_ENGLISH_TABLE_INDEX],
      null,
      equipment.gumi_id
    );

    objet.extended_gumi_id = ItemCategoryFactory.toString('ItemCategory.Equipment') + ':' + equipment.gumi_id;
    objet.prix_vente = equipment.price_sell;

    return objet;
  }
}
