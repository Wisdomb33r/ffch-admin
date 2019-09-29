import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {SkillsService} from '../../../services/skills.service';

export class AbilitySkillActivationParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 4) {
      return 'Effet AbilitySkillMultipleActivationParser inconnu: Mauvaise liste de paramètres';
    }

    const numTimes: number = effect[3][2];
    const numTurns: number = effect[3][3];
    const activatedSkillsIds: Array<number> = !Array.isArray(effect[3][1]) ? [effect[3][1]] : effect[3][1];

    const activatedSkills = activatedSkillsIds.map((skillId: number) => SkillsService.getInstance().searchForSkillByGumiId(skillId));
    const links = this.getSkillsNamesWithGumiIdentifierLinks(activatedSkills);

    return 'Donne accès à ' + links + ' pour ' + +(numTurns - 1) + ' tours';
  }
}

