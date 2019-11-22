import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityItemStealParser extends EffectParser {
  parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet AbilityItemStealParser inconnu: Mauvaise liste de paramètres';
    }

    const target = this.getTarget(effect[0], effect[1]);
    const stealChance = effect[3][0];
    const stealChanceText = stealChance > 0 && stealChance < 100 ? ` (${stealChance}% de chance)` : '';

    return `Vole un objet ${target}${stealChanceText}`;
  }
}
