import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {Skill} from '../../skill.model';

export class PassiveChainModifierLimitIncreaseEffect extends SkillEffect {

  protected chainIncrease: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 4 || parameters[0] !== 0 || parameters[2] !== 0 || parameters[3] !== 1) {
      this.parameterError = true;
    } else {
      this.chainIncrease = parameters[1];
    }
  }

  protected wordEffectImpl(skill: Skill) {
    return `+${this.chainIncrease}% au coefficient multiplicateur maximal de la chaîne de combo`;
  }

  protected get effectName(): string {
    return 'PassiveChainModifierLimitIncreaseEffect';
  }

}
