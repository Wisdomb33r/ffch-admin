import {EffectParser} from '../../../../mappers/effects/effect-parser';
import {Skill} from '../../../skill.model';
import {HTML_LINE_RETURN} from '../../../../mappers/effects/skill-effects.mapper';

export class PassiveEquipmentStatsDoublehandIncreaseParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 3) {
      return 'Effet PassiveEquipmentStatsDoublehandIncreaseParser inconnu: Mauvaise liste de paramètres';
    }

    let stat = 'UNKNOWN';
    if (effect[2] === 13) {
      stat = 'l\'ATT';
    }
    if (effect[2] === 70) {
      stat = 'la MAG';
    }

    let mode = '';
    if (effect[3][2] === 0) {
      mode = 'si l\'unité porte une seule arme à une main (DH)';
    } else if (effect[3][2] === 2) {
      mode = 'si l\'unité porte une seule arme (TDH)';
    } else {
      mode = 'si l\'unité porte UNKNOWN PARAMETER';
    }

    let precision = '';
    if (effect[3][1] > 0) {
      precision = HTML_LINE_RETURN + '+' + effect[3][1] + '% précision ' + mode;
    }

    return '+' + effect[3][0] + '% à ' + stat + ' de l\'équipement ' + mode + precision;
  }
}
