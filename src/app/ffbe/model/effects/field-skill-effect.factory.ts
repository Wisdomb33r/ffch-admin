import {AbstractFieldSkillEffect} from './abstract-field-skill-effect.model';
import {TargetNumberEnum} from './target-number.enum';
import {TargetTypeEnum} from './target-type.enum';
import {FieldElementResistancesEffect} from './field/field-element-resistances-effect.model';
import {FieldElementDamageIncreaseEffect} from './field/field-element-damage-increase-effect.model';

export class FieldSkillEffectFactory {
  public static getSkillEffect(
    targetNumber: TargetNumberEnum,
    targetType: TargetTypeEnum,
    duration: number,
    effectRaw: any
  ): AbstractFieldSkillEffect {
    switch (effectRaw[2]) {
      case 2:
        return new FieldElementResistancesEffect(targetNumber, targetType, effectRaw[2], duration, effectRaw[3]);
      case 10:
      case 11:
        return new FieldElementDamageIncreaseEffect(targetNumber, targetType, effectRaw[2], duration, effectRaw[3]);
      default:
        return null;
    }
  }
}
