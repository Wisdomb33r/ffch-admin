import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {TargetPrepositionEnum} from '../../../model/effects/target-preposition.enum';

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

    const target = this.getTarget(effect[0], effect[1], TargetPrepositionEnum.De);

    return `Dissipe ${typeText}${target}`;
  }
}
