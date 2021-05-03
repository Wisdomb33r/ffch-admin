import {EffectParser} from './effect-parser';
import {Skill} from '../../model/skill.model';
import {SkillsService} from '../../services/skills.service';
import {SkillEffect} from '../../model/effects/skill-effect.model';

export abstract class SkillModifierIncreaseEffect extends SkillEffect {
  protected modifiedSkillsIncreases: Array<{ name: string, value: number, isHeal: boolean }> = [];

  protected initializeSkillIncreasesValues(effect: Array<any>) {
    const modifiedSkills = !Array.isArray(effect[3][0]) ? [effect[3][0]] : effect[3][0];
    const skillModifierIncrease = effect[3][3];

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
    return this.wordEffectForSkillModIncrase(displayedValue, percentText, skillsText);
  }

  protected abstract wordEffectForSkillModIncrase(displayedValue: string, percentText: string, skillsText: string);
}

export abstract class SkillModifierIncreaseParser extends EffectParser {
  protected modifiedSkillsIncreases: Array<{ name: string, value: number, isHeal: boolean }> = [];

  protected initializeSkillIncreasesValues(effect: Array<any>) {
    const modifiedSkills = !Array.isArray(effect[3][0]) ? [effect[3][0]] : effect[3][0];
    const skillModifierIncrease = effect[3][3];

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
    return this.wordEffectForSkillModIncrase(displayedValue, percentText, skillsText);
  }

  protected abstract wordEffectForSkillModIncrase(displayedValue: string, percentText: string, skillsText: string);
}
