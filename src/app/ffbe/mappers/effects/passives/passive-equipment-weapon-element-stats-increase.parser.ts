import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveEquipmentWeaponElementStatsIncreaseParser extends EffectParser {

  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 7) {
      return 'Effet PassiveEquipmentWeaponElementStatsIncreaseParser inconnu: Mauvaise liste de paramètres';
    }

    const increases = [
      {name: 'PV', value: effect[3][1]},
      {name: 'PM', value: effect[3][2]},
      {name: 'ATT', value: effect[3][3]},
      {name: 'DÉF', value: effect[3][4]},
      {name: 'MAG', value: effect[3][5]},
      {name: 'PSY', value: effect[3][6]},
    ];

    return this.wordEffectJoiningIdenticalValues(increases)
      + ' si l\'unité porte une arme d\'élément ' + this.getElementFromId(effect[3][0]);
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    return '+' + currentValue + '% ' + accumulatedStats.join('/');
  }
}