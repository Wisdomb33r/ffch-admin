import {Skill} from '../../skill.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {SkillEffect} from '../skill-effect.model';

export class AbilityDamagesFixedEffect extends SkillEffect {

  private fixedDamages: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    } else {
      this.fixedDamages = Math.round(parameters[0]);
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const elements = skill.wordElementInflict();
    const attackType = skill.wordAttackAndDamageForFixedDamages();
    const target = this.wordTarget();
    skill.fixe = true;
    return `${attackType} ${elements} de ${this.fixedDamages} PV ${target}`;
  }

  protected get effectName(): string {
    return 'AbilityDamagesFixedEffect';
  }

}
