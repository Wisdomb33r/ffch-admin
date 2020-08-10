import {Skill} from '../../skill.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {SkillEffect} from '../skill-effect.model';
import {TargetPrepositionEnum} from '../target-preposition.enum';

export class AbilityElementDamagesIncreaseEffect extends SkillEffect {

  private increases: Array<number>;
  private turns: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 4 || parameters[1] !== 1 || parameters[3] !== 0) {
      this.parameterError = true;
    } else {
      this.increases = parameters[0];
      this.turns = parameters[2];
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const target = `infligés par ${this.wordTarget(TargetPrepositionEnum.None)}`;
    const turnsText = `pour ${this.turns} tour${this.turns > 1 ? 's' : ''}`;
    const damageIncreaseText = this.wordEffectJoiningIdenticalValues(SkillEffect.getElementNameValueTableFromNumberArray(this.increases));
    return `${damageIncreaseText} ${target} ${turnsText} (bonus non dissipable)`;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    const damageType = this.effectId === 153 ? 'physiques' : 'magiques';
    return `+${currentValue}% aux dégâts ${damageType} de ${accumulatedStats.join(', ')}`;
  }

  protected get effectName(): string {
    return 'AbilityElementDamagesIncreaseEffect';
  }
}
