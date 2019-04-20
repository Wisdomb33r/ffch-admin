import {Item} from './item.model';
import {Equipment} from './equipment.model';
import {Materia} from './materia.model';
import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';

export type CraftableItemCategory =
  'CraftableItemCategory.Item' |
  'CraftableItemCategory.Equipment' |
  'CraftableItemCategory.Materia' |
  'CraftableItemCategory.Unknown';

export class CraftableItemCategoryFactory {

  static fromString(craftableItemCategoryId: string): CraftableItemCategory {
    let craftableItemCategory: CraftableItemCategory = 'CraftableItemCategory.Unknown';

    if (craftableItemCategoryId === '20') {
      craftableItemCategory = 'CraftableItemCategory.Item';
    } else if (craftableItemCategoryId === '21') {
      craftableItemCategory = 'CraftableItemCategory.Equipment';
    } else if (craftableItemCategoryId === '22') {
      craftableItemCategory = 'CraftableItemCategory.Materia';
    }

    return craftableItemCategory;
  }

  static toString(craftableItemCategory: CraftableItemCategory): string {
    let prefix = '-1';

    if (craftableItemCategory === 'CraftableItemCategory.Item') {
      prefix = '20';
    } else if (craftableItemCategory === 'CraftableItemCategory.Equipment') {
      prefix = '21';
    } else if (craftableItemCategory === 'CraftableItemCategory.Materia') {
      prefix = '22';
    }

    return prefix;
  }

}

export class CraftableItem {
  public constructor(
    public category: CraftableItemCategory,
    public item: Item,
    public equipment: Equipment,
    public materia: Materia,
  ) {
  }

  public getGumiId(): number {

    switch (this.category) {
      case 'CraftableItemCategory.Item': {
        return this.item.gumi_id;
      }
      case 'CraftableItemCategory.Equipment': {
        return this.equipment.gumi_id;
      }
      case 'CraftableItemCategory.Materia': {
        return this.materia.gumi_id;
      }
      case 'CraftableItemCategory.Unknown': {
        return null;
      }
    }
  }

  public getExtendedGumiId(): string {

    const gumiId = this.getGumiId();
    const prefix = CraftableItemCategoryFactory.toString(this.category);

    return prefix + ':' + gumiId;

  }

  public getNom(): string {

    let nom = null;

    switch (this.category) {
      case 'CraftableItemCategory.Item': {
        if (this.item && this.item.strings && this.item.strings.names) {
          nom = this.item.strings.names[FFBE_FRENCH_TABLE_INDEX];
        }
      }
      case 'CraftableItemCategory.Equipment': {
        if (this.equipment && this.equipment.strings && this.equipment.strings.name) {
          nom = this.equipment.strings.name[FFBE_FRENCH_TABLE_INDEX];
        }
      }
      case 'CraftableItemCategory.Materia': {
        if (this.materia && this.materia.strings && this.materia.strings.names) {
          nom = this.materia.strings.names[FFBE_FRENCH_TABLE_INDEX];
        }
      }
    }

    return nom;
  }

  public getNomEn(): string {

    let nom = null;

    switch (this.category) {
      case 'CraftableItemCategory.Item': {
        if (this.item && this.item.strings && this.item.strings.names) {
          nom = this.item.strings.names[FFBE_ENGLISH_TABLE_INDEX];
        }
      }
      case 'CraftableItemCategory.Equipment': {
        if (this.equipment && this.equipment.strings && this.equipment.strings.name) {
          nom = this.equipment.strings.name[FFBE_ENGLISH_TABLE_INDEX];
        }
      }
      case 'CraftableItemCategory.Materia': {
        if (this.materia && this.materia.strings && this.materia.strings.names) {
          nom = this.materia.strings.names[FFBE_ENGLISH_TABLE_INDEX];
        }
      }
    }

    return nom;
  }

  public getPriceSell(): number {

    switch (this.category) {
      case 'CraftableItemCategory.Item': {
        return this.item.price_sell;
      }
      case 'CraftableItemCategory.Equipment': {
        return this.equipment.price_sell;
      }
      case 'CraftableItemCategory.Materia': {
        return this.materia.price_sell;
      }
      case 'CraftableItemCategory.Unknown': {
        return null;
      }
    }
  }

}
