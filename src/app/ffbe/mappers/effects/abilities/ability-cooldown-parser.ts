import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {HTML_LINE_RETURN} from '../skill-effects.mapper';

export class AbilityCooldownParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    const parameterError = 'Effet AbilityCooldownParser inconnu: Mauvaise liste de paramètres';
    if (effect.length < 4 || effect[0] !== 0 || effect[1] !== 3 ||
      !Array.isArray(effect[3]) || effect[3].length < 3 || effect[3].length > 4 ||
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

    return '(Une fois tous les ' + cooldown + ' tours)' + HTML_LINE_RETURN
      + activatedSkillId + HTML_LINE_RETURN + 'Disponible dès le tour ' + available;
  }
}
