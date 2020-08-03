import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class AbilityDamagesPhysicalCriticalHitEffect extends SkillEffect {

  private power: number;
  private missChance: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 4 || parameters[0] !== 0 || parameters[1] !== 0) {
      this.parameterError = true;
    } else {
      this.power = Math.round(parameters[2]);
      this.missChance = parameters[3];
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const elements = skill.wordElementInflict();
    const attackType = skill.wordAttackAndDamageForPhysicalDamages();
    const target = this.wordTarget();
    skill.physique = true;
    const missChanceText = this.missChance ? ` (-${this.missChance}% précision)` : '';
    return `${attackType} critiques ${elements} de puissance ${this.power}% ${target}${missChanceText}`;
  }

  protected get effectName(): string {
    return 'AbilityDamagesPhysicalCriticalHitEffect';
  }

}
