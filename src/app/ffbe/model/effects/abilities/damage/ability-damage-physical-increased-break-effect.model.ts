import {SkillEffect} from '../../skill-effect.model';
import {Skill} from '../../../skill.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';

export class AbilityDamagePhysicalIncreasedBreakEffect extends SkillEffect {

  protected power: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length !== 6 || parameters[4] !== 0 || parameters[5] !== 1) {
      this.parameterError = true;
    } else {
      this.power = Math.round(parameters[3]);
    }
  }

  protected get effectName(): string {
    return 'AbilityDamagePhysicalIncreasedBreakEffect';
  }

  protected wordEffectImpl(skill: Skill): string {
    return '';
  }

}
