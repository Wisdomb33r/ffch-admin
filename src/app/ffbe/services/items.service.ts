import {Injectable} from '@angular/core';
import {Item} from '../model/items/item.model';
import {ConsumablesService} from './consumables.service';
import {EquipmentsService} from './equipments.service';
import {MateriasService} from './materias.service';
import {FfbeUtils} from '../utils/ffbe-utils';
import {ItemCategory, ItemCategoryFactory} from '../model/items/item-category.model';
import {VisionCardsService} from './vision-cards.service';

@Injectable()
export class ItemsService {

  constructor(private consumablesService: ConsumablesService,
              private equipmentService: EquipmentsService,
              private materiaService: MateriasService,
              private visionCardsService: VisionCardsService) {
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
        items.push(new Item('ItemCategory.Consumable', consumable, null, null, null));
      });
    }

    const equipments = this.equipmentService.searchForEquipmentsByNames(english, french);
    if (Array.isArray(equipments) && equipments.length > 0) {
      equipments.forEach(equipment => {
        items.push(new Item('ItemCategory.Equipment', null, equipment, null, null));
      });
    }

    const materias = this.materiaService.searchForMateriasByNames(english, french);
    if (Array.isArray(materias) && materias.length > 0) {
      materias.forEach(materia => {
        items.push(new Item('ItemCategory.Materia', null, null, materia, null));
      });
    }

    const visionCards = this.visionCardsService.searchForVisionCardsByNames(english, french);
    if (Array.isArray(visionCards) && visionCards.length > 0) {
      visionCards.forEach(visionCard => {
        items.push(new Item('ItemCategory.VisionCard', null, null, null, visionCard));
      });
    }

    return items;
  }

  public searchForItemByExtendedGumiId(extendedGumiId: string): Item {
    if (!FfbeUtils.isNullOrUndefined(extendedGumiId)) {
      const itemCategory = ItemsService.extractItemCategory(extendedGumiId);
      const gumiId = FfbeUtils.extractGumiId(extendedGumiId);

      switch (itemCategory) {
        case 'ItemCategory.Consumable':
          const consumable = this.consumablesService.searchForConsumableByGumiId(gumiId);
          return new Item(itemCategory, consumable, null, null, null);
        case 'ItemCategory.Equipment':
          const equipment = this.equipmentService.searchForEquipmentByGumiId(gumiId);
          return new Item(itemCategory, null, equipment, null, null);
        case 'ItemCategory.Materia':
          const materia = this.materiaService.searchForMateriaByGumiId(gumiId);
          return new Item(itemCategory, null, null, materia, null);
        default:
          return new Item(itemCategory, null, null, null, null);
      }
    }
    return null;
  }

  public searchForItemsByGumiId(gumiId: string): Array<Item> {
    if (!FfbeUtils.isNullOrUndefined(gumiId)) {

      const items: Array<Item> = [];

      const consumable = this.consumablesService.searchForConsumableByGumiId(+gumiId);
      if (!FfbeUtils.isNullOrUndefined(consumable)) {
        items.push(new Item('ItemCategory.Consumable', consumable, null, null, null));
      }

      const equipment = this.equipmentService.searchForEquipmentByGumiId(+gumiId);
      if (!FfbeUtils.isNullOrUndefined(equipment)) {
        items.push(new Item('ItemCategory.Equipment', null, equipment, null, null));
      }

      const materia = this.materiaService.searchForMateriaByGumiId(+gumiId);
      if (!FfbeUtils.isNullOrUndefined(materia)) {
        items.push(new Item('ItemCategory.Materia', null, null, materia, null));
      }

      const visionCard = this.visionCardsService.searchForVisionCardByGumiId(+gumiId);
      if (!FfbeUtils.isNullOrUndefined(visionCard)) {
        items.push(new Item('ItemCategory.VisionCard', null, null, null, visionCard));
      }
      return items;
    }
    return null;
  }

  public isLoaded(): boolean {
    return this.consumablesService.isLoaded() && this.equipmentService.isLoaded() && this.consumablesService.isLoaded();
  }
}

