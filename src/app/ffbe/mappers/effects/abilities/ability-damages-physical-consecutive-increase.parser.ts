import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDamagesPhysicalConsecutiveIncreaseParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 7 || effect[3][0] !== 1 || effect[3][1] !== 0
      || effect[3][2] !== 0) {
      return 'Effet AbilityDamagesPhysicalConsecutiveIncreaseParser inconnu: Mauvaise liste de paramètres';
    }

    const elements = this.getElementsFromElementInflict(skill);
    const attackType = this.getAttackAndDamageWordingForPhysicalDamages(skill.attack_type);
    skill.physique = true;
    const power = effect[3][3] + effect[3][4];
    const increment = effect[3][5];
    const nbIncrements = effect[3][6] - 1;
    const target = this.getTarget(effect[0], effect[1]);
    return attackType + elements + ' de puissance ' + Math.round(power)
      + '% (+' + increment + '% par utilisation successive, ' + nbIncrements + 'x, max '
      + Math.round(power + increment * nbIncrements) + '%) ' + target;
  }
}
