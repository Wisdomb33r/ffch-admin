import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDamagesPhysicalIgnoreDefParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 4 || effect[3][0] !== 0 || effect[3][1] !== 0) {
      return 'Effet AbilityDamagesPhysicalIgnoreDefParser inconnu: Mauvaise liste de paramètres';
    }

    const elements = this.getElementsFromElementInflict(skill);
    const attackType = this.getAttackAndDamageWordingForPhysicalDamages(skill.attack_type);
    skill.physique = true;
    const puissance = effect[3][2];
    const ignoreDef = effect[3][3];
    const total = puissance * 100 / (100 + ignoreDef);
    const target = this.getTargetForDamagingSkill(effect[0], effect[1]);
    return attackType + (elements ? 'de ' + elements + ' ' : 'neutres ')
      + 'de puissance ' + puissance + '% (ignore ' + Math.abs(ignoreDef) + '% DÉF, ' + Math.round(total) + '% total) ' + target
      + ' (ignore les couvertures)';
  }
}
