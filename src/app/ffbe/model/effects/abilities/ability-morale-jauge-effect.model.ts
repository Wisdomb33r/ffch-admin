import {SkillEffect} from '../skill-effect.model';
import {Skill} from '../../skill.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class AbilityMoraleJaugeEffect extends SkillEffect {

  private moraleIncrease: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    } else {
      if (parameters.length !== 7 || parameters.splice(1).every(value => value === 0)) {
        this.parameterWarning = true;
      }
      this.moraleIncrease = parameters[0];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    return `+${this.moraleIncrease} à la jauge de moral`;
  }

  protected get effectName(): string {
    return 'AbilityMoraleJaugeEffect';
  }
}
