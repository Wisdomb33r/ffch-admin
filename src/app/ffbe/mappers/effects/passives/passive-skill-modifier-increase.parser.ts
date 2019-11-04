import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {SkillsService} from '../../../services/skills.service';
import {HTML_LINE_RETURN} from '../skill-effects.mapper';

export class PassiveSkillModifierIncreaseParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 4 || effect[3][1] !== 0 || effect[3][2] !== 0) {
      return 'Effet PassiveSkillModifierIncreaseParser inconnu: Mauvaise liste de paramètres';
    }

    const modifiedSkills = !Array.isArray(effect[3][0]) ? [effect[3][0]] : effect[3][0];
    const skillModifierIncrease = effect[3][3];

    const modifiedSkillsIncreases: Array<{ name: string, value: number }> = [];
    modifiedSkills.forEach(skillId => {
      const activatedSkill: Skill = SkillsService.getInstance().searchForSkillByGumiId(skillId);
      modifiedSkillsIncreases.push({
        name: this.getSkillNameWithGumiIdentifierLink(activatedSkill),
        value: !activatedSkill ? 0 : activatedSkill.calculateTotalModIncrease(skillModifierIncrease),
      });
    });

    return this.wordEffectJoiningIdenticalValues(modifiedSkillsIncreases, HTML_LINE_RETURN, true);
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    const displayedValue = (currentValue > 0 ? Math.round(currentValue) : 'UNKNOWN');
    const skillsText = accumulatedStats.join(', ');
    return `+${displayedValue}% de puissance à ${skillsText}`;
  }
}
