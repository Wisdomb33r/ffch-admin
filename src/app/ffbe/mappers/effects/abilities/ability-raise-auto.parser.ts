import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityRaiseAutoParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet AbilityRaiseAutoParser inconnu: Mauvaise liste de paramètres';
    }

    const hp = effect[3][0];
    const turns = effect[3][1];
    const target = this.getTargetForHealingSkill(effect[0], effect[1]);
    const turnsText = ' pour ' + turns + ' tour' + (turns > 1 ? 's' : '');
    return 'Active Auréole (' + hp + '% de PV) ' + target + turnsText;
  }
}
