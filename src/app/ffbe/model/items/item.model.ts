import {Consumable} from './consumable/consumable.model';
import {Equipment} from './equipment/equipment.model';
import {Materia} from './materia/materia.model';
import {ItemCategory, ItemCategoryFactory} from './item-category.model';
import {VisionCard} from './vision-cards/vision-card.model';

export class Item {
  public constructor(
    public category: ItemCategory,
    public consumable: Consumable,
    public equipment: Equipment,
    public materia: Materia,
    public visionCard: VisionCard,
  ) {
  }

  public getGumiId(): number {

    switch (this.category) {
      case 'ItemCategory.Consumable':
        return this.consumable.gumi_id;
      case 'ItemCategory.Equipment':
        return this.equipment.gumi_id;
      case 'ItemCategory.Materia':
        return this.materia.gumi_id;
      case 'ItemCategory.VisionCard':
        return this.visionCard.gumi_id;
      default:
        return null;
    }
  }

  public getExtendedGumiId(): string {

    const gumiId = this.getGumiId();
    const prefix = ItemCategoryFactory.toString(this.category);

    return prefix + ':' + gumiId;

  }

}
