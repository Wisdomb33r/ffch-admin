import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityAilmentsRandomInflictionParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 10) {
      return 'Effet AbilityAilmentsRandomInflictionParser inconnu: Mauvaise liste de paramètres';
    }
    const increases = [
      {name: 'Poison', value: effect[3][0]},
      {name: 'Cécité', value: effect[3][1]},
      {name: 'Sommeil', value: effect[3][2]},
      {name: 'Silence', value: effect[3][3]},
      {name: 'Paralysie', value: effect[3][4]},
      {name: 'Confusion', value: effect[3][5]},
      {name: 'Maladie', value: effect[3][6]},
      {name: 'Pétrification', value: effect[3][7]},
    ];
    const ailmentsNumber = effect[3][9];

    const statModifier = this.wordEffectJoiningIdenticalValues(increases);

    const target = this.getTarget(effect[0], effect[1]);
    const pluralForm = ailmentsNumber > 1 ? 's' : '';

    return `Inflige ${ailmentsNumber} altération${pluralForm} aléatoire${pluralForm} (${statModifier}) ${target}`;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    let alterations = `${currentValue}% ${accumulatedStats.join(', ')}`;
    if (accumulatedStats.length === 8) {
      alterations = `${currentValue}% chacune`;
    }
    return alterations;
  }
}
