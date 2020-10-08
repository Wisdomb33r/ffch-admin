import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityAilmentsInflictionParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 8) {
      return 'Effet AbilityAilmentsInflictionParser inconnu: Mauvaise liste de paramètres';
    }
    // TODO all values equal to 0
    // TODO What if effect[3][8] !== 1 ?

    const statModifier = this.wordEffectJoiningIdenticalValues(EffectParser.getKeyValueTableForAilements(effect[3]));

    const target = this.getTarget(effect[0], effect[1]);

    return `Inflige ${statModifier} ${target}`;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    let alterations = `${accumulatedStats.join(', ')} (${currentValue}%)`;
    if (accumulatedStats.length === 8) {
      alterations = `toutes les altérations (${currentValue}% pour chacune)`;
    }
    return alterations;
  }
}
