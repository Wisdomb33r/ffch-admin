import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityMagicMultipleActivationParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[0] !== 0 || effect[1] !== 3) {
      return 'Effet AbilityMagicMultipleActivationParser inconnu: Mauvaise liste de paramètres';
    }

    if (effect[3].length === 1 && effect[3][0] === 'none') {
      let magicTypeText = '';
      if (effect[2] === 44) {
        magicTypeText = 'noire ';
      }
      return 'Permet l\'utilisation des sorts de magie ' + magicTypeText + '2x par tour';
    }
    if (effect[3].length === 3) {
      const magicType = effect[3][0];
      const castNumber = effect[3][1];
      let magicTypeText = this.getMagicTypeFromId(magicType);
      if (magicTypeText.length > 0) {
        magicTypeText += ' ';
      }
      return 'Permet l\'utilisation des sorts de magie ' + magicTypeText + castNumber + 'x par tour';
    }
    if (effect[3].length === 6) {
      const magicType1 = effect[3][0];
      const magicType2 = effect[3][1];
      const castNumber1 = effect[3][2];
      const castNumber2 = effect[3][3];
      return 'Permet l\'utilisation des sorts de magie '
        + this.getMagicTypeFromId(magicType1) + ' et ' + this.getMagicTypeFromId(magicType2)
        + ' ' + (castNumber1 === castNumber2 ? castNumber1 : 'UNKNOWN') + 'x par tour';
    }
    return 'Effet AbilityDamagesPhysicalJumpDelayParser inconnu: Mauvaise liste de paramètres pour multi-cast magie';
  }
}
