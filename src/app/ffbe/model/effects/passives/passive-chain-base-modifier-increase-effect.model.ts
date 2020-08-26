import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {Skill} from '../../skill.model';

export class PassiveChainBaseModifierIncreaseEffect extends SkillEffect {

  protected chainIncrease: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    } else {
      this.chainIncrease = parameters[0];
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const chainTypeText = this.effectId === 84 ? 'physiques' : 'magiques';
    return `+${this.chainIncrease}% au multiplicateur de départ des chaînes de combos ${chainTypeText}`;
  }

  protected get effectName(): string {
    return 'PassiveChainBaseModifierIncreaseEffect';
  }

}
