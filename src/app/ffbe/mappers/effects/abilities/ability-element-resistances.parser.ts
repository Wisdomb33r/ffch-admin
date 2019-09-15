import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityElementResistancesParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 10) {
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
    // TODO What if effect[3][8] !== 1 ?

    if (increases.every(element => {
      return (element.value === 0);
    })) {
      return '';
    }

    const statModifier = this.wordEffectJoiningIdenticalValues(increases);

    const target = this.getTarget(effect[0], effect[1], effect[2]);

    const turns = (effect[3][9] >= 0) ? ' pour ' + effect[3][9] + ' tours' : ' pour ce combat';

    let dispellable = '';
    if (effect[3].length >= 7 && effect[3][6] === 1) {
      dispellable = ' (bonus non-dissipable)';
    }

    return statModifier + target + turns + dispellable;
  }

  protected getTarget(effectId1: number, effectId2: number, effectId3: number): String {
    let target = ' à UNKNOWN';

    if (effectId1 === 0 && effectId2 === 3 && effectId3 === 33) {
      target = ' du lanceur';
    } else if (effectId1 === 1 && effectId2 === 2 && effectId3 === 33) {
      target = ' d\'un allié';
    } else if (effectId1 === 2 && effectId2 === 2 && effectId3 === 33) {
      target = ' de tous les alliés';
    } else if (effectId1 === 1 && effectId2 === 1 && effectId3 === 33) {
      target = ' de l\'adversaire';
    } else if (effectId1 === 2 && effectId2 === 1 && effectId3 === 33) {
      target = ' de tous les adversaires';
    }

    return target;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    const sign = currentValue >= 0 ? '+' : '';
    if (accumulatedStats.length === 8) {
      return '+' + currentValue + '% à la résistance à tous les éléments';
    }
    return sign + currentValue + '% à la résistance ' + accumulatedStats.join('/');
  }
}