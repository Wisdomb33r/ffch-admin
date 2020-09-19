import {EffectParser} from '../../../mappers/effects/effect-parser';
import {Skill} from '../../skill.model';

export class PassiveMpCostDecreaseEffect extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 3 || effect[3][1] !== 1 || effect[3][2] !== 0) {
      return 'Effet PassiveMpCostDecreaseParser inconnu: Mauvaise liste de paramètres';
    }

    return `-${effect[3][0]}% de PM consommés`;
  }
}
