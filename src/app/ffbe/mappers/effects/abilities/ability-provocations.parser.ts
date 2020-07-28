import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {TargetPrepositionEnum} from '../../../model/effects/target-preposition.enum';

export class AbilityProvocationsParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet AbilityProvocationsParser inconnu: Mauvaise liste de paramètres';
    }

    const percentsProvocation = effect[3][0];
    const numTurns = effect[3][1];

    const pluralFormTurns = numTurns > 1 ? 's' : '';

    const target = this.getTarget(effect[0], effect[1], TargetPrepositionEnum.None);

    return `+${percentsProvocation}% de chances pour ${target} d\'être ciblé pour ${numTurns} tour${pluralFormTurns}`;
  }
}
