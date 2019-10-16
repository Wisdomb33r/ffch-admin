import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityAilmentsInflictionParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 8) {
      return 'Effet AbilityAilmentsInflictionParser inconnu: Mauvaise liste de paramètres';
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
    // TODO all values equal to 0
    // TODO What if effect[3][8] !== 1 ?

    const statModifier = this.wordEffectJoiningIdenticalValues(increases);

    const target = this.getTarget(effect[0], effect[1]);

    return `Inflige ${statModifier} ${target}`;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    let alterations = accumulatedStats.join(', ') + ' (' + currentValue + '%)';
    if (accumulatedStats.length === 8) {
      alterations =  'toutes les altérations (' + currentValue + '% pour chacune)';
    }
    return alterations;
  }
}
