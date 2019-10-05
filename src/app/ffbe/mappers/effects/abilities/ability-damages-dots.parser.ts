import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDamagesDotsParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 7
      || effect[3][2] !== 0 || effect[3][3] !== 1 || effect[3][5] !== 1) {
      return 'Effet AbilityDamagesDotsParser inconnu: Mauvaise liste de paramètres';
    }

    const elements = this.getElementsFromElementInflict(skill);
    const damageType = effect[3][0];
    let attackType = 'UNKNOWN ';
    if (damageType === 1) {
      attackType = this.getAttackAndDamageWordingForPhysicalDamages(skill.attack_type);
    } else if (damageType === 3) {
      attackType = this.getAttackAndDamageWordingForMagicalDamages(skill.attack_type);
    }
    const power = effect[3][1];
    const turns = effect[3][4];
    const stackId = effect[3][6] ? effect[3][6] : 0;
    const target = this.getTargetForDamagingSkill(effect[0], effect[1]);
    return attackType + (elements ? 'de ' + elements + ' ' : 'neutres ')
      + 'de puissance ' + Math.round(power) + '% chaque tour pour ' + turns + ' tours ' + target + ' (ID #' + stackId + ')';
  }
}
