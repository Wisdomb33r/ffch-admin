import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {HTML_LINE_RETURN} from '../skill-effects.mapper';

export class AbilityCooldownParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    const parameterError = 'Effet AbilityCooldownParser inconnu: Mauvaise liste de paramètres';
    if (effect.length < 4 || effect[0] !== 0 || effect[1] !== 3 ||
      !Array.isArray(effect[3]) || effect[3].length < 3 || effect[3].length > 4 ||
      !Array.isArray(effect[3][2]) || effect[3][2].length !== 2) {
      return parameterError + ' (1)';
    }

    const content = effect[3];

    const activatedSkillId = content[0];
    const prefix = content[1];
    const innerArray = content[2];
    const suffix = content.length > 3 ? content[3] : undefined;

    let available = 0;
    let cooldown = 0;

    if (content.length === 3) {
      if (prefix !== 1) {
        return parameterError + ' (2)';
      }
      if (innerArray[0] === innerArray[1]) {
        available = prefix;
        cooldown = prefix + innerArray[0];
      } else if (innerArray[1] === 0) {
        available = prefix + innerArray[0];
        cooldown = available;
      } else {
        return parameterError + ' (3)';
      }
    } else if (content.length === 4) {
      if (prefix === 0 && suffix === 0) {
        if (innerArray[0] === 4 && innerArray[1] === 4) {
          available = innerArray[0] + 1;
          cooldown = available;
        } else {
          return parameterError + ' (4)';
        }
      }
    }

    return '(Une fois tous les ' + cooldown + ' tours)' + HTML_LINE_RETURN
      + activatedSkillId + HTML_LINE_RETURN + 'Disponible dès le tour ' + available;
  }
}
