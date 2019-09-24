import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {Equipment} from '../../../model/equipment/equipment.model';
import {EquipmentsService} from '../../../services/equipments.service';

export class PassiveEquipmentStatsIncreaseParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 8) {
      return 'Effet PassiveSpecificItemStatsIncreaseParser inconnu: Mauvaise liste de paramètres';
    }
    const equipmentGumiId: number = effect[3][0];
    const increases = [
      {name: 'PV', value: effect[3][5]},
      {name: 'PM', value: effect[3][6]},
      {name: 'ATT', value: effect[3][1]},
      {name: 'DÉF', value: effect[3][2]},
      {name: 'MAG', value: effect[3][3]},
      {name: 'PSY', value: effect[3][4]},
    ];
    // TODO critical strikes
    const equipment: Equipment = EquipmentsService.getInstance().searchForEquipmentByGumiId(equipmentGumiId);
    return this.wordEffectJoiningIdenticalValues(increases)
      + ' si l\'unité porte ' + this.getEquipmentNameWithGumiIdentifierLink(equipment);
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    return '+' + currentValue + '% ' + accumulatedStats.join('/');
  }
}
