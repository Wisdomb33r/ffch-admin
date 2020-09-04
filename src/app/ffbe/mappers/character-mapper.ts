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
    perso.unites = CharacterEntryMapper.toUniteArray(character.entries, perso);
    character.skills.forEach(characterSkill => {
      const competence: Competence = SkillMapper.toCompetence(characterSkill.skill);
      const characterSkillRarity = CharacterMapper.computeCharacterSkillRarity(characterSkill)
      perso.unites
        .filter(unite => unite.stars >= characterSkillRarity)
        .forEach(unite => unite.competences.push(
          new UniteCompetence(
            competence,
            (unite.stars > characterSkillRarity && perso.unites.length > 1) ? 1 : characterSkill.level
          )
        ));
    });
    return perso;
  }

  public static computeCharacterSkillRarity(characterSkill: CharacterSkill): number {
    let rarity = characterSkill.rarity;
    if (!FfbeUtils.isNullOrUndefined(characterSkill.brave_ability)) {
      rarity += characterSkill.brave_ability;
    }
    return rarity;
  }
}
