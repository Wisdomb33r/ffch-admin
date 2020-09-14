import {EffectParser} from '../../../../mappers/effects/effect-parser';
import {Skill} from '../../../skill.model';
import {HTML_LINE_RETURN} from '../../../../mappers/effects/skill-effects.mapper';

export class PassiveEquipmentStatsDoublehandGlexIncreaseParser extends EffectParser {
  private mode = '';

  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 6) {
      return 'Effet PassiveEquipmentStatsDoublehandGlexIncreaseParser inconnu: Mauvaise liste de paramètres';
    }

    const increases = [
      {name: 'PV', value: effect[3][0]},
      {name: 'PM', value: effect[3][1]},
      {name: 'ATT', value: effect[3][2]},
      {name: 'DÉF', value: effect[3][4]},
      {name: 'MAG', value: effect[3][3]},
      {name: 'PSY', value: effect[3][5]},
    ];

    if (effect[3][6] && effect[3][6] === 1) {
      this.mode = 'si l\'unité porte une seule arme (TDH)';
    } else {
      this.mode = 'si l\'unité porte une seule arme à une main (DH)';
    }

    return this.wordEffectJoiningIdenticalValues(increases, HTML_LINE_RETURN);
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    return '+' + currentValue + '% ' + accumulatedStats.join('/') + ' de l\'équipement ' + this.mode;
  }
}
