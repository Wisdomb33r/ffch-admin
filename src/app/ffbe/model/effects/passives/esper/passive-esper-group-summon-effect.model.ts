import {EffectParser} from '../../../../mappers/effects/effect-parser';
import {Skill} from '../../../skill.model';

export class PassiveEsperGroupSummonParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    return 'Permet l\'invocation des chimères associées aux alliés';
  }
}
