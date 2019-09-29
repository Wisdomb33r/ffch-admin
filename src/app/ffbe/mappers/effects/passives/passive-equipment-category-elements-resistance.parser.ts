import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveEquipmentCategoryElementsResistanceParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 9) {
      return 'Effet PassiveEquipmentCategoryStatsIncreaseParser inconnu: Mauvaise liste de paramètres';
    }
    const equipmentGumiId = effect[3][0];
    const increases = [
      {name: 'Feu', value: effect[3][1]},
      {name: 'Glace', value: effect[3][2]},
      {name: 'Foudre', value: effect[3][3]},
      {name: 'Eau', value: effect[3][4]},
      {name: 'Vent', value: effect[3][5]},
      {name: 'Terre', value: effect[3][6]},
      {name: 'Lumière', value: effect[3][7]},
      {name: 'Ténèbres', value: effect[3][8]},
    ];
    return this.wordEffectJoiningIdenticalValues(increases)
      + ' si l\'unité porte ' + (this.isEquipmentCategoryFeminine(equipmentGumiId) ? 'une ' : 'un ')
      + this.getEquipmentCategoryTypeWithLink(equipmentGumiId);
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    if (accumulatedStats.length === 8) {
      return '+' + currentValue + '% de rés. aux éléments';
    }
    return '+' + currentValue + '% de rés. ' + accumulatedStats.join(', ');
  }
}
