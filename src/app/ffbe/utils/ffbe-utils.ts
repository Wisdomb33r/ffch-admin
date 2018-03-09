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

  public static checkIfStringsDifferent(s1: string, s2: string) {
    if (isNullOrUndefined(s1) && !isNullOrUndefined(s2) && s2.length > 0) {
      return true;
    }
    if (!isNullOrUndefined(s1) && s1.length > 0 && isNullOrUndefined(s2)) {
      return true;
    }
    // Do NOT change this equality check for !==
    // for some unknown reason the PHP JSON encode can sometimes send string values as real numbers if the string represents a numerica value, even if the database type is string...
    return s1 != s2;
  }

  public static checkIfNumbersDifferent(n1: number, n2: number) {
    if (isNullOrUndefined(n1) && !isNullOrUndefined(n2) && n2 > 0) {
      return true;
    }
    if (!isNullOrUndefined(n1) && n1 > 0 && isNullOrUndefined(n2)) {
      return true;
    }
    return n1 !== n2;
  }
}
