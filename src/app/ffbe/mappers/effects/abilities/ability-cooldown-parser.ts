import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {HTML_LINE_RETURN} from '../skill-effects.mapper';
import {SkillsService} from '../../../services/skills.service';
import {SkillMapper} from '../../skill-mapper';

export class AbilityCooldownParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    const parameterError = 'Effet AbilityCooldownParser inconnu: Mauvaise liste de paramètres';
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 3 || effect[3].length > 4 ||
      !Array.isArray(effect[3][2]) || effect[3][2].length !== 2) {
      return parameterError;
    }

    const content = effect[3];

    const activatedSkillId = content[0];
    const prefix = content[1];
    const innerArray = content[2];
    const suffix = content.length > 3 ? content[3] : undefined;

    if (prefix !== 0 && prefix !== 1) {
      return parameterError + '(prefix = ' + prefix + ')';
    } else if (suffix !== undefined && suffix !== 0 && suffix !== 1) {
      return parameterError + '(suffix = ' + suffix + ')';
    }

    const cooldown = innerArray[0] + 1;

    const available = cooldown - innerArray[1];

    const baseText = 'Disponible tous les ' + cooldown + ' tours dès le tour ' + available + ':' + HTML_LINE_RETURN;
    const activatedSkill: Skill = SkillsService.getInstance().searchForSkillByGumiId(activatedSkillId);
    if (!activatedSkill) {
      return baseText + 'UNKNOWN skill';
    }

    const singleActivationNotice = (suffix === 0 && (skill.attack_type === 'Physical' || skill.attack_type === 'Hybrid')) ?
      '<br />Ne s\'active qu\'<strong>une fois</strong> si l\'unité porte deux armes' : '';

    const transitiveEffectParsed = SkillMapper.toCompetence(activatedSkill).effet_fr;
    this.fillSkillWithTransitiveActivatedSkillInformation(skill, activatedSkill);
    return baseText + transitiveEffectParsed + singleActivationNotice;
  }
}
