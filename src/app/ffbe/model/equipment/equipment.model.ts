import {EquipmentStrings} from './equipment-strings.model';
import {Skill} from '../skill.model';

export class Equipment {
  gumi_id: number;
  name: string;
  type_id: number;
  skills: Array<number>;
  dmSkills: Array<Skill>;
  effects: Array<string>;
  price_sell: number;
  strings: EquipmentStrings;
}
