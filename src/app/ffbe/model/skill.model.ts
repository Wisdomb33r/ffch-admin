import {SkillStrings} from './skill-strings.model';
import {SkillCost} from './skill-cost.model';

export class Skill {
  public gumi_id: number;
  public name: string;
  public type: string;
  public rarity: number;
  public active: boolean;
  public magic_type: string;
  public cost: SkillCost;
  public attack_count: Array<number>;
  public attack_damage: Array<Array<number>>;
  public attack_frames: Array<Array<number>>;
  public attack_type: string;
  public effects: Array<string>;
  public icon: string;
  public strings: SkillStrings;
}
