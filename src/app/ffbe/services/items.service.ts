import {Injectable} from '@angular/core';
import {Item} from '../model/item.model';
import {ConsumablesService} from './consumables.service';
import {EquipmentsService} from './equipments.service';
import {MateriasService} from './materias.service';
import {FfbeUtils} from '../utils/ffbe-utils';
import {ItemCategory, ItemCategoryFactory} from '../model/item-category.model';

@Injectable()
export class ItemsService {

  constructor(private consumablesService: ConsumablesService,
              private equipmentService: EquipmentsService,
              private materiaService: MateriasService) {
  }

  public static extractItemCategory(rawGumiId: string): ItemCategory {

    let itemCategory: ItemCategory;
    const splitGumiId = rawGumiId.split(':');

    if (splitGumiId.length === 0) {
      itemCategory = 'ItemCategory.Unknown';
    } else {
      itemCategory = ItemCategoryFactory.fromString(splitGumiId[0]);
    }

    return itemCategory;
  }

  public searchForItemsByNames(english: string, french: string): Array<Item> {
    const items: Array<Item> = [];


    const consumables = this.consumablesService.searchForConsumablesByNames(english, french);
    if (Array.isArray(consumables) && consumables.length > 0) {
      consumables.forEach(consumable => {
        items.push(new Item('ItemCategory.Consumable', consumable, null, null));
      });
    }

    const equipments = this.equipmentService.searchForEquipmentsByNames(english, french);
    if (Array.isArray(equipments) && equipments.length > 0) {
      equipments.forEach(equipment => {
        items.push(new Item('ItemCategory.Equipment', null, equipment, null));
      });
    }

    const materias = this.materiaService.searchForMateriasByNames(english, french);
    if (Array.isArray(materias) && materias.length > 0) {
      materias.forEach(materia => {
        items.push(new Item('ItemCategory.Materia', null, null, materia));
      });
    }

    return items;
  }

  public searchForItemByExtendedGumiId(extendedGumiId: string): Item {
    if (!FfbeUtils.isNullOrUndefined(extendedGumiId)) {
      const itemCategory = ItemsService.extractItemCategory(extendedGumiId);
      const gumiId = FfbeUtils.extractGumiId(extendedGumiId);

      let item: Item;

      switch (itemCategory) {
        case 'ItemCategory.Consumable': {
          const consumable = this.consumablesService.searchForConsumableByGumiId(gumiId);
          item = new Item(itemCategory, consumable, null, null);
          break;
        }

        case 'ItemCategory.Equipment': {
          const equipment = this.equipmentService.searchForEquipmentByGumiId(gumiId);
          item = new Item(itemCategory, null, equipment, null);
          break;
        }

        case 'ItemCategory.Materia': {
          const materia = this.materiaService.searchForMateriaByGumiId(gumiId);
          item = new Item(itemCategory, null, null, materia);
          break;
        }

        case 'ItemCategory.Unknown': {
          item = new Item(itemCategory, null, null, null);
          break;
        }

      }
      return item;
    }
    return null;
  }

  public searchForItemsByGumiId(gumiId: string): Array<Item> {
    if (!FfbeUtils.isNullOrUndefined(gumiId)) {

      const items: Array<Item> = [];

      const consumable = this.consumablesService.searchForConsumableByGumiId(+gumiId);
      if (!FfbeUtils.isNullOrUndefined(consumable)) {
        items.push(new Item('ItemCategory.Consumable', consumable, null, null));
      }

      const equipment = this.equipmentService.searchForEquipmentByGumiId(+gumiId);
      if (!FfbeUtils.isNullOrUndefined(equipment)) {
        items.push(new Item('ItemCategory.Equipment', null, equipment, null));
      }

      const materia = this.materiaService.searchForMateriaByGumiId(+gumiId);
      if (!FfbeUtils.isNullOrUndefined(materia)) {
        items.push(new Item('ItemCategory.Materia', null, null, materia));
      }
      return items;
    }
    return null;
  }

  public isLoaded(): boolean {
    return this.consumablesService.isLoaded() && this.equipmentService.isLoaded() && this.consumablesService.isLoaded();
  }
}

