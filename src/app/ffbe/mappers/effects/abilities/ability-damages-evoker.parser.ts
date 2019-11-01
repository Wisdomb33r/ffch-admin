import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDamagesEvokerParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 10 || effect[3][0] !== 0 || effect[3][1] !== 0
      || effect[3][2] !== 0 || effect[3][3] !== 0 || effect[3][4] !== 0 || effect[3][5] !== 0 || effect[3][6] !== 0) {
      return 'Effet AbilityDamagesEsperParser inconnu: Mauvaise liste de paramètres';
    }

    const elements = this.getElementsFromElementInflict(skill);
    let attackType = 'Attaque fixe à dégâts d\'invocateur ';
    if (skill.attack_type !== 'None') {
      attackType = 'Attaque UNKNOWN à dégâts d\'invocateur ';
    }
    skill.esper = true;
    const magPower = effect[3][7];
    const sprPower = effect[3][8];
    const repartition = effect[3][9];
    const target = this.getTarget(effect[0], effect[1]);
    return attackType + elements
      + ' de puissance ' + Math.round(magPower * repartition[0] / 100 + sprPower * repartition[1] / 100) + '% '
      + '(' + repartition[0] + '% MAG, ' + repartition[1] + '% PSY) '
      + target;
  }
}
