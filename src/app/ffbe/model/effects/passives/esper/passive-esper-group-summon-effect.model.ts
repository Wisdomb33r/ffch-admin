import {EffectParser} from '../../../../mappers/effects/effect-parser';
import {Skill} from '../../../skill.model';
import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';

export class PassiveEsperGroupSummonEffect extends SkillEffect {

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);

  }

  protected wordEffectImpl(skill: Skill): string {
    return `Permet l'invocation des chimères associées aux alliés`;
  }

  protected get effectName(): string {
    return 'PassiveEsperGroupSummonEffect';
  }
}
