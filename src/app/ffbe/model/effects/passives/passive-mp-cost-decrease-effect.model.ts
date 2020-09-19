import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class PassiveMpCostDecreaseEffect extends SkillEffect {

  private costDecreasePercent: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 3
      || parameters[1] !== 1 || (parameters[2] !== 0 && parameters[2] !== 4)) {
      this.parameterError = true;
    } else {
      this.costDecreasePercent = parameters[0];
    }
  }

  protected get effectName(): string {
    return 'PassiveMpCostDecreaseEffect';
  }

  protected wordEffectImpl(skill: Skill): string {
    return `-${this.costDecreasePercent}% de PM consommés`;
  }
}
