import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {HTML_LINE_RETURN} from '../skill-effects.mapper';

export class PassiveItemsDropRateParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet PassiveItemsDropRateParser inconnu: Mauvaise liste de paramètres';
    }

    const normalItemsRate = effect[3][0];
    const rareItemsRate = effect[3][1];
    let text = '';
    if (normalItemsRate > 0) {
      text += '+' + normalItemsRate + '% de chance d\'obtenir un butin normal';
    }
    if (rareItemsRate > 0) {
      text += (text.length > 1 ? HTML_LINE_RETURN : '') + '+' + rareItemsRate + '% de chance de recevoir un butin rare';
    }

    return text.length > 1 ? text : 'UNKNOWN drop rate for items';
  }
}
