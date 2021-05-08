import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class PassiveJumpDamageIncreaseEffect extends SkillEffect {

  private increase: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    } else {
      this.increase = parameters[0];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    return `+${this.increase}% aux dégâts des sauts`;
  }

  protected get effectName(): string {
    return 'PassiveJumpDamageIncreaseEffect';
  }
}
