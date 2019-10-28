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

    // Effect ID 24 are stat decreases, even when coefficients are positive
    if (effect[2] === 24) {
      increases.forEach(increase => {
        if (increase.value > 0) {
          increase.value = -increase.value
        }
      });
    }

    const numTurns = (effect[3][4] >= 0) ? effect[3][4] : 9999;
    const pluralForm = (numTurns > 1) ? 's' : '';
    const turns = (numTurns === 0) ? ' pour ce tour' : ` pour ${numTurns} tour${pluralForm}`;

    if (increases.every(element => element.value === 0)) {
      if (effect[2] === 58) {
        return 'Chante' + turns;
      } else {
        return '';
      }
    }

    const statModifier = this.wordEffectJoiningIdenticalValues(increases);

    const target = this.getTarget(effect[0], effect[1]);

    let dispellable = '';
    if (effect[3].length >= 7 && effect[3][6] === 1) {
      dispellable = ' (bonus non-dissipable)';
    }

    const activity = effect[2] === 58 ? ' en chantant' : '';

    return `${statModifier} ${target}${turns}${activity}${dispellable}`;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    const sign = currentValue >= 0 ? '+' : '';
    return `${sign}${currentValue}% ${accumulatedStats.join('/')}`;
  }
}
