import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDamagesPhysicalHpSacrificeParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 8 || effect[3][0] !== 0 || effect[3][1] !== 0
      || effect[3][2] !== 0 || effect[3][3] !== 0 || effect[3][4] !== 0 || effect[3][5] !== 0) {
      return 'Effet AbilityDamagesPhysicalHpSacrificeParser inconnu: Mauvaise liste de paramètres';
    }

    const elements = this.getElementsFromElementInflict(skill);
    const attackType = this.getAttackAndDamageWordingForPhysicalDamages(skill.attack_type);
    skill.physique = true;
    const power = effect[3][6];
    const sacrifice = effect[3][7];
    const target = this.getTargetForHealingSkill(effect[0], effect[1]);
    return attackType + (elements ? 'de ' + elements + ' ' : 'neutres ')
      + 'de puissance ' + power + '% avec sacrifice de ' + sacrifice + '% des PV du lanceur ' + target;
  }
}
