import {ConsumableStrings} from './consumable-strings.model';

export class Consumable {
  gumi_id: number;
  name: string;
  price_sell: number;
  effects: Array<string>;
  strings: ConsumableStrings;
}
