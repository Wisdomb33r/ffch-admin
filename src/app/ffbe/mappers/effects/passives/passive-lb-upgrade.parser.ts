import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveLbUpgradeParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet PassiveLbUpgradeParser inconnu: Mauvaise liste de paramètres';
    }

    return 'Améliore la limite de l\'unité';
  }
}
