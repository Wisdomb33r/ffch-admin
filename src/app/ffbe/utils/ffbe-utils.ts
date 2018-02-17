import {FFBE_GAMES, FFBE_EQUIPMENTS} from '../ffbe.constants';
import {Game} from '../model/game.model';
import {Equipment} from '../model/equipment.model';

export class FfbeUtils {
  public static findGameByGumiId(game_id: number): Game {
    return FFBE_GAMES.find(game => game.gumiId === game_id);
  }

  public static findEquipmentByGumiId(equipment_id: number): Equipment {
    return FFBE_EQUIPMENTS.find(equipment => equipment.gumiId === equipment_id);
  }

  public static findEquipmentsByGumiIds(equipment_ids: Array<number>) : Array<Equipment> {
    let equipments = new Array<Equipment>();
    equipment_ids.forEach(function(id: number) {
      equipments.push(FfbeUtils.findEquipmentByGumiId(id));
    });
    return equipments;
  }
}
