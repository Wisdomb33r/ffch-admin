import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {SkillMapper} from '../../skill-mapper';
import {SkillsService} from '../../../services/skills.service';

export class PassiveBattleStartSkillActivationParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet PassiveBattleStartSkillActivationParser inconnu: Mauvaise liste de paramètres';
    }

    const baseText = 'Bonus activé en début de combat ou après résurrection: ';
    const activatedSkill: Skill = SkillsService.getInstance().searchForSkillByGumiId(effect[3][0]);
    if (!activatedSkill) {
      return baseText + 'UNKNOWN skill';
    }
    return baseText + SkillMapper.toCompetence(activatedSkill).effet_fr;
  }
}
