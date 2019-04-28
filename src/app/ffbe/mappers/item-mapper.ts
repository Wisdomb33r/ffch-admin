import {Item} from '../model/item.model';
import {Objet} from '../model/objet.model';
import {ConsumableMapper} from './consumable-mapper';
import {EquipmentMapper} from './equipment-mapper';
import {MateriaMapper} from './materia-mapper';
import {isNullOrUndefined} from 'util';
import {ObjetCarac} from '../model/objet-carac';

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

    if (isNullOrUndefined(objet.carac)) {
      objet.carac = ObjetCarac.newEmptyObjetCarac();
    }

    if (isNullOrUndefined(objet.caracp)) {
      objet.caracp = ObjetCarac.newEmptyObjetCarac();
    }

    return objet;
  }

}
