import {Injectable} from '@angular/core';
import {CraftableItem, CraftableItemCategory, CraftableItemCategoryFactory} from '../model/craftable-item.model';
import {ItemsService} from './items.service';
import {EquipmentsService} from './equipments.service';
import {MateriasService} from './materias.service';
import {FfbeUtils} from '../utils/ffbe-utils';
import {isNullOrUndefined} from 'util';

@Injectable()
export class CraftableItemsService {

  private itemsFromDataMining = null;

  constructor(private itemService: ItemsService,
              private equipmentService: EquipmentsService,
              private materiaService: MateriasService) {
  }

  public searchForCraftableItemsByNames(english: string, french: string): Array<CraftableItem> {
    const craftableItems: Array<CraftableItem> = [];

    const items = this.itemService.searchForItemsByNames(english, french);
    if (Array.isArray(items) && items.length > 0) {
      items.forEach(item => {
        craftableItems.push(new CraftableItem('CraftableItemCategory.Item', item, null, null));
      });
    }

    const equipments = this.equipmentService.searchForEquipmentsByNames(english, french);
    if (Array.isArray(equipments) && equipments.length > 0) {
      equipments.forEach(equipment => {
        craftableItems.push(new CraftableItem('CraftableItemCategory.Equipment', null, equipment, null));
      });
    }

    const materias = this.materiaService.searchForMateriasByNames(english, french);
    if (Array.isArray(materias) && materias.length > 0) {
      materias.forEach(materia => {
        craftableItems.push(new CraftableItem('CraftableItemCategory.Materia', null, null, materia));
      });
    }

    return craftableItems;
  }

  public searchForCraftableItemByGumiId(rawGumiId: string): CraftableItem {
    console.log('rawGumiId: ' + rawGumiId);
    if (!isNullOrUndefined(rawGumiId.toString())) {
      const craftableItemCategory = CraftableItemsService.extractCraftableItemCategory(rawGumiId);
      const gumiId = FfbeUtils.extractGumiId(rawGumiId);

      let craftableItem: CraftableItem;

      switch (craftableItemCategory) {
        case 'CraftableItemCategory.Item': {
          const item = this.itemService.searchForItemByGumiId(gumiId);
          craftableItem = new CraftableItem(craftableItemCategory, item, null, null);
          break;
        }

        case 'CraftableItemCategory.Equipment': {
          const equipment = this.equipmentService.searchForEquipmentByGumiId(gumiId);
          craftableItem = new CraftableItem(craftableItemCategory, null, equipment, null);
          break;
        }

        case 'CraftableItemCategory.Materia': {
          const materia = this.materiaService.searchForMateriaByGumiId(gumiId);
          craftableItem = new CraftableItem(craftableItemCategory, null, null, materia);
          break;
        }

        case 'CraftableItemCategory.Unknown': {
          craftableItem = new CraftableItem(craftableItemCategory, null, null, null);
          break;
        }

      }
      return craftableItem;
    }
    return null;
  }

  public static extractCraftableItemCategory(rawGumiId: string): CraftableItemCategory {

    let craftableItemCategory: CraftableItemCategory;
    const splitGumiId = rawGumiId.split(':');

    if (splitGumiId.length === 0) {
      craftableItemCategory = 'CraftableItemCategory.Unknown';
    } else {
      craftableItemCategory = CraftableItemCategoryFactory.fromString(splitGumiId[0]);
    }

    return craftableItemCategory;
  }

  public isLoaded(): boolean {
    return this.itemsFromDataMining != null;
  }
}

