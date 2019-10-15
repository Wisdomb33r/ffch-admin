import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDamagesPhysicalComboParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 5 || effect[3][0] !== 0 || effect[3][1] !== 0) {
      return 'Effet AbilityDamagesPhysicalComboParser inconnu: Mauvaise liste de paramètres';
    }

    const elements = this.getElementsFromElementInflict(skill);
    const attackType = this.getAttackAndDamageWordingForPhysicalDamages(skill.attack_type);
    skill.physique = true;
    const minAttacks = effect[3][2];
    const maxAttacks = effect[3][3];
    const power = effect[3][4];
    const target = this.getTargetForHealingSkill(effect[0], effect[1]);

    let accuracy;
    if (effect[3].length >= 6 && effect[3][5] > 0) {
      accuracy = ' (+' + effect[3][5] + '% précision)';
    }

    let nbIncrements;
    let increment;
    if (effect[3].length >= 8) {
      nbIncrements = Math.round(100 / effect[3][6] - 1);
      increment = effect[3][7];
    }

    return 'Éxécution ' + (minAttacks === maxAttacks ? minAttacks : 'de ' + minAttacks + ' à ' + maxAttacks) + ' fois: '
      + attackType + (elements ? 'de ' + elements + ' ' : 'neutres ') + 'de puissance ' + Math.round(power) + '% '
      + (increment && nbIncrements ? '(+' + increment + '% par utilisation successive, ' + nbIncrements + 'x, max '
        + Math.round(power + increment * nbIncrements) + '%) ' : '')
      + target + (accuracy ? accuracy : '');
  }
}
