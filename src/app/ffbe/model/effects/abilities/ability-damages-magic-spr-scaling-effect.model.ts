import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class AbilityDamagesMagicSprScalingEffect extends SkillEffect {

  private power: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 3 || parameters[0] !== 100 || parameters[1] < 9999) {
      this.parameterError = true;
    } else {
      this.power = Math.round(parameters[2]);
    }
  }


  protected wordEffectImpl(skill: Skill) {
    const elements = skill.wordElementInflict();
    const attackType = skill.wordAttackAndDamageForMagicalDamages();
    skill.magique = true;
    const target = this.wordTarget();
    return `${attackType} ${elements} calculés sur la PSY de puissance ${this.power}% ${target}`;
  }

  protected get effectName(): string {
    return 'AbilityDamagesMagicSprScalingEffect';
  }
}
