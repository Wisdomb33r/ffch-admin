import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveAilmentsResistanceParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 8) {
      return 'Effet PassiveAilmentsResistanceParser inconnu: Mauvaise liste de paramètres';
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
    // TODO crit
    return this.wordEffectJoiningIdenticalValues(increases);
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    if (accumulatedStats.length === 8) {
      return '+' + currentValue + '% de résistance à toutes les altérations';
    }
    return '+' + currentValue + '% de résistance à ' + accumulatedStats.join(', ');
  }
}
