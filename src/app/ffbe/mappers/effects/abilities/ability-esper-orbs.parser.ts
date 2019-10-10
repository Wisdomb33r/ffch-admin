import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityEsperOrbsParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet AbilityEsperOrbsParser inconnu: Mauvaise liste de paramètres';
    }

    const minOrbs = effect[3][0];
    const maxOrbs = effect[3][1];

    let orbText = '';
    if (minOrbs === maxOrbs) {
      orbText = minOrbs;
    } else {
      orbText = minOrbs + ' à ' + maxOrbs;
    }

    return '+' + orbText + ' sphère' + (maxOrbs > 1 ? 's' : '') + ' de chimère';
  }
}
