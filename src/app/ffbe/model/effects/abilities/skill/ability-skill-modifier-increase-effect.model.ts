import {SkillModifierIncreaseEffect} from '../../../../mappers/effects/skill-modifier-increase.parser';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';

export class AbilitySkillModifierIncreaseEffect extends SkillModifierIncreaseEffect {

  private duration: string;
  private target: string;
  private stackId: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 5) {
      this.parameterError = true;
    } else {
      this.stackId = parameters.length >= 7 ? parameters[6] : 0;
      const numTurns = parameters[4] >= 0 ? parameters[4] : 9999;
      const pluralForm = numTurns > 1 ? 's' : '';
      this.duration = `pour ${numTurns} tour${pluralForm}`;
      this.target = this.wordTarget();

      this.initializeSkillIncreasesValues(parameters);
    }
  }

  protected wordEffectForSkillModIncrease(displayedValue: string, percentText: string, skillsText: string) {
    const preposition = this.isGeneralPhysicalModIncrease ? 'aux' : 'à';
    return `+${displayedValue}${percentText} de puissance ${preposition} ${skillsText} ${this.target} ${this.duration} (ID #${this.stackId})`;
  }

  protected get effectName(): string {
    return 'AbilitySkillModifierIncreaseEffect';
  }
}
