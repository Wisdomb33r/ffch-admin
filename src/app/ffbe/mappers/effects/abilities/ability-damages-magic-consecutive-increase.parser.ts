import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDamagesMagicConsecutiveIncreaseParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 6 || effect[3][0] !== 0 || effect[3][1] !== 0) {
      return 'Effet AbilityDamagesMagicConsecutiveIncreaseParser inconnu: Mauvaise liste de paramètres';
    }

    const elements = this.getElementsFromElementInflict(skill);
    const attackType = this.getAttackAndDamageWordingForMagicalDamages(skill.attack_type);
    const puissance = effect[3][2] + effect[3][3];
    const increment = effect[3][4];
    const nbIncrements = effect[3][5] - 1;
    const target = this.getTargetForDamagingSkill(effect[0], effect[1]);
    return attackType + (elements ? 'de ' + elements + ' ' : 'neutres ') + 'de puissance ' + Math.round(puissance)
      + '% (+' + increment + '% par utilisation successive, ' + nbIncrements + 'x, max '
      + Math.round(puissance + increment * nbIncrements) + '%) ' + target;
  }
}
