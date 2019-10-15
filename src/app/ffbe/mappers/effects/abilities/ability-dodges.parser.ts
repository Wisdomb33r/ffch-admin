import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDodgesParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet AbilityDodgesParser inconnu: Mauvaise liste de paramètres';
    }

    const numDodges = effect[3][0];
    const numTurns = effect[3][1];

    const pluralFormDodges = numDodges > 1 ? 's' : '';
    const pluralFormTurns = numTurns > 1 ? 's' : '';

    const target = this.getTarget(effect[0], effect[1]);

    return '+' + numDodges + ' esquive' + pluralFormDodges + ' physique' + pluralFormDodges + ' '
      + target + ' pour ' + numTurns + ' tour' + pluralFormTurns;
  }
}
