import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {SkillsService} from '../../../services/skills.service';

export class PassiveSkillMultipleActivationParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 5 || effect[3][2] !== -1 || effect[3][4] !== 1) {
      return 'Effet PassiveSkillMultipleActivationParser inconnu: Mauvaise liste de paramètres';
    }

    const nbTimes: number = effect[3][0];
    const doubleSkillAbilityActivatedId: number = effect[3][1];
    const modifiedSkillsIds: Array<number> = !Array.isArray(effect[3][3]) ? [effect[3][3]] : effect[3][3];

    if (skill.effects_raw.length === 1) {
      const modifiedSkills = modifiedSkillsIds.map((skillId: number) => SkillsService.getInstance().searchForSkillByGumiId(skillId));
      return 'Permet l\'utilisation de ' + this.getSkillsNamesWithGumiIdentifierLinks(modifiedSkills) + ' ' + nbTimes + 'x par tour';
    } else {
      const doubleSkillAbilityActivated: Skill = SkillsService.getInstance().searchForSkillByGumiId(doubleSkillAbilityActivatedId);
      return 'Permet l\'utilisation de ' + this.getSkillNameWithGumiIdentifierLink(doubleSkillAbilityActivated);
    }
  }
}
