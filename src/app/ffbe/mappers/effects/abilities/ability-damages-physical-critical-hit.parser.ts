import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDamagesPhysicalCriticalHitParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 4 || effect[3][0] !== 0 || effect[3][1] !== 0) {
      return 'Effet AbilityDamagesPhysicalCriticalHitParser inconnu: Mauvaise liste de paramètres';
    }

    const elements = this.getElementsFromElementInflict(skill);
    const attackType = this.getAttackAndDamageWordingForPhysicalDamages(skill.attack_type);
    skill.physique = true;
    const power = effect[3][2];
    const target = this.getTarget(effect[0], effect[1]);
    const missChange = effect[3][3];
    return attackType + 'critiques ' + elements
      + ' de puissance ' + Math.round(power) + '% ' + target + (missChange ? ' (-' + missChange + '% précision)' : '');
  }
}
