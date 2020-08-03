import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class AbilityDamagesMagicEffect extends SkillEffect {

  private power: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 6 || parameters[0] !== 0 || parameters[1] !== 0
      || parameters[2] !== 0 || parameters[3] !== 0 || parameters[4] !== 0) {
      this.parameterError = true;
    } else {
      this.power = Math.round(parameters[5]);
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const elements = skill.wordElementInflict();
    const attackType = skill.wordAttackAndDamageForMagicalDamages();
    skill.magique = true;
    const target = this.wordTarget();
    return `${attackType} ${elements} de puissance ${this.power}% ${target}`;
  }

  protected get effectName(): string {
    return 'AbilityDamagesMagicEffect';
  }

}
