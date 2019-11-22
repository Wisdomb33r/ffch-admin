import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityMagicReflectParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 3 || effect[3][0] !== 100) {
      return 'Effet AbilityMagicReflectParser inconnu: Mauvaise liste de paramètres';
    }

    const target = this.getTarget(effect[0], effect[1], 'TargetWithPreposition.None');
    const numReflect = effect[3][1];
    const numTurns = effect[3][2];

    const pluralFormReflects = numReflect > 1 ? 's' : '';
    const pluralFormTurns = numTurns > 1 ? 's' : '';

    return `Active le renvoi de ${numReflect} sort${pluralFormReflects} de magie sur ${target} pour ${numTurns} tour${pluralFormTurns}`;
  }
}
