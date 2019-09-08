import {EffectParser} from './effect-parser';
import {Skill} from '../../model/skill.model';

export class UnknownEffectParser extends EffectParser {
  parse(effectParameters: any, skill: Skill): string {
    return 'Effet UNKNOWN';
  }
}
