import {EffectParser} from '../../../../mappers/effects/effect-parser';
import {Skill} from '../../../skill.model';

export class PassiveDualWieldWeaponCategoryUnlockParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet PassiveDualWieldWeaponCategoryUnlockParser inconnu: Mauvaise liste de paramètres';
    }

    if (effect[3].length === 1 && effect[3][0] === 'none') {
      return 'Permet d\'équiper deux armes';
    }

    return 'Permet d\'équiper deux ' + effect[3].map(categorie => this.getEquipmentCategoryNameWithLink(categorie)).join(', ');
  }
}
