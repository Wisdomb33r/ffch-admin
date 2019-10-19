import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityStopInflictionParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet AbilityStopInflictionParser inconnu: Mauvaise liste de paramètres';
    }

    const target = this.getTarget(effect[0], effect[1]);

    const chances = effect[3][0];
    const numTurns = effect[3][1];

    const pluralForm = effect[3][1] > 1 ? 's' : '';

    return `Inflige Stop (${chances}%) ${target} pour ${numTurns} tour${pluralForm}`;
  }

}
