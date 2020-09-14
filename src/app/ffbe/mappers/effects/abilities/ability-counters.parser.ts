import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityCountersParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 5) {
      return 'Effet AbilityCountersParser inconnu: Mauvaise liste de paramètres';
    }

    const activationChance = effect[3][0];
    const calculationStat = effect[3][1];
    const statText = calculationStat === 1 ? '' : `calculée sur la ${EffectParser.getStatNameFromId(calculationStat)} `;
    const power = effect[3][2];
    const duration = effect[3][3];
    const pluralForm = duration > 1 ? 's' : '';
    const durationText = `pour ${duration} tour${pluralForm}`;
    let maxActivation = effect[3][5];
    if (maxActivation === undefined && effect[2] === 123) {
      maxActivation = 1;
    }
    const maxActivationText = maxActivation > 0 ? ` (max ${maxActivation} par tour)` : '';

    let activationTarget = '';
    if (effect[2] === 123) {
      activationTarget = 'encaissés par les autres alliés ';
    }

    const baseText = `pour le lanceur de contrer les dégâts physiques ${activationTarget}par une attaque`;
    return `${activationChance}% de chance ${baseText} de puissance ${power}% ${statText}${durationText}${maxActivationText}`;
  }

}
