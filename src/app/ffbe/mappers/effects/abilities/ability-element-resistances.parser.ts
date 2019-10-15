import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityElementResistancesParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 10 || effect[3][8] !== 1) {
      return 'Effet AbilityElementResistancesParser inconnu: Mauvaise liste de paramètres';
    }
    const increases = [
      {name: 'Feu', value: effect[3][0]},
      {name: 'Glace', value: effect[3][1]},
      {name: 'Foudre', value: effect[3][2]},
      {name: 'Eau', value: effect[3][3]},
      {name: 'Vent', value: effect[3][4]},
      {name: 'Terre', value: effect[3][5]},
      {name: 'Lumière', value: effect[3][6]},
      {name: 'Ténèbres', value: effect[3][7]},
    ];

    if (increases.every(element => element.value === 0)) {
      return '';
    }

    const statModifier = this.wordEffectJoiningIdenticalValues(increases);
    const target = this.getTarget(effect[0], effect[1]);
    const turns = (effect[3][9] >= 0) ? ' pour ' + effect[3][9] + ' tours' : ' pour ce combat';

    let dispellable = '';
    if (effect[3].length >= 7 && effect[3][6] === 1) {
      dispellable = ' (bonus non-dissipable)';
    }

    return statModifier + ' ' + target + turns + dispellable;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    const sign = currentValue >= 0 ? '+' : '';
    if (accumulatedStats.length === 8) {
      return '+' + currentValue + '% de rés. aux éléments';
    }
    return sign + currentValue + '% de rés. ' + accumulatedStats.join(', ');
  }
}
