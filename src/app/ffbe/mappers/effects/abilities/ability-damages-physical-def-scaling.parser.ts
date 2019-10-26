import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDamagesPhysicalDefScalingParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 3 || effect[3][0] !== 100 || effect[3][1] < 9999) {
      return 'Effet AbilityDamagesPhysicalDefScalingParser inconnu: Mauvaise liste de paramètres';
    }

    const elements = this.getElementsFromElementInflict(skill);
    const attackType = this.getAttackAndDamageWordingForPhysicalDamages(skill.attack_type);
    skill.physique = true;
    const puissance = effect[3][2];
    const target = this.getTarget(effect[0], effect[1]);
    return attackType + (elements ? 'de ' + elements + ' ' : 'neutres ') + 'calculés sur la DÉF de puissance ' + Math.round(puissance) + '% ' + target;
  }
}
