import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDamagesMagicParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 6 || effect[3][0] !== 0 || effect[3][1] !== 0
      || effect[3][2] !== 0 || effect[3][3] !== 0 || effect[3][4] !== 0) {
      return 'Effet AbilityDamagesMagicParser inconnu: Mauvaise liste de paramètres';
    }

    const elements = this.getElementsFromElementInflict(skill);
    let attackType = 'Dégâts magiques ';
    if (skill.attack_type !== 'Magic') {
      switch (skill.attack_type) {
        case 'Physical':
          attackType = 'Attaque physique à dégâts magiques ';
          break;
        case 'Hybrid':
          attackType = 'Attaque hybride à dégâts magiques ';
          break;
        case 'None':
          attackType = 'Attaque fixe à dégâts magiques ';
          break;
        default:
          attackType = 'Attaque UNKNOWN à dégâts magiques ';
          break;
      }
    }
    const puissance = effect[3][5];
    const target = this.getTargetForDamagingSkill(effect[0], effect[1]);
    return attackType + (elements ? 'de ' + elements + ' ' : 'neutres ') + 'de puissance ' + puissance + '% ' + target;
  }
}
