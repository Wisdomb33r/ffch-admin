import {AbstractFieldSkillEffect} from '../abstract-field-skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {Skill} from '../../skill.model';
import {PassiveElementsResistanceEffect} from '../passives/passive-elements-resistance-effect.model';

export class FieldElementResistancesEffect extends AbstractFieldSkillEffect {

  private passiveEffect: PassiveElementsResistanceEffect;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected duration: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId, duration);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    } else {
      this.passiveEffect = new PassiveElementsResistanceEffect(this.convertedTarget[0], this.convertedTarget[1], effectId, parameters);
      this.parameterWarning = this.passiveEffect.hasParameterWarning();
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const elementText = this.passiveEffect.wordEffect(skill);
    const target = this.wordTarget();
    const turnsText = this.wordForTurns(this.duration);

    return `${elementText} ${target} ${turnsText}`;
  }

  protected get effectName(): string {
    return 'FieldElementResistancesEffect';
  }
}
