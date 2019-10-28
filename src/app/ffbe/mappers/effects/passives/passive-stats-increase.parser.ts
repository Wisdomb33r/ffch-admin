import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {FfbeUtils} from '../../../utils/ffbe-utils';
import {HTML_LINE_RETURN} from '../skill-effects.mapper';

export class PassiveStatsIncreaseParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 4) {
      return 'Effet PassiveStatsIncreaseParser inconnu: Mauvaise liste de paramètres';
    }
    const increases = [
      {name: 'PV', value: (effect[3][4] ? effect[3][4] : 0)},
      {name: 'PM', value: (effect[3][5] ? effect[3][5] : 0)},
      {name: 'ATT', value: effect[3][0]},
      {name: 'DÉF', value: effect[3][1]},
      {name: 'MAG', value: effect[3][2]},
      {name: 'PSY', value: effect[3][3]},
    ];
    const increasesText = FfbeUtils.replaceLastOccurenceInString(this.wordEffectJoiningIdenticalValues(increases), ', ', ' et ');
    const critChance = effect[3][6];
    let critChanceText = '';
    if (critChance > 0) {
      critChanceText = `+${critChance}% de coups critiques des attaques normales`;
    }
    if (increasesText && increasesText.length && critChanceText && critChanceText.length) {
      critChanceText = HTML_LINE_RETURN + critChanceText;
    }
    return increasesText + critChanceText;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    return `+${currentValue}% ${accumulatedStats.join('/')}`;
  }
}
