import {FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {Game} from '../model/game.model';
import {Character} from '../model/character.model';
import {Personnage} from '../model/personnage.model';
import {CharacterEntryMapper} from './character-entry-mapper';
import {FfbeUtils} from '../utils/ffbe-utils';
import {Competence} from '../model/competence.model';
import {Equipment} from '../model/equipment.model';
import {SkillMapper} from './skill-mapper';
import {UniteCompetence} from '../model/unite-competence.model';

export class CharacterMapper {

  public static toPersonnage(character: Character): Personnage {
    const game: Game = FfbeUtils.findGameByGumiId(character.game_id);
    const equipments: Array<Equipment> = FfbeUtils.findEquipmentsByGumiIds(character.equip);
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
    perso.unites = CharacterEntryMapper.toUniteArray(character.entries, perso);
    character.skills.forEach(characterSkill => {
      const competence: Competence = SkillMapper.toCompetence(characterSkill.skill);
      perso.unites
        .filter(unite => unite.stars >= characterSkill.rarity)
        .forEach(unite => unite.competences.push(
          new UniteCompetence(
            competence,
            unite.stars > characterSkill.rarity ? 1 : characterSkill.level
          )
        ));
    });
    return perso;
  }

}
