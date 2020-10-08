import {EquipmentStrings} from './equipment-strings.model';
import {Skill} from '../../skill.model';
import {EquipmentStats} from './equipment-stats.model';

export class Equipment {
  gumi_id: number;
  name: string;
  rarity: number;
  type_id: number;
  is_twohanded: boolean;
  dmg_variance: Array<number>;
  requirements: Array<any>;
  skills: Array<number>;
  dmSkills: Array<Skill>;
  effects: Array<string>;
  stats: EquipmentStats;
  price_sell: number;
  strings: EquipmentStrings;
}
