import {EffectParser} from '../../../mappers/effects/effect-parser';
import {Skill} from '../../skill.model';
import {FfbeUtils} from '../../../utils/ffbe-utils';

export class PassiveAilmentsResistanceEffect extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 8) {
      return 'Effet PassiveAilmentsResistanceParser inconnu: Mauvaise liste de paramètres';
    }
    return this.wordEffectJoiningIdenticalValues(this.getKeyValueTableForAilements(effect[3]));
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    if (accumulatedStats.length === 8) {
      return '+' + currentValue + '% de rés. aux altérations';
    }
    return '+' + currentValue + '% de rés. ' + FfbeUtils.replaceLastOccurenceInString(accumulatedStats.join(', '), ', ', ' et ');
  }
}
