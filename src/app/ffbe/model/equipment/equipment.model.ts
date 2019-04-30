import {EquipmentStrings} from './equipment-strings.model';

export class Equipment {
  gumi_id: number;
  name: string;
  effects: Array<string>;
  price_sell: number;
  strings: EquipmentStrings;
}
