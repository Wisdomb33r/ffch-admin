import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {SkillMapper} from '../../skill-mapper';
import {SkillsService} from '../../../services/skills.service';
import {HTML_LINE_RETURN} from '../skill-effects.mapper';

export class PassiveSkillTurnStartActivationParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet PassiveSkillTurnStartActivationParser inconnu: Mauvaise liste de paramètres';
    }

    const activationChance = effect[3][1];

    const baseText = 'Effet activé en début de tour'
      + (activationChance > 0 && activationChance < 100 ? ' (' + activationChance + '% de chance)' : '') + ': ';
    const activatedSkill: Skill = SkillsService.getInstance().searchForSkillByGumiId(effect[3][0]);
    if (!activatedSkill) {
      return baseText + 'UNKNOWN skill';
    }

    activatedSkill.isActivatedByPassiveSkill = true;
    return SkillMapper.toCompetence(activatedSkill).effet_fr
      .split(HTML_LINE_RETURN)
      .map(effet => baseText + effet)
      .join(HTML_LINE_RETURN);
  }
}
