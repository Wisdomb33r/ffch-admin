import {CraftableItem} from './craftable-item.model';

export class ItemRecipe {
  gumi_id: number;
  name: string;
  item: string;
  time: number;
  mats: any;
  count: number;
  source: string;
  craftableItem: CraftableItem;
}
