import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {Skill} from '../../../skill.model';

export class AbilityDamageMoraleScalingEffect extends SkillEffect {

  private basePower: number;
  private damageType: number;
  private damageIncrement: number;
  private moraleIncrement: number;
  private power: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 7 || [1, 2, 3].indexOf(parameters[1]) === -1) {
      this.parameterError = true;
    } else {
      if (parameters[5] !== 100 || parameters[6] !== 1) {
        this.parameterWarning = true;
      }
      if (parameters[2] !== 0 && parameters[2] !== 3) {
        this.parameterWarning = true;
      }

      this.basePower = parameters[0];
      this.damageType = parameters[1];
      this.damageIncrement = parameters[3];
      this.moraleIncrement = parameters[4];
      this.power = Math.round(this.basePower + this.damageIncrement * 100 / this.moraleIncrement);
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const elementsText = skill.wordElementInflict();
    let attackTypeText = '';
    if (this.damageType === 1) {
      attackTypeText = skill.wordAttackAndDamageForPhysicalDamages();
      skill.physique = true;
    }
    if (this.damageType === 2) {
      attackTypeText = skill.wordAttackAndDamageForMagicalDamages();
      skill.magique = true;
    }
    if (this.damageType === 3) {
      attackTypeText = skill.wordAttackAndDamageForHybridDamages();
      skill.hybride = true;
    }
    const target = this.wordTarget();
    const incrementsText = `(+${this.damageIncrement}% par tranche de 5% de moral au-dessus de 100%, max ${this.power}%)`;
    return `${attackTypeText} ${elementsText} de puissance ${this.basePower}% ${incrementsText} ${target}`;
  }

  protected get effectName(): string {
    return 'AbilityDamageMoraleScalingEffect';
  }

  public getDamagesPower(): number {
    return this.power;
  }
}
