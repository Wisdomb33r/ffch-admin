import {AbstractFieldSkillEffect} from '../abstract-field-skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {Skill} from '../../skill.model';
import {PassiveElementsResistanceEffect} from '../passives/passive-elements-resistance-effect.model';
import {AbilityElementDamageIncreaseEffect} from '../abilities/ability-element-damage-increase-effect.model';

export class FieldElementDamageIncreaseEffect extends AbstractFieldSkillEffect {

  private abilityEffect: AbilityElementDamageIncreaseEffect;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected duration: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId, duration);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    } else {
      if (this.parameters.some(param => Array.isArray(param) && param.length > 1 && param[0] !== param[1])) {
        this.parameterWarning = true;
      }
      const extractedElementalParameters = parameters.map(param => Array.isArray(param) ? param[0] : param);
      const damageType = this.effectId === 10 ? 0 : 1;
      const craftedParameters = [damageType, extractedElementalParameters, 1, duration, 1];

      this.abilityEffect = new AbilityElementDamageIncreaseEffect(this.convertedTarget[0], this.convertedTarget[1], effectId, craftedParameters);
      this.parameterWarning = this.parameterWarning || this.abilityEffect.hasParameterWarning();
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    return this.abilityEffect.wordEffect(skill);
  }

  protected get effectName(): string {
    return 'FieldElementResistancesEffect';
  }
}
