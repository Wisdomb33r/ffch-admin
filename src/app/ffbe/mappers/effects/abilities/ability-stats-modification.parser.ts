import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityStatsModificationParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 5) {
      return 'Effet AbilityStatsModificationParser inconnu: Mauvaise liste de paramètres';
    }

    const increases = [
      {name: 'ATT', value: effect[3][0]},
      {name: 'DÉF', value: effect[3][1]},
      {name: 'MAG', value: effect[3][2]},
      {name: 'PSY', value: effect[3][3]},
    ];
    // TODO critical strikes
    // TODO What if effect[3][5] !== 1 ?

    const turns = (effect[3][4] >= 0) ? ' pour ' + effect[3][4] + ' tour' + (effect[3][4] > 1 ? 's' : '') : ' pour ce combat';

    if (increases.every(element => element.value === 0)) {
      if (effect[2] === 58) {
        return 'Chante' + turns;
      } else {
        return '';
      }
    }

    const statModifier = this.wordEffectJoiningIdenticalValues(increases);

    const target = this.getLocalTarget(effect[0], effect[1], effect[2]);

    let dispellable = '';
    if (effect[3].length >= 7 && effect[3][6] === 1) {
      dispellable = ' (bonus non-dissipable)';
    }

    const activity = effect[2] === 58 ? ' en chantant' : '';

    return statModifier + target + turns + activity + dispellable;
  }

  protected getLocalTarget(effectId1: number, effectId2: number, effectId3: number): string {
    let target = ' à UNKNOWN';

    if ((effectId1 === 0 || effectId1 === 1) && effectId2 === 3) {
      target = ' au lanceur';
    } else if (effectId1 === 1 && effectId2 === 2) {
      target = ' à un allié';
    } else if (effectId1 === 2 && effectId2 === 2) {
      target = ' aux alliés';
    } else if (effectId1 === 2 && effectId2 === 5) {
      target = ' aux alliés sauf le lanceur';
    } else if (effectId1 === 1 && effectId2 === 1) {
      target = ' à un adversaire';
    } else if (effectId1 === 2 && effectId2 === 1) {
      target = ' aux adversaires';
    }

    return target;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    const sign = currentValue >= 0 ? '+' : '';
    return sign + currentValue + '% ' + accumulatedStats.join('/');
  }
}
