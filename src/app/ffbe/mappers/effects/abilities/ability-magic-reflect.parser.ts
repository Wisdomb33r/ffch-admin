import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {TargetPrepositionEnum} from '../../../model/effects/target-preposition.enum';

export class AbilityMagicReflectParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 3 || effect[3][0] !== 100) {
      return 'Effet AbilityMagicReflectParser inconnu: Mauvaise liste de paramètres';
    }

    let target = this.getTarget(effect[0], effect[1], TargetPrepositionEnum.None);
    if (skill.isActivatedByPassiveSkill && effect[0] === 1 && effect[1] === 2) {
      target = this.getTarget(0, 3, TargetPrepositionEnum.None);
    }
    const numReflect = effect[3][1];
    const numTurns = effect[3][2];

    const pluralFormReflects = numReflect > 1 ? 's' : '';
    const pluralFormTurns = numTurns > 1 ? 's' : '';

    let numReflectText = `de ${numReflect} sort${pluralFormReflects} de magie`;
    if (numReflect < 0) {
      numReflectText = 'des sorts de magie';
    }

    const numTurnsText = numTurns > 0 ? ` pour ${numTurns} tour${pluralFormTurns}` : '';

    return `Active le renvoi ${numReflectText} sur ${target}${numTurnsText}`;
  }
}
