import {
  FFBE_BASE_CHARACTER_ENTRY_STATS_TABLE_INDEX,
  FFBE_POT_CHARACTER_ENTRY_STATS_TABLE_INDEX,
  FFBE_CHARACTER_MAX_LEVEL, FFBE_UNITE_NEO_VISION_RANK
} from '../ffbe.constants';
import {CharacterEntryStats} from '../model/character-entry-stats.model';
import {UniteCarac} from '../model/unite-carac.model';
import {Unite} from '../model/unite.model';
import {Caracteristiques} from '../model/caracteristiques.model';
import {CharacterSkill} from '../model/character-skill.model';

export class CharacterEntryStatsMapper {

  public static toUniteCarac(stats: CharacterEntryStats, unite: Unite, characterEntrySkills: Array<CharacterSkill>): UniteCarac {
    return new UniteCarac(
      CharacterEntryStatsMapper.computeLevelMax(unite.stars),
      CharacterEntryStatsMapper.computeLevelMax(unite.stars),
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
      CharacterEntryStatsMapper.mapBonusBasePercent(characterEntrySkills),
      CharacterEntryStatsMapper.mapBonusDualwieldPercent(characterEntrySkills)
    );
  }

  private static mapBonusBasePercent(characterEntrySkills: Array<CharacterSkill>): Caracteristiques {
    return Caracteristiques.computeSum(characterEntrySkills.filter(characterSkill => !characterSkill.skill.hasEquipmentRequirements())
      .map(characterSkill => characterSkill.skill.calculateBaseIncreasesPercent()));
  }

  private static mapBonusDualwieldPercent(characterEntrySkills: Array<CharacterSkill>): Caracteristiques {
    return Caracteristiques.computeSum(characterEntrySkills.filter(characterSkill => !characterSkill.skill.hasEquipmentRequirements())
      .map(characterSkill => characterSkill.skill.calculateDualwieldIncreasesPercent()));
  }

  private static computeLevelMax(rank: number): number {
    return FFBE_CHARACTER_MAX_LEVEL[Math.min(rank, FFBE_UNITE_NEO_VISION_RANK)];
  }
}
