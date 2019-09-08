import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveAllyCoverParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 5) {
      return 'Effet PassiveAllyCoverParser inconnu: Mauvaise liste de paramètres';
    }

    let mitigation = '';
    if (effect[3][2] > 0 && effect[3][3] > 0) {
      mitigation = ' avec mitigation de ' + effect[3][2] + '%';
      if (effect[3][2] !== effect[3][3]) {
        mitigation += '-' + effect[3][3] + '%';
      }
    }

    return effect[3][4] + '% de chance de protéger un allié '
      + (+effect[3][0] === 1 ? 'féminin ' : '')
      + 'des attaques' + mitigation;
  }
}
