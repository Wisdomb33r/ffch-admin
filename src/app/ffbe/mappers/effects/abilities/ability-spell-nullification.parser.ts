import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilitySpellNullificationParser extends EffectParser {
  parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 3
      || effect[3][0] !== 1 || effect[3][1] !== 0 || effect[3][2] !== 1) {
      return 'Effet AbilitySpellNullificationParser inconnu: Mauvaise liste de paramètres';
    }

    return `Bloque le prochain sort de magie durant un tour`;
  }
}
