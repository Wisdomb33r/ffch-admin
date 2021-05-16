import {EffectParser} from './effect-parser';
import {Skill} from '../../model/skill.model';
import {SkillsService} from '../../services/skills.service';
import {SkillEffect} from '../../model/effects/skill-effect.model';
import {HTML_LINE_RETURN} from './skill-effects.mapper';

export abstract class SkillModifierIncreaseEffect extends SkillEffect {
  protected modifiedSkillsIncreases: Array<{ name: string, value: number, isHeal: boolean }> = [];

  protected initializeSkillIncreasesValues(parameters: Array<any>) {
    if (parameters[1] !== 0 || parameters[2] !== 0) {
      this.parameterWarning = true;
    }

    const skillModifierIncrease = parameters[3];
    const modifiedSkills = !Array.isArray(parameters[0]) ? [parameters[0]] : parameters[0];

    modifiedSkills.forEach(skillId => {
      const activatedSkill: Skill = SkillsService.getInstance().searchForSkillByGumiId(skillId);
      const modIncrease = !activatedSkill ? 0 : activatedSkill.calculateTotalModIncrease(skillModifierIncrease);
      const healingModIncrease = !activatedSkill ? 0 : activatedSkill.calculateHealingTotalModIncrease(skillModifierIncrease);
      this.modifiedSkillsIncreases.push({
        name: EffectParser.getSkillNameWithGumiIdentifierLink(activatedSkill),
        value: modIncrease > 0 ? modIncrease : healingModIncrease,
        isHeal: modIncrease === 0 && healingModIncrease > 0,
      });
    });
  }

  protected wordEffectImpl(skill: Skill): string {
    const modIncreaseText = this.wordEffectJoiningIdenticalValues(
      this.modifiedSkillsIncreases.filter(increase => !increase.isHeal), HTML_LINE_RETURN, true);
    const healingModIncreaseText = this.wordEffectJoiningIdenticalValues(
      this.modifiedSkillsIncreases.filter(increase => increase.isHeal), HTML_LINE_RETURN, true);
    const modIncreasesJoiningText = modIncreaseText.length && healingModIncreaseText.length ? HTML_LINE_RETURN : '';
    return `${modIncreaseText}${modIncreasesJoiningText}${healingModIncreaseText}`;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    const isHeal: boolean = this.modifiedSkillsIncreases.find(increase => increase.name === accumulatedStats[0]).isHeal;
    let valueText: string;
    let percentText = '';
    if (isHeal) {
      valueText = `${currentValue / 200}x la PSY + ${currentValue / 1000}x la MAG`;
    } else {
      valueText = `${Math.round(currentValue)}`;
      percentText = '%';
    }
    const displayedValue = (currentValue > 0 ? valueText : 'UNKNOWN');
    const skillsText = accumulatedStats.join(', ');
    return this.wordEffectForSkillModIncrease(displayedValue, percentText, skillsText);
  }

  protected abstract wordEffectForSkillModIncrease(displayedValue: string, percentText: string, skillsText: string);
}
