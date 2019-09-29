import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveExperienceRateParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet PassiveExperienceRateParser inconnu: Mauvaise liste de paramètres';
    }

    const xpRate = effect[3][0];
    return '+' + (xpRate > 0 ? xpRate : 'UNKNOWN') + '% d\'expérience reçue en combat';
  }
}
