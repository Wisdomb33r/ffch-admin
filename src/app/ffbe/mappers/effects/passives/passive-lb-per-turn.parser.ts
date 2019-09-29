import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveLbPerTurnParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet PassiveLbPerTurnParser inconnu: Mauvaise liste de paramètres';
    }

    if (effect[3][0] === 100) {
      return '+1 cristal de limite chaque tour';
    }
    return '+' + (effect[3][0] / 100) + ' cristaux de limite chaque tour';
  }
}
