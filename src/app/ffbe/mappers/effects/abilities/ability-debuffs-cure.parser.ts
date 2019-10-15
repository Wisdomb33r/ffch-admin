import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {FfbeUtils} from '../../../utils/ffbe-utils';

export class AbilityDebuffsCureParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 6) {
      return 'Effet AbilityDebuffsCureParser inconnu: Mauvaise liste de paramètres';
    }
    const statsResists = [
      {name: 'ATT', value: effect[3][0]},
      {name: 'DÉF', value: effect[3][1]},
      {name: 'MAG', value: effect[3][2]},
      {name: 'PSY', value: effect[3][3]},
    ];
    let text = this.wordEffectJoiningIdenticalValues(statsResists);
    if (effect[3][4] > 0) {
      text += (text.length > 0 ? ', ' : '') + 'Stop';
    }
    if (effect[3][5] > 0) {
      text += (text.length > 0 ? ', ' : '') + 'Charme';
    }
    const target = this.getTarget(effect[0], effect[1]);
    return 'Soigne ' + FfbeUtils.replaceLastOccurenceInString(text, ', ', ' et ') + ' ' + target;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    return 'les baisses de ' + accumulatedStats.join('/');
  }
}
