import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityThrowItemsParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1 || effect[3][0] !== 'none') {
      return 'Effet AbilityThrowItemsParser inconnu: Mauvaise liste de paramètres';
    }

    return `Permet d'utiliser les objets lançables`;
  }
}
