import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveItemsStealRateParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2 || effect[3][1] !== 0) {
      return 'Effet PassiveItemsStealRateParser inconnu: Mauvaise liste de paramètres';
    }

    return '+' + effect[3][0] + '% de chance de réussir à voler un objet';
  }
}
