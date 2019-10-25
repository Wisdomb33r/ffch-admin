import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDamagesHybridParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 10 || effect[3][0] !== 0 || effect[3][1] !== 0
      || effect[3][2] !== 0 || effect[3][3] !== 0 || effect[3][4] !== 0 || effect[3][5] !== 0 || effect[3][6] !== 0) {
      return 'Effet AbilityDamagesHybridParser inconnu: Mauvaise liste de paramètres';
    }

    const elements = this.getElementsFromElementInflict(skill);
    const elementsText = elements ? `de ${elements} ` : 'neutres ';
    let attackType = 'Dégâts hybrides ';
    if (skill.attack_type !== 'Hybrid') {
      switch (skill.attack_type) {
        case 'Magic':
          attackType = 'Attaque magique à dégâts hybrides ';
          break;
        case 'Physical':
          attackType = 'Attaque physique à dégâts hybrides ';
          break;
        case 'None':
          attackType = 'Attaque fixe à dégâts hybrides ';
          break;
        default:
          attackType = 'Attaque UNKNOWN à dégâts hybrides ';
          break;
      }
    }
    skill.hybride = true;
    const accuracy = effect[3][7];
    const accuracyText = accuracy > 0 ? ` (+${accuracy}% précision)` : '';
    const atkPower = effect[3][8];
    const magPower = effect[3][9];
    if (atkPower !== magPower) {
      return 'Effet AbilityDamagesHybridParser: Dégâts hybrides asymétriques non prévus';
    }
    const totalPower = Math.round((atkPower + magPower) / 2);
    const target = this.getTarget(effect[0], effect[1]);

    return `${attackType}${elementsText}de puissance ${totalPower}% ${target}${accuracyText}`;
  }
}
