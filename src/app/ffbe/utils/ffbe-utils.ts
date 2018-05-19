import {FFBE_GAMES, FFBE_EQUIPMENTS} from '../ffbe.constants';
import {Game} from '../model/game.model';
import {Equipment} from '../model/equipment.model';
import {UniteMateriauEveil} from '../model/unite-materiau-eveil.model';
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

  public static findEquipmentByFfchId(equipment_ffch_id: number): Equipment {
    return FFBE_EQUIPMENTS.find(equipment => equipment.ffchId === equipment_ffch_id);
  }

  public static findEquipmentsByFfchIds(equipment_ffch_ids: Array<number>): Array<Equipment> {
    return equipment_ffch_ids.map(id => FfbeUtils.findEquipmentByFfchId(id))
      .sort((equipment1, equipment2) => equipment1.gumiId - equipment2.gumiId);
  }

  public static sortArrayMateriauxEveil(materiauxEveil: Array<UniteMateriauEveil>) {
    if (Array.isArray(materiauxEveil) && materiauxEveil.length > 0) {
      materiauxEveil.sort((materiau1, materiau2) => {
        return (materiau1.quantite != materiau2.quantite) ? (materiau2.quantite - materiau1.quantite) : (+materiau1.gumi_id - +materiau2.gumi_id);
      })
    }
  }

  public static checkIfStringsDifferent(s1: string, s2: string) {
    if (s1 && s2) {
      return ('' + s1) !== ('' + s2);
    }
    if ((s1 && !s2) || (!s1 && s2)) {
      return true;
    }
    return false;
  }

  public static checkIfNumbersDifferent(n1: number, n2: number) {
    if (n1 && n2) {
      return +n1 !== +n2;
    }
    if ((n1 && !n2) || (!n1 && n2)) {
      return true;
    }
    return false;
  }
}
