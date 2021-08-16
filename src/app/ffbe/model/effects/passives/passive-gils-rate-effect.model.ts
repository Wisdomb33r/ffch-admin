import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class PassiveGilsRateEffect extends SkillEffect {

  private gilsRate: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    } else {
      this.gilsRate = parameters[0];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    return `+${this.gilsRate > 0 ? this.gilsRate : 'UNKNOWN'}% de gils reçus en combat`;
  }

  protected get effectName(): string {
    return 'PassiveGilsRateEffect';
  }
}
