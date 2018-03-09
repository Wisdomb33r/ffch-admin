import {FFBE_GAMES, FFBE_EQUIPMENTS} from '../ffbe.constants';
import {Game} from '../model/game.model';
import {Equipment} from '../model/equipment.model';
import {isNullOrUndefined} from 'util';

export class FfbeUtils {
  public static findGameByGumiId(game_id: number): Game {
    const gameFound: Game = FFBE_GAMES.find(game => game.gumiId === game_id);
    return isNullOrUndefined(gameFound) ? new Game(game_id, undefined, 'Jeu inconnu') : gameFound;
  }

  public static findEquipmentByGumiId(equipment_id: number): Equipment {
    return FFBE_EQUIPMENTS.find(equipment => equipment.gumiId === equipment_id);
  }

  public static findEquipmentsByGumiIds(equipment_ids: Array<number>): Array<Equipment> {
    const equipments = new Array<Equipment>();
    equipment_ids.forEach(id => equipments.push(FfbeUtils.findEquipmentByGumiId(id)));
    return equipments;
  }
}
