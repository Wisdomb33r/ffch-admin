import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveStatsIncreaseParser extends EffectParser {
  parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 6) {
      return 'Effet PassiveStatsIncreaseParser inconnu: Mauvaise liste de paramètres';
    }
    const increases = [
      {name: 'PV', value: effect[3][4]},
      {name: 'PM', value: effect[3][5]},
      {name: 'ATT', value: effect[3][0]},
      {name: 'DEF', value: effect[3][1]},
      {name: 'MAG', value: effect[3][2]},
      {name: 'PSY', value: effect[3][3]},
    ];
    increases.sort((a, b) => {
      return a.value === b.value ? 0 : (a.value > b.value ? -1 : 1);
    });
    let text = '';
    let currentValue: number;
    let accumulatedStats = '';
    increases.forEach(stat => {
      if (currentValue === stat.value) {
        accumulatedStats += '/' + stat.name;
      } else {
        if (currentValue && accumulatedStats) {
          text += (text.length ? ', ' : '') + '+' + currentValue + '% ' + accumulatedStats;
          currentValue = undefined;
          accumulatedStats = '';
        }
        if (stat.value > 0) {
          currentValue = stat.value;
          accumulatedStats = stat.name;
        }
      }
    });
    if (currentValue > 0) {
      text += (text.length ? ', ' : '') + '+' + currentValue + '% ' + accumulatedStats;
    }
    // TODO crit
    return text;
  }
}
