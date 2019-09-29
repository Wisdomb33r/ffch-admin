import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDamagesPhysicalTurnDelayParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 6) {
      return 'Effet AbilityDamagesPhysicalTurnDelayParser inconnu: Mauvaise liste de paramètres';
    }

    const elements = this.getElementsFromElementInflict(skill);
    const attackType = this.getAttackAndDamageWordingForPhysicalDamages(skill.attack_type);
    const power = effect[3][5];
    const turnDelay = effect[3][0];
    const target = this.getTargetForDamagingSkill(effect[0], effect[1]);
    return attackType + (elements ? 'de ' + elements + ' ' : 'neutres ')
      + 'de puissance ' + power + '% avec délai de ' + turnDelay + ' tour' + (turnDelay > 1 ? 's' : '') + ' ' + target;
  }
}
