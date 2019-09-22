import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveCombatRateDecreaseParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet PassiveCombatRateDecreaseParser inconnu: Mauvaise liste de paramètres';
    }

    const combatRate = effect[3][0];
    return '-' + (combatRate > 0 ? combatRate : 'UNKNOWN') + '% de chance de combat en exploration';
  }
}
