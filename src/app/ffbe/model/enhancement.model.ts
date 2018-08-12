import {EnhancementStrings} from './enhancement-strings.model';

export class Enhancement {
  public gumi_id: number;
  public name: string;
  public skill_id_old: number;
  public skill_id_new: number;
  public cost: any;
  public units: Array<number>;
  public strings: EnhancementStrings;
}
