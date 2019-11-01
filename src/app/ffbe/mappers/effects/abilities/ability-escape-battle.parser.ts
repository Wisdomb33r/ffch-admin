import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityEscapeBattleParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1 || effect[3][0] !== 100) {
      return 'Effet AbilityEscapeBattleParser inconnu: Mauvaise liste de paramètres';
    }

    return `Permet de fuir la plupart des combats`;
  }
}
