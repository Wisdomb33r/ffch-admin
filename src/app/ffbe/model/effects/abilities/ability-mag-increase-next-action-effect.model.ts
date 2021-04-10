import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class AbilityMagIncreaseNextActionEffect extends SkillEffect {

  private magIncrease: number;
  private magIncreaseMax: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 3
      || targetNumber !== 0 || targetType !== 3) {
      this.parameterError = true;
    } else {
      if (parameters[2] !== 0 && parameters[2] !== 50) {
        this.parameterWarning = true;
      }
      this.magIncrease = parameters[0];
      this.magIncreaseMax = parameters[1];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const increaseMaxText = this.magIncreaseMax > this.magIncrease ? ` (cumulable, +${this.magIncreaseMax}% max)` : '';

    return `+${this.magIncrease}% MAG pour la prochaine action du lanceur${increaseMaxText}`;
  }

  protected get effectName(): string {
    return 'AbilityMagIncreaseNextActionEffect';
  }
}
