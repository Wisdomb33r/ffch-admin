import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDebuffsStealParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 8
      || effect[3][4] !== 0 || effect[3][5] !== 0 || effect[3][6] !== 0) {
      return 'Effet AbilityDebuffsStealParser inconnu: Mauvaise liste de paramètres';
    }
    const statsResists = [
      {name: 'ATT', value: effect[3][0]},
      {name: 'DÉF', value: effect[3][1]},
      {name: 'MAG', value: effect[3][2]},
      {name: 'PSY', value: effect[3][3]},
    ];
    let statsText = this.wordEffectJoiningIdenticalValues(statsResists);
    if (effect[3][7] === 1) {
      statsText += ' et de résistances';
    }
    const target = this.getTarget(effect[0], effect[1]);
    return `Vole ${statsText} ${target}`;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    return `les baisses de ${accumulatedStats.join('/')}`;
  }
}
