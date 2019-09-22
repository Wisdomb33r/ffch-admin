import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveGilsRateParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet PassiveGilsRateParser inconnu: Mauvaise liste de paramètres';
    }

    const gilsRate = effect[3][0];
    return '+' + (gilsRate > 0 ? gilsRate : 'UNKNOWN') + '% de gils reçus en combat';
  }
}
