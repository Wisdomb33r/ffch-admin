import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityStatsModificationParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 5) {
      return 'Effet AbilityStatsIncreaseCasterParser inconnu: Mauvaise liste de paramètres';
    }
    const increases = [
      {name: 'ATT', value: effect[3][0]},
      {name: 'DÉF', value: effect[3][1]},
      {name: 'MAG', value: effect[3][2]},
      {name: 'PSY', value: effect[3][3]},
    ];
    // TODO critical strikes
    // TODO all values equal to 0
    // TODO What if effect[3][5] !== 1 ?

    const statModifier = this.wordEffectJoiningIdenticalValues(increases);

    const target = this.getTarget(effect[0], effect[1], effect[2]);

    const turns = (effect[3][4] >= 0) ? ' pour ' + effect[3][4] + ' tours' : ' pour ce combat';

    let dispellable = '';
    if (effect[3].length >= 7 && effect[3][6] === 1) {
      dispellable = ' (bonus non-dissipable)';
    }

    return statModifier + target + turns + dispellable;
  }

  protected getTarget(effectId1: number, effectId2: number, effectId3: number): String {
    let target = ' à UNKNOWN';

    if ((effectId1 === 0 || effectId1 === 1) && effectId2 === 3 && effectId3 === 3) {
      target = ' au lanceur';
    } else if (effectId1 === 2 && effectId2 === 2 && effectId3 === 3) {
      target = ' à tous les alliés';
    } else if (effectId1 === 2 && effectId2 === 5 && effectId3 === 3) {
      target = ' à tous les alliés sauf le lanceur';
    } else if (effectId1 === 1 && effectId2 === 1 && effectId3 === 24) {
      target = ' à un adversaire';
    } else if (effectId1 === 2 && effectId2 === 1 && effectId3 === 24) {
      target = ' à tous les adversaires';
    }

    return target;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    const sign = currentValue >= 0 ? '+' : '';
    return sign + currentValue + '% ' + accumulatedStats.join('/');
  }
}
