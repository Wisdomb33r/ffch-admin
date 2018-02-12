import {FFBE_GAMES} from '../ffbe.constants';
import {Game} from '../model/game.model';

export class FfbeUtils {
  public static findGameByGumiId(game_id: number): Game {
    return FFBE_GAMES.find(game => game.gumiId === game_id);
  }
}
