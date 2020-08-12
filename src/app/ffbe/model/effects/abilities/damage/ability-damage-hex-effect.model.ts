import {Skill} from '../../../skill.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {SkillEffect} from '../../skill-effect.model';

export class AbilityDamageHexEffect extends SkillEffect {

  private fixedDamages: number;
  private turns: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 5 || !Array.isArray(parameters[4])) {
      this.parameterError = true;
    } else {
      this.turns = parameters[1];
      this.fixedDamages = Math.round(parameters[3]);
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const elements = skill.wordElementInflict();
    const attackType = skill.wordAttackAndDamageForFixedDamages();
    const target = this.wordTarget();
    skill.fixe = true;
    const turnsText = `pour ${this.turns} tour${this.turns > 1 ? 's' : ''}`;
    return `${attackType} ${elements} de ${this.fixedDamages} PV par status négatif ${target} ${turnsText}`;
  }

  protected get effectName(): string {
    return 'AbilityDamageHexEffect';
  }

}
