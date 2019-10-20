import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilitySingleAllyCoversParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 4 || effect[3][2] !== 100) {
      return 'Effet AbilitySingleAllyCoversParser inconnu: Mauvaise liste de paramètres';
    }

    const numTurns = effect[3][3];
    const pluralForm = numTurns > 1 ? 's' : '';
    const turns = ` pour ${numTurns} tour${pluralForm}`;

    const target = this.getTarget(effect[0], effect[1], 'TargetWithPreposition.None');

    const chances = 100;

    const mitigationMin = effect[3][0];
    const mitigationMax = effect[3][1];

    const mitigation = mitigationMin + (mitigationMax > mitigationMin ? '% à ' + mitigationMax + '%' : '%');

    return `${chances}% de chance de protéger ${target} de tous les dégâts avec mitigation de ${mitigation} des dégâts reçus${turns}`;
  }
}
