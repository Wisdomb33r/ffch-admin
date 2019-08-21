import {CharacterSkill} from './character-skill.model';

export class Character {
  public gumi_id: number;
  public rarity_min: number;
  public rarity_max: number;
  public name: string;
  public names: Array<string>;
  public game_id: number;
  public job: string;
  public TMR: Array<string | number>;
  public sTMR: Array<string | number>;
  public equip: Array<number>;
  public entries: any;
  public skills: Array<CharacterSkill>;
}
