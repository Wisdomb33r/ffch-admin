import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {HTML_LINE_RETURN} from '../skill-effects.mapper';

export class PassiveDebuffsResistanceParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 6) {
      return 'Effet PassiveDebuffsResistanceParser inconnu: Mauvaise liste de paramètres';
    }
    const statsResists = [
      {name: 'ATT', value: effect[3][0]},
      {name: 'DÉF', value: effect[3][1]},
      {name: 'MAG', value: effect[3][2]},
      {name: 'PSY', value: effect[3][3]},
    ];
    let text = this.wordEffectJoiningIdenticalValues(statsResists);
    if (effect[3][4] > 0) {
      text += (text && text.length ? HTML_LINE_RETURN : '') + '+' + effect[3][4] + '% de rés. à Stop';
      if (effect[3][5] > 0 && effect[3][4] === effect[3][5]) {
        text += ' et Charme';
      }
    }
    if (effect[3][5] > 0 && effect[3][4] !== effect[3][5]) {
      text += (text && text.length ? HTML_LINE_RETURN : '') + '+' + effect[3][5] + '% de rés. à Charme';
    }
    return text;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    return '+' + currentValue + '% de rés. aux baisses de ' + accumulatedStats.join('/');
  }
}