import {Skill} from '../../model/skill.model';

export abstract class EffectParser {
  public abstract parse(effect: Array<any>, skill: Skill): string;
}
