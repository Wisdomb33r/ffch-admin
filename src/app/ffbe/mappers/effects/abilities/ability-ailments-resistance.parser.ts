import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityAilmentsResistanceParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 8) {
      return 'Effet AbilityAilmentsResistanceParser inconnu: Mauvaise liste de paramètres';
    }
    // TODO all values equal to 0
    // TODO What if effect[3][8] !== 1 ?

    const statModifier = this.wordEffectJoiningIdenticalValues(this.getKeyValueTableForAilements(effect[3]));

    const target = this.getTarget(effect[0], effect[1]);

    const pluralForm = (effect[3][9] > 1) ? 's' : '';
    const turns = ` pour ${effect[3][9]} tour${pluralForm}`;

    return `${statModifier} ${target}${turns}`;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    const sign = currentValue >= 0 ? '+' : '';
    if (accumulatedStats.length === 8) {
      return '+' + currentValue + '% de rés. aux altérations';
    }
    return sign + currentValue + '% de rés. ' + accumulatedStats.join(', ');
  }
}
