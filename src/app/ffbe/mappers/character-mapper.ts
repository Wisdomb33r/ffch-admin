import {FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {Game} from '../model/game.model';
import {Character} from '../model/character.model';
import {Personnage} from '../model/personnage.model';
import {CharacterEntryMapper} from './character-entry-mapper';
import {FfbeUtils} from '../utils/ffbe-utils';
import {Competence} from '../model/competence.model';
import {Equipment} from '../model/equipment.model';

export class CharacterMapper {

  public static toPersonnage(character: Character, competences: Array<Competence>, gumi_id: number): Personnage {
    const game: Game = FfbeUtils.findGameByGumiId(character.game_id);
    const equipments: Array<Equipment> = FfbeUtils.findEquipmentsByGumiIds(character.equip);
    let perso = new Personnage(
      game, character.job, character.name, character.names[FFBE_FRENCH_TABLE_INDEX], character.rarity_min, character.rarity_max, gumi_id, equipments
    );
    perso.unites = CharacterEntryMapper.toUniteArray(character.entries, perso);
    character.skills.forEach(skill => {
      perso.unites
        .filter(unite => unite.stars >= skill.rarity)
        .forEach(unite => {
          const competence: Competence = competences.find(competence => competence.gumi_id == skill.id);
          if (competence) {
            unite.competences.push(competence);
          }
        });
    });
    return perso;
  }

}
