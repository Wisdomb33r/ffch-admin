import {SkillModifierIncreaseEffect} from '../../../../mappers/effects/skill-modifier-increase.parser';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';

export class PassiveSkillModifierIncreaseEffect extends SkillModifierIncreaseEffect {

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 4) {
      this.parameterError = true;
    } else {
      this.initializeSkillIncreasesValues(parameters);
    }
  }

  protected wordEffectForSkillModIncrease(displayedValue: string, percentText: string, skillsText: string) {
    return `+${displayedValue}${percentText} de puissance à ${skillsText}`;
  }

  protected get effectName(): string {
    return 'PassiveSkillModifierIncreaseEffect';
  }
}
