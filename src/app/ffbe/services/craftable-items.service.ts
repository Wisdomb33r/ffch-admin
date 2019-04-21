import {Injectable} from '@angular/core';
import {CraftableItem} from '../model/craftable-item.model';
import {ConsumablesService} from './consumables.service';
import {EquipmentsService} from './equipments.service';
import {MateriasService} from './materias.service';
import {FfbeUtils} from '../utils/ffbe-utils';
import {isNullOrUndefined} from 'util';
import {ItemCategory, ItemCategoryFactory} from '../model/item-category.model';

@Injectable()
export class CraftableItemsService {

  private itemsFromDataMining = null;

  constructor(private itemService: ConsumablesService,
              private equipmentService: EquipmentsService,
              private materiaService: MateriasService) {
  }

  public searchForCraftableItemsByNames(english: string, french: string): Array<CraftableItem> {
    const craftableItems: Array<CraftableItem> = [];


    const consumables = this.itemService.searchForConsumablesByNames(english, french);
    if (Array.isArray(consumables) && consumables.length > 0) {
      consumables.forEach(consumable => {
        craftableItems.push(new CraftableItem('ItemCategory.Consumable', consumable, null, null));
      });
    }

    const equipments = this.equipmentService.searchForEquipmentsByNames(english, french);
    if (Array.isArray(equipments) && equipments.length > 0) {
      equipments.forEach(equipment => {
        craftableItems.push(new CraftableItem('ItemCategory.Equipment', null, equipment, null));
      });
    }

    const materias = this.materiaService.searchForMateriasByNames(english, french);
    if (Array.isArray(materias) && materias.length > 0) {
      materias.forEach(materia => {
        craftableItems.push(new CraftableItem('ItemCategory.Materia', null, null, materia));
      });
    }

    return craftableItems;
  }

  public searchForCraftableItemByExtendedGumiId(extendedGumiId: string): CraftableItem {
    if (!isNullOrUndefined(extendedGumiId)) {
      const itemCategory = CraftableItemsService.extractItemCategory(extendedGumiId);
      const gumiId = FfbeUtils.extractGumiId(extendedGumiId);

      let craftableItem: CraftableItem;

      switch (itemCategory) {
        case 'ItemCategory.Consumable': {
          const consumable = this.itemService.searchForConsumableByGumiId(gumiId);
          craftableItem = new CraftableItem(itemCategory, consumable, null, null);
          break;
        }

        case 'ItemCategory.Equipment': {
          const equipment = this.equipmentService.searchForEquipmentByGumiId(gumiId);
          craftableItem = new CraftableItem(itemCategory, null, equipment, null);
          break;
        }

        case 'ItemCategory.Materia': {
          const materia = this.materiaService.searchForMateriaByGumiId(gumiId);
          craftableItem = new CraftableItem(itemCategory, null, null, materia);
          break;
        }

        case 'ItemCategory.Unknown': {
          craftableItem = new CraftableItem(itemCategory, null, null, null);
          break;
        }

      }
      return craftableItem;
    }
    return null;
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

  public isLoaded(): boolean {
    return this.itemsFromDataMining != null;
  }
}

