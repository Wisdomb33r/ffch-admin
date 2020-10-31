export type ItemCategory =
  'ItemCategory.Consumable' |
  'ItemCategory.Equipment' |
  'ItemCategory.Materia' |
  'ItemCategory.VisionCard' |
  'ItemCategory.Unknown';

export class ItemCategoryFactory {

  static fromString(itemCategoryId: string): ItemCategory {
    let itemCategory: ItemCategory = 'ItemCategory.Unknown';

    if (itemCategoryId === '20') {
      itemCategory = 'ItemCategory.Consumable';
    } else if (itemCategoryId === '21') {
      itemCategory = 'ItemCategory.Equipment';
    } else if (itemCategoryId === '22') {
      itemCategory = 'ItemCategory.Materia';
    }

    return itemCategory;
  }

  static toString(itemCategory: ItemCategory): string {
    let prefix = '-1';

    if (itemCategory === 'ItemCategory.Consumable') {
      prefix = '20';
    } else if (itemCategory === 'ItemCategory.Equipment') {
      prefix = '21';
    } else if (itemCategory === 'ItemCategory.Materia') {
      prefix = '22';
    }

    return prefix;
  }

  public static getName(itemCategory: ItemCategory): string {
    let name = 'UNKNOWN';

    if (itemCategory === 'ItemCategory.Consumable') {
      name = 'ITEM';
    } else if (itemCategory === 'ItemCategory.Equipment') {
      name = 'EQUIP';
    } else if (itemCategory === 'ItemCategory.Materia') {
      name = 'MATERIA';
    }

    return name;
  }

}
