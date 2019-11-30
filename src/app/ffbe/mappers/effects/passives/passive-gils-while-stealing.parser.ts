import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveGilsWhileStealingParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet PassiveGilsWhileStealingParser inconnu: Mauvaise liste de paramètres';
    }

    const tauxMin = effect[3][0];
    const tauxMax = effect[3][1];

    const taux = ` (${tauxMin}%${tauxMax !== tauxMin ? ` à ${tauxMax}%` : ''})`;

    return `Permet de voler des gils en plus des objets${taux}`;
  }
}
