import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveNormalAttacksMultipleStrikesParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet PassiveNormalAttacksMultipleStrikesParser inconnu: Mauvaise liste de paramètres';
    }

    return 'Les attaques normales s\'exécutent ' + effect[3][0] + ' fois';
  }
}
