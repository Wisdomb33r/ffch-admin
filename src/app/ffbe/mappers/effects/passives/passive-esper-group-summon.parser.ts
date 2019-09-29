import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveEsperGroupSummonParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    return 'Permet l\'invocation des chimères associées aux alliés';
  }
}
