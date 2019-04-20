import {CraftableItem} from './craftable-item.model';
import {Item} from './item.model';

export class ItemRecipe {
  gumi_id: number;
  name: string;
  item: string;
  time: number;
  mats: any;
  count: number;
  source: string;
  dmItem: Item;
  craftableItem: CraftableItem;
}
