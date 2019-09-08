import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveEquipmentCategoryUnlockParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet EquipmentCategoryUnlockParser inconnu: Mauvaise liste de paramètres';
    }

    return 'Permet d\'équiper les ' + this.getEquipmentCategoryWithLink(effect[3][0]);
  }
}
