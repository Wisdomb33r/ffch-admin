import {Skill} from '../../../skill.model';
import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';

export class AbilityDamagePhysicalCriticalHitEffect extends SkillEffect {

  private basePower: number;
  private missChance: number;
  private power: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 4 || parameters[0] !== 0 || parameters[1] !== 0) {
      this.parameterError = true;
    } else {
      this.basePower = Math.round(parameters[2]);
      this.missChance = parameters[3];
      this.power = Math.round(this.basePower * 1.5 * (100 - this.missChance) / 100);
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const elements = skill.wordElementInflict();
    const attackType = skill.wordAttackAndDamageForPhysicalDamages();
    const target = this.wordTarget();
    skill.physique = true;
    const missChanceText = this.missChance ? ` (-${this.missChance}% précision)` : '';
    return `${attackType} critiques ${elements} de puissance ${this.basePower}% ${target}${missChanceText}`;
  }

  protected get effectName(): string {
    return 'AbilityDamagePhysicalCriticalHitEffect';
  }

  public getDamagesPower(): number {
    return this.power;
  }
}
