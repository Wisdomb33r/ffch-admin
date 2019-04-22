import {Consumable} from './consumable.model';
import {Equipment} from './equipment/equipment.model';
import {Materia} from './materia.model';
import {ItemCategory, ItemCategoryFactory} from './item-category.model';

export class Item {
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

}
