import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class PassiveExperienceRateEffect extends SkillEffect {

  private xpRate: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    } else {
      this.xpRate = parameters[0];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    return `+${this.xpRate > 0 ? this.xpRate : 'UNKNOWN'}% d'expérience reçue en combat`;
  }

  protected get effectName(): string {
    return 'PassiveExperienceRateEffect';
  }

}
