import {SkillStrings} from './skill-strings.model';

export class Skill {
  public gumi_id: number;
  public name: string;
  public type: string;
  public active: boolean;
  public magic_type: string;
  public mp_cost: number;
  public attack_count: Array<number>;
  public attack_damage: Array<Array<number>>;
  public attack_frames: Array<Array<number>>;
  public attack_type: string;
  public effects: Array<string>;
  public strings: SkillStrings;
}
