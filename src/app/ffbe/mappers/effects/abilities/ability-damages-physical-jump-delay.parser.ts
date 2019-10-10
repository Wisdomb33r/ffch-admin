import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDamagesPhysicalJumpDelayParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3])) {
      return 'Effet AbilityDamagesPhysicalJumpDelayParser inconnu: Mauvaise liste de paramètres';
    }

    // multi magic spells seems to have the same effect ID than jumps... wtf ?
    if (effect[0] === 0 && effect[1] === 3) {
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

    if (effect[3].length !== 5 || effect[0] !== 1 || effect[1] !== 1 || effect[3][0] !== 0 || effect[3][1] !== 0) {
      return 'Effet AbilityDamagesPhysicalJumpDelayParser inconnu: Mauvaise liste de paramètres pour jump';
    }

    const elements = this.getElementsFromElementInflict(skill);
    const attackType = this.getAttackAndDamageWordingForPhysicalDamages(skill.attack_type);
    skill.physique = true;
    const power = effect[3][4];
    const turnDelay1 = effect[3][2];
    const turnDelay2 = effect[3][3];
    const target = this.getTargetForDamagingSkill(effect[0], effect[1]);
    return attackType + (elements ? 'de ' + elements + ' ' : 'neutres ')
      + 'de puissance ' + power + '% avec délai de saut de ' + (turnDelay1 === turnDelay2 ? turnDelay1 : 'UNKNOWN')
      + ' tour' + (turnDelay1 > 1 ? 's' : '') + ' ' + target;
  }
}
