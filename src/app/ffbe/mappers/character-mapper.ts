import {FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {Game} from '../model/game.model';
import {Character} from '../model/character.model';
import {Personnage} from '../model/personnage.model';
import {CharacterEntryMapper} from './character-entry-mapper';
import {FfbeUtils} from '../utils/ffbe-utils';
import {Competence} from '../model/competence.model';
import {CategorieObjet} from '../model/objet/categorie-objet.model';
import {SkillMapper} from './skill-mapper';
import {UniteCompetence} from '../model/unite-competence.model';
import {CharacterSkill} from '../model/character-skill.model';

export class CharacterMapper {

  public static toPersonnage(character: Character): Personnage {
    const game: Game = FfbeUtils.findGameByGumiId(character.game_id);
    const equipments: Array<CategorieObjet> = FfbeUtils.findObjetCategoriesByGumiIds(character.equip);
    const perso = new Personnage(
      game,
      character.job,
      character.name,
      character.names[FFBE_FRENCH_TABLE_INDEX],
      character.rarity_min,
      character.rarity_max,
      character.gumi_id,
      equipments
    );
    const competences = character.skills.map(characterSkill => SkillMapper.toCompetence(characterSkill.skill));
    perso.unites = CharacterEntryMapper.toUniteArray(character.entries, character, competences);
    return perso;
  }
}
