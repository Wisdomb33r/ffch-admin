import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityStatsModificationParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 5) {
      return 'Effet AbilityStatsIncreaseCasterParser inconnu: Mauvaise liste de paramètres';
    }
    const increases = [
      {name: 'ATT', value: effect[3][0]},
      {name: 'DEF', value: effect[3][1]},
      {name: 'MAG', value: effect[3][2]},
      {name: 'PSY', value: effect[3][3]},
    ];
    // TODO critical strikes

    const statModifier = this.wordEffectJoiningIdenticalValues(increases);

    const target = ' au lanceur';

    const turns = (effect[3][4] >= 0) ? ' pour ' + effect[3][4] + ' tours' : ' pour ce combat';

    return statModifier + target + turns;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    return '+' + currentValue + '% ' + accumulatedStats.join('/');
  }
}
