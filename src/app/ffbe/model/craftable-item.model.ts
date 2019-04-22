import {Consumable} from './consumable.model';
import {Equipment} from './equipment/equipment.model';
import {Materia} from './materia.model';
import {ItemCategory, ItemCategoryFactory} from './item-category.model';
import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';

export class CraftableItem {
  public constructor(
    public category: ItemCategory,
    public consumable: Consumable,
    public equipment: Equipment,
    public materia: Materia,
  ) {
  }

  public getGumiId(): number {

    switch (this.category) {
      case 'ItemCategory.Consumable': {
        return this.consumable.gumi_id;
        break;
      }
      case 'ItemCategory.Equipment': {
        return this.equipment.gumi_id;
        break;
      }
      case 'ItemCategory.Materia': {
        return this.materia.gumi_id;
        break;
      }
      case 'ItemCategory.Unknown': {
        return null;
        break;
      }
    }
  }

  public getExtendedGumiId(): string {

    const gumiId = this.getGumiId();
    const prefix = ItemCategoryFactory.toString(this.category);

    return prefix + ':' + gumiId;

  }

  public getNom(): string {

    let nom = null;

    switch (this.category) {
      case 'ItemCategory.Consumable': {
        if (this.consumable && this.consumable.strings && this.consumable.strings.names) {
          nom = this.consumable.strings.names[FFBE_FRENCH_TABLE_INDEX];
        }
        break;
      }
      case 'ItemCategory.Equipment': {
        if (this.equipment && this.equipment.strings && this.equipment.strings.name) {
          nom = this.equipment.strings.name[FFBE_FRENCH_TABLE_INDEX];
        }
        break;
      }
      case 'ItemCategory.Materia': {
        if (this.materia && this.materia.strings && this.materia.strings.names) {
          nom = this.materia.strings.names[FFBE_FRENCH_TABLE_INDEX];
        }
        break;
      }
    }

    return nom;
  }

  public getNomEn(): string {

    let nom = null;

    switch (this.category) {
      case 'ItemCategory.Consumable': {
        if (this.consumable && this.consumable.strings && this.consumable.strings.names) {
          nom = this.consumable.strings.names[FFBE_ENGLISH_TABLE_INDEX];
        }
        break;
      }
      case 'ItemCategory.Equipment': {
        if (this.equipment && this.equipment.strings && this.equipment.strings.name) {
          nom = this.equipment.strings.name[FFBE_ENGLISH_TABLE_INDEX];
        }
        break;
      }
      case 'ItemCategory.Materia': {
        if (this.materia && this.materia.strings && this.materia.strings.names) {
          nom = this.materia.strings.names[FFBE_ENGLISH_TABLE_INDEX];
        }
        break;
      }
    }

    return nom;
  }

  public getPriceSell(): number {

    switch (this.category) {
      case 'ItemCategory.Consumable': {
        return this.consumable.price_sell;
        break;
      }
      case 'ItemCategory.Equipment': {
        return this.equipment.price_sell;
        break;
      }
      case 'ItemCategory.Materia': {
        return this.materia.price_sell;
        break;
      }
      case 'ItemCategory.Unknown': {
        return null;
        break;
      }
    }
  }

}
