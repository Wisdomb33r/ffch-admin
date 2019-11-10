import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityMagicMultipleActivationParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || (effect[2] !== 97 && effect[0] !== 0)
      || (effect[2] !== 97 && effect[1] !== 3)) {
      return 'Effet AbilityMagicMultipleActivationParser inconnu: Mauvaise liste de paramètres';
    }

    if (effect[3].length === 1 && effect[3][0] === 'none') {
      let magicTypeText = '';
      if (effect[2] === 44) {
        magicTypeText = 'noire ';
      }
      return `Permet l'utilisation des sorts de magie ${magicTypeText}2x par tour`;
    }
    if (effect[3].length >= 3 && effect[3].length < 6 || effect[2] === 97) {
      const magicType = effect[3][0];
      const castNumber = effect[3][1];
      const magicTypeText = this.getMagicTypeFromId(magicType);
      let target = '';
      let turnsText = '';
      if (effect[2] === 97) {
        target = ` ${this.getTarget(effect[0], effect[1])}`;
        const nbTurns = skill.isActivatedByPassiveSkill || effect[1] !== 3 ? effect[3][3] : effect[3][3] - 1;
        turnsText = ` pour ${nbTurns} tour`;
        if (nbTurns > 1) {
          turnsText += 's';
        }
      }
      return `Permet${target} l'utilisation des sorts de magie ${magicTypeText}${castNumber}x par tour${turnsText}`;
    }
    if (effect[3].length === 6) {
      const magicType1 = effect[3][0];
      const magicTypeText1 = this.getMagicTypeFromId(magicType1);
      const magicType2 = effect[3][1];
      const magicTypeText2 = this.getMagicTypeFromId(magicType2);
      const castNumber1 = effect[3][2];
      const castNumber2 = effect[3][3];
      const castNumberText = castNumber1 === castNumber2 ? castNumber1 : 'UNKNOWN';
      return `Permet l'utilisation des sorts de magie ${magicTypeText1}et ${magicTypeText2}${castNumberText}x par tour`;
    }
    return 'Effet AbilityMagicMultipleActivationParser inconnu: Mauvaise liste de paramètres pour multi-cast magie';
  }
}
