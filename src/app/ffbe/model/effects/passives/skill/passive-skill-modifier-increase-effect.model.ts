import {Skill} from '../../../skill.model';
import {HTML_LINE_RETURN} from '../../../../mappers/effects/skill-effects.mapper';
import {SkillModifierIncreaseEffect, SkillModifierIncreaseParser} from '../../../../mappers/effects/skill-modifier-increase.parser';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';

export class PassiveSkillModifierIncreaseEffect extends SkillModifierIncreaseEffect {

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 4 || parameters[1] !== 0 || parameters[2] !== 0) {
      this.parameterError = true;
    } else {
      this.initializeSkillIncreasesValues([targetNumber, targetType, effectId, parameters]);
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

  protected wordEffectForSkillModIncrase(displayedValue: string, percentText: string, skillsText: string) {
    return `+${displayedValue}${percentText} de puissance à ${skillsText}`;
  }

  protected get effectName(): string {
    return 'PassiveSkillModifierIncreaseEffect';
  }
}

export class PassiveSkillModifierIncreaseParser extends SkillModifierIncreaseParser {

  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 4 || effect[3][1] !== 0 || effect[3][2] !== 0) {
      return 'Effet PassiveSkillModifierIncreaseParser inconnu: Mauvaise liste de paramètres';
    }

    this.initializeSkillIncreasesValues(effect);

    const modIncreaseText = this.wordEffectJoiningIdenticalValues(
      this.modifiedSkillsIncreases.filter(increase => !increase.isHeal), HTML_LINE_RETURN, true);
    const healingModIncreaseText = this.wordEffectJoiningIdenticalValues(
      this.modifiedSkillsIncreases.filter(increase => increase.isHeal), HTML_LINE_RETURN, true);
    const modIncreasesJoiningText = modIncreaseText.length && healingModIncreaseText.length ? HTML_LINE_RETURN : '';
    return `${modIncreaseText}${modIncreasesJoiningText}${healingModIncreaseText}`;
  }

  protected wordEffectForSkillModIncrase(displayedValue: string, percentText: string, skillsText: string) {
    return `+${displayedValue}${percentText} de puissance à ${skillsText}`;
  }
}
