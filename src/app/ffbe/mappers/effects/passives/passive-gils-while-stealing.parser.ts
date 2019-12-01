import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveGilsWhileStealingParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet PassiveGilsWhileStealingParser inconnu: Mauvaise liste de paramètres';
    }

    const tauxMin = effect[3][0];
    const tauxMax = effect[3][1];
    let tauxText = ` ${tauxMin}% à ${tauxMax}%`;
    if (tauxMin === tauxMax) {
      tauxText = ` ${tauxMax}%`;
    }

    return `Permet de voler${tauxText} des gils en plus des objets`;
  }
}
