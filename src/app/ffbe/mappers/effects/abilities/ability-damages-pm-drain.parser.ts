import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDamagesPmDrainParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 3 || effect[3][2] !== 100) {
      return 'Effet AbilityDamagesPmDrainParser inconnu: Mauvaise liste de paramètres';
    }

    const elements = this.getElementsFromElementInflict(skill);
    let attackTypeText = 'Dégâts ';
    switch (skill.attack_type) {
      case 'Physical':
        attackTypeText += 'physiques ';
        break;
      case 'Magic':
        attackTypeText += 'magiques ';
        break;
      case 'Hybrid':
        attackTypeText += 'hybrides ';
        break;
      default:
        attackTypeText += 'UNKNOWN ';
        break;
    }
    const power = effect[3][1];
    const drain = effect[3][0];
    const target = this.getTargetForDamagingSkill(effect[0], effect[1]);
    return attackTypeText + (elements ? 'de ' + elements + ' ' : 'neutres ') + 'sur les PM de puissance ' + Math.round(power)
      + '% avec absorption de ' + drain + '% des dégâts infligés ' + target;
  }
}
