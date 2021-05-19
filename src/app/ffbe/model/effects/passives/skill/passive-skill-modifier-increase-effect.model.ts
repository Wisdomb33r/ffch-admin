import {SkillModifierIncreaseEffect} from '../../../../mappers/effects/skill-modifier-increase-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {Skill} from '../../../skill.model';

export class PassiveSkillModifierIncreaseEffect extends SkillModifierIncreaseEffect {

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 4) {
      this.parameterError = true;
    } else {
      this.skillModifierIncrease = parameters[3];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    this.initializeSkillIncreasesValues(this.parameters);

    return super.wordEffectImpl(skill);
  }

  protected wordEffectForSkillModIncrease(displayedValue: string, percentText: string, skillsText: string) {
    return `+${displayedValue}${percentText} de puissance à ${skillsText}`;
  }

  protected get effectName(): string {
    return 'PassiveSkillModifierIncreaseEffect';
  }
}
