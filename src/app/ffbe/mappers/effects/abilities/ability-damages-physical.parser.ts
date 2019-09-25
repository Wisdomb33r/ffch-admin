import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDamagesPhysicalParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 7 || effect[3][0] !== 0 || effect[3][1] !== 0
      || effect[3][2] !== 0 || effect[3][3] !== 0 || effect[3][4] !== 0) {
      return 'Effet AbilityDamagesPhysicalParser inconnu: Mauvaise liste de paramètres';
    }

    const elements = this.getElementsFromElementInflict(skill);
    let attackType = 'Dégâts physiques ';
    if (skill.attack_type !== 'Physical') {
      switch (skill.attack_type) {
        case 'Magic':
          attackType = 'Attaque magique à dégâts physiques ';
          break;
        case 'Hybrid':
          attackType = 'Attaque hybride à dégâts physiques ';
          break;
        case 'None':
          attackType = 'Attaque fixe à dégâts physiques ';
          break;
        default:
          attackType = 'Attaque UNKNOWN à dégâts physiques ';
          break;
      }
    }
    const puissance = effect[3][5] + effect[3][6];
    const target = this.getTargetForDamagingSkill(effect[0], effect[1]);
    return attackType + (elements ? 'de ' + elements + ' ' : 'neutres ') + 'de puissance ' + puissance + '% ' + target;
  }
}
