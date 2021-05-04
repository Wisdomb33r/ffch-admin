import {Skill} from '../../../skill.model';
import {HTML_LINE_RETURN} from '../../../../mappers/effects/skill-effects.mapper';
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
    if (!Array.isArray(parameters) || parameters.length < 5 || parameters[1] !== 0 || parameters[2] !== 0) {
      this.parameterError = true;
    } else {
      this.stackId = parameters.length >= 7 ? parameters[6] : 0;
      const numTurns =  parameters[4] >= 0 ? parameters[4] : 9999;
      const pluralForm = numTurns > 1 ? 's' : '';
      this.duration = `pour ${numTurns} tour${pluralForm}`;
      this.target = this.wordTarget();

      this.initializeSkillIncreasesValues(parameters);
    }
  }

  protected wordEffectImpl(skill: Skill): string {

    const modIncreaseText = this.wordEffectJoiningIdenticalValues(
      this.modifiedSkillsIncreases.filter(increase => !increase.isHeal), HTML_LINE_RETURN, true);
    const healingModIncreaseText = this.wordEffectJoiningIdenticalValues(
      this.modifiedSkillsIncreases.filter(increase => increase.isHeal), HTML_LINE_RETURN, true);
    const modIncreasesJoiningText = modIncreaseText.length && healingModIncreaseText.length ? HTML_LINE_RETURN : '';
    return `${modIncreaseText}${modIncreasesJoiningText}${healingModIncreaseText}`;
  }

  protected wordEffectForSkillModIncrease(displayedValue: string, percentText: string, skillsText: string) {
    return `+${displayedValue}${percentText} de puissance à ${skillsText} ${this.target} ${this.duration} (ID #${this.stackId})`;
  }

  protected get effectName(): string {
    return 'AbilitySkillModifierIncreaseEffect';
  }
}
