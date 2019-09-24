import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveGilsWhileStealingParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2 || effect[3][0] !== 100 || effect[3][1] !== 100) {
      return 'Effet PassiveGilsWhileStealingParser inconnu: Mauvaise liste de paramètres';
    }

    return 'Permet de voler des gils en plus des objets';
  }
}
