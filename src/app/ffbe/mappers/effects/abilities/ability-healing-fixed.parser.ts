import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityHealingFixedParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet AbilityHealingFixedParser inconnu: Mauvaise liste de paramètres';
    }

    const mp = effect[3][0];
    const target = this.getTargetForHealingSkill(effect[0], effect[1]);
    return 'Soigne ' + mp + ' PM ' + target;
  }
}
