import {Skill} from '../skill.model';

export class CharacterSkill {
  public rarity: number | string;
  public level: number;
  public id: number;
  public ex_level: number;
  public skill: Skill;
}
