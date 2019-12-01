import {EffectParser} from './effect-parser';
import {Skill} from '../../model/skill.model';
import {SkillsService} from '../../services/skills.service';

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
        name: this.getSkillNameWithGumiIdentifierLink(activatedSkill),
        value: modIncrease > 0 ? modIncrease : healingModIncrease,
        isHeal: modIncrease === 0 && healingModIncrease > 0,
      });
    });
  }
}
