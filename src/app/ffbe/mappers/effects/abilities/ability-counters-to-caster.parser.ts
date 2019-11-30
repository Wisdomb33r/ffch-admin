import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityCountersToCasterParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 5) {
      return 'Effet AbilityCountersToCasterParser inconnu: Mauvaise liste de paramètres';
    }

    const activationChance = effect[3][0];
    const calculationStat = effect[3][1];
    const statText = calculationStat === 1 ? '' : `calculée sur la ${this.getStatNameFromId(calculationStat)} `;
    const power = effect[3][2];
    const duration = effect[3][3];
    const pluralForm = duration > 1 ? 's' : '';
    const durationText = `pour ${duration} tour${pluralForm}`;
    let maxActivation = effect[3][5];
    if (maxActivation === undefined) {
      maxActivation = 0;
    }
    const maxActivationText = maxActivation > 0 ? ` (max ${maxActivation} par tour)` : '';
    // TODO eEnigma and wiki parsers both have "allies but target" for all 123 effects, even if there is 0/3 and 2/2 target configurations
    // IG tests are necessary to check if this effect is always to the rest of the party except caster or if there is subtle differences
    const target = `pour ${this.getTarget(effect[0], effect[1], 'TargetWithPreposition.None')}`;

    return `${activationChance}% de chance ${target} de contrer les dégâts physiques par une attaque de puissance ${power}% ${statText}${durationText}${maxActivationText}`;
  }

}
