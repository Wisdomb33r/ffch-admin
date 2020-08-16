import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';

export abstract class AbilityDamageStatScalingEffect extends SkillEffect {

  protected power: number;

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

  public getDamagesPower(): number {
    return this.power;
  }
}
