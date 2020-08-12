import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {SkillsService} from '../../../services/skills.service';
import {HTML_LINE_RETURN} from '../skill-effects.mapper';

export class AbilityRandomSkillsParser extends EffectParser {
  parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet AbilityRandomSkillsParser inconnu: Mauvaise liste de paramètres';
    }

    const entries: Array<any> = effect[3];
    const prunedEntries = entries.filter(value => Array.isArray(value) && value.length >= 2);

    const randomSkills = prunedEntries.map(entry => {
      const skillId = entry[0];
      const chances = entry[1];

      const skill = SkillsService.getInstance().searchForSkillByGumiId(skillId);
      const link = EffectParser.getSkillNameWithGumiIdentifierLink(skill);

      return `${chances}%: Lance ${link}`;
    });

    return `Effet aléatoire:${HTML_LINE_RETURN}${randomSkills.join(HTML_LINE_RETURN)}`;
  }
};
