import {
  FFBE_BASE_CHARACTER_ENTRY_STATS_TABLE_INDEX,
  FFBE_POT_CHARACTER_ENTRY_STATS_TABLE_INDEX,
  FFBE_CHARACTER_MAX_LEVEL
} from '../ffbe.constants';
import {CharacterEntryStats} from '../model/character-entry-stats.model';
import {UniteCarac} from '../model/unite-carac.model';
import {Unite} from '../model/unite.model';
import {Caracteristiques} from '../model/caracteristiques.model';
import {Skill} from '../model/skill.model';

export class CharacterEntryStatsMapper {

  public static toUniteCarac(stats: CharacterEntryStats, unite: Unite, characterEntrySkills: Array<Skill>): UniteCarac {
    return new UniteCarac(
      FFBE_CHARACTER_MAX_LEVEL[unite.stars],
      FFBE_CHARACTER_MAX_LEVEL[unite.stars],
      new Caracteristiques(
        stats.HP[FFBE_BASE_CHARACTER_ENTRY_STATS_TABLE_INDEX],
        stats.MP[FFBE_BASE_CHARACTER_ENTRY_STATS_TABLE_INDEX],
        stats.ATK[FFBE_BASE_CHARACTER_ENTRY_STATS_TABLE_INDEX],
        stats.DEF[FFBE_BASE_CHARACTER_ENTRY_STATS_TABLE_INDEX],
        stats.MAG[FFBE_BASE_CHARACTER_ENTRY_STATS_TABLE_INDEX],
        stats.SPR[FFBE_BASE_CHARACTER_ENTRY_STATS_TABLE_INDEX]),
      new Caracteristiques(
        stats.HP[FFBE_POT_CHARACTER_ENTRY_STATS_TABLE_INDEX],
        stats.MP[FFBE_POT_CHARACTER_ENTRY_STATS_TABLE_INDEX],
        stats.ATK[FFBE_POT_CHARACTER_ENTRY_STATS_TABLE_INDEX],
        stats.DEF[FFBE_POT_CHARACTER_ENTRY_STATS_TABLE_INDEX],
        stats.MAG[FFBE_POT_CHARACTER_ENTRY_STATS_TABLE_INDEX],
        stats.SPR[FFBE_POT_CHARACTER_ENTRY_STATS_TABLE_INDEX]),
      CharacterEntryStatsMapper.mapBonusBasePercent(characterEntrySkills)
    );
  }

  private static mapBonusBasePercent(characterEntrySkills: Array<Skill>): Caracteristiques {
    return Caracteristiques.computeSum(characterEntrySkills.map(skill => skill.calculateBaseIncreasesPercent()));
  }
}
