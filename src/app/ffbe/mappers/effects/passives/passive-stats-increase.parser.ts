import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveStatsIncreaseParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
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
    // TODO critical strikes
    return this.wordEffectJoiningIdenticalValues(increases);
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    return '+' + currentValue + '% ' + accumulatedStats.join('/');
  }
}
