import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityAilmentsResistanceParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 8) {
      return 'Effet AbilityAilmentsResistanceParser inconnu: Mauvaise liste de paramètres';
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

    const target = this.getTarget(effect[0], effect[1], effect[2]);

    const turns = (effect[3][9] >= 0) ? ' pour ' + effect[3][9] + ' tours' : ' pour ce combat';

    return statModifier + target + turns;
  }

  protected getTarget(effectId1: number, effectId2: number, effectId3: number): string {
    let target = ' à UNKNOWN';

    if (effectId1 === 0 && effectId2 === 3 && effectId3 === 7) {
      target = ' au lanceur';
    } else if (effectId1 === 1 && effectId2 === 2 && effectId3 === 7) {
      target = ' à un allié';
    } else if (effectId1 === 2 && effectId2 === 2 && effectId3 === 7) {
      target = ' aux alliés';
    }

    return target;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    const sign = currentValue >= 0 ? '+' : '';
    if (accumulatedStats.length === 8) {
      return '+' + currentValue + '% de rés. aux altérations';
    }
    return sign + currentValue + '% de rés. ' + accumulatedStats.join(', ');
  }
}
