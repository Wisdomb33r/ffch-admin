import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {SkillsService} from '../../../services/skills.service';

export class AbilityDelayedSkillParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 3) {
      return 'Effet AbilityDelayedSkillParser inconnu: Mauvaise liste de paramètres';
    }

    const activatedSkillId = effect[3][0];

    const activatedSkill = SkillsService.getInstance().searchForSkillByGumiId(activatedSkillId);
    const activatedSkillLink = this.getSkillNameWithGumiIdentifierLink(activatedSkill);

    const numTurns = effect[3][2];
    const pluralForm = (effect[3][2] > 1) ? 's' : '';

    const target = this.getTarget(effect[0], effect[1]);

    return `Lance ${activatedSkillLink} avec délai de ${numTurns} tour${pluralForm} ${target}`;
  }
}
