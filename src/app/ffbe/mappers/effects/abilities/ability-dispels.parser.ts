import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDispelsParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet AbilityDispelsParser inconnu: Mauvaise liste de paramètres';
    }

    const type = effect[3][0];
    let typeText = '';
    if (type === 2) {
      typeText += 'les malus ';
    } else if (type === 1) {
      typeText += 'les bonus ';
    } else {
      typeText += 'les bonus et malus ';
    }

    let target = 'UNKNOWN target';
    if (effect[0] === 1 && effect[1] === 1) {
      target = 'd\'un adversaire';
    }
    if (effect[0] === 2 && effect[1] === 1) {
      target = 'des adversaires';
    }
    if (effect[0] === 1 && effect[1] === 2) {
      target = 'd\'un allié';
    }
    if (effect[0] === 0 && effect[1] === 3) {
      target = 'du lanceur';
    }
    if (effect[0] === 2 && effect[1] === 2) {
      target = 'des alliés';
    }

    return 'Dissipe ' + typeText + target;
  }
}
