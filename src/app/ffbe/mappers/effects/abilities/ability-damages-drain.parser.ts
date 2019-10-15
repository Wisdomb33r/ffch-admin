import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDamagesDrainParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 3 || effect[3][2] !== 100) {
      return 'Effet AbilityDamagesDrainParser inconnu: Mauvaise liste de paramètres';
    }

    const elements = this.getElementsFromElementInflict(skill);
    let attackTypeText = 'Dégâts ';
    switch (skill.attack_type) {
      case 'Physical':
        skill.physique = true;
        attackTypeText += 'physiques ';
        break;
      case 'Magic':
        skill.magique = true;
        attackTypeText += 'magiques ';
        break;
      case 'Hybrid':
        skill.hybride = true;
        attackTypeText += 'hybrides ';
        break;
      default:
        attackTypeText += 'UNKNOWN ';
        break;
    }
    const power = effect[3][1];
    const drain = effect[3][0];
    const drainType = effect[2] === 10 ? 'sur les PM ' : '';
    const target = this.getTargetForHealingSkill(effect[0], effect[1]);
    return attackTypeText + (elements ? 'de ' + elements + ' ' : 'neutres ') + drainType + 'de puissance ' + Math.round(power)
      + '% avec absorption de ' + drain + '% des dégâts infligés ' + target;
  }
}
