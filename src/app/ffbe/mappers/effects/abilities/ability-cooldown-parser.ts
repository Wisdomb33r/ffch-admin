import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {HTML_LINE_RETURN} from '../skill-effects.mapper';

export class AbilityCooldownParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || effect[0] !== 0 || effect[1] !== 3 ||
      !Array.isArray(effect[3]) || effect[3].length < 3 || !Array.isArray(effect[3][2]) || effect[3][2].length !== 2) {
      return 'Effet AbilityCooldownParser inconnu: Mauvaise liste de paramètres';
    }

    const content = effect[3];

    const activatedSkillId = content[0];
    let available = 0;
    let cooldown = 0;

    if (effect[3].length === 3) {
      if (content[2][0] === content[2][1]) {
        available = content[1];
        cooldown = content[1] + content[2][0];
      }
    }

    return '(Une fois tous les ' + cooldown + ' tours)' + HTML_LINE_RETURN
      + activatedSkillId + HTML_LINE_RETURN + 'Disponible dès le tour ' + available;
  }
}
