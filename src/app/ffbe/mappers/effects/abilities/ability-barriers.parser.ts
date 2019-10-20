import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityBarriersParser extends EffectParser {
  parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet AbilityBarriersParser inconnu: Mauvaise liste de paramètres';
    }

    const target = this.getTarget(effect[0], effect[1]);
    const numHP = effect[3][0];
    const numTurns = effect[3][1];

    const pluralForm = (numTurns > 1) ? 's' : '';

    return `+${numHP} PV en barrière ${target} pour ${numTurns} tour${pluralForm}`;
  }
}
