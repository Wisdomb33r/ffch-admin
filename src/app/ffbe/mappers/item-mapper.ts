import {Item} from '../model/items/item.model';
import {Objet} from '../model/objet/objet.model';
import {ConsumableMapper} from './consumable-mapper';
import {EquipmentMapper} from './equipment-mapper';
import {MateriaMapper} from './materia-mapper';
import {Character} from '../model/character/character.model';
import {ObjetLienTMR} from '../model/objet/objet-lien-tmr.model';
import {ItemCategoryFactory} from '../model/items/item-category.model';
import {FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {FfbeUtils} from '../utils/ffbe-utils';

export class ItemMapper {

  public static toObjet(item: Item): Objet {
    let objet: Objet = null;

    switch (item.category) {
      case 'ItemCategory.Consumable': {
        objet = ConsumableMapper.toObjet(item.consumable);
        break;
      }

      case 'ItemCategory.Equipment': {
        objet = EquipmentMapper.toObjet(item.equipment);
        break;
      }

      case 'ItemCategory.Materia': {
        objet = MateriaMapper.toObjet(item.materia);
        break;
      }
    }

    return objet;
  }

  public static mapLienTRM(item: Item, character: Character): ObjetLienTMR {
    if (FfbeUtils.isNullOrUndefined(item) || FfbeUtils.isNullOrUndefined(character)) {
      return null;
    }

    const itemGumiId = item.getGumiId();
    const itemCatetogyName = ItemCategoryFactory.getName(item.category);

    let lien = null;

    if (Array.isArray(character.TMR) && character.TMR.length == 2 &&
      character.TMR[0] === itemCatetogyName && character.TMR[1] == itemGumiId) {
      lien = new ObjetLienTMR(character.gumi_id, character.names[FFBE_FRENCH_TABLE_INDEX], false);
    } else if (Array.isArray(character.sTMR) && character.sTMR.length == 2 &&
      character.sTMR[0] === itemCatetogyName && character.sTMR[1] == itemGumiId) {
      lien = new ObjetLienTMR(character.gumi_id, character.names[FFBE_FRENCH_TABLE_INDEX], true);
    }

    return lien;
  }

}
