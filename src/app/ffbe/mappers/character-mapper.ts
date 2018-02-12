import {FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {Game} from '../model/game.model';
import {Character} from '../model/character.model';
import {Personnage} from '../model/personnage.model';
import {FfbeUtils} from '../utils/ffbe-utils';

export class CharacterMapper {

  public static toPersonnage(character: Character, gumi_id: number): Personnage {
    const game: Game = FfbeUtils.findGameByGumiId(character.game_id);
    return new Personnage(
      game, character.job, character.name, character.names[FFBE_FRENCH_TABLE_INDEX], character.rarity_min, character.rarity_max, gumi_id
    );
  }

}
