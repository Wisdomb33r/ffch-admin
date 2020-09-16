import {CharacterEntry} from '../model/character/character-entry.model';
import {Unite} from '../model/unite.model';
import {CharacterEntryStatsMapper} from './character-entry-stats.mapper';
import {LimitBurst} from '../model/limit-burst.model';
import {
  FFBE_ENGLISH_TABLE_INDEX,
  FFBE_FRENCH_TABLE_INDEX,
  FFBE_UNITE_BRAVE_SHIFT_RANK,
  FFBE_UNITE_NEO_VISION_RANK
} from '../ffbe.constants';
import {AwakeningMaterialsMapper} from './awakening-materials-mapper';
import {Skill} from '../model/skill.model';
import {SkillEffectsMapper} from './effects/skill-effects.mapper';
import {FfbeUtils} from '../utils/ffbe-utils';
import {Competence} from '../model/competence.model';
import {CharacterSkill} from '../model/character/character-skill.model';
import {UniteCompetence} from '../model/unite-competence.model';
import {Character} from '../model/character/character.model';
import {SkillMapper} from './skill-mapper';

export class CharacterEntryMapper {

  public static toUnite(entry: CharacterEntry, gumiId: number, character: Character): Unite {
    const unite = new Unite(
      CharacterEntryMapper.convertCompendiumId(entry, character),
      CharacterEntryMapper.convertRarity(entry, character),
      entry.limitburst_id,
      gumiId
    );
    unite.carac = CharacterEntryStatsMapper.toUniteCarac(entry.stats, unite, entry.characterEntrySkills);
    CharacterEntryMapper.convertLimitBurst(unite, entry.lb);
    CharacterEntryMapper.convertUpgradedLimitBurst(unite, entry.upgraded_lb);
    CharacterEntryMapper.convertAwakeningMaterials(unite, entry);
    CharacterEntryMapper.convertUniteCompetences(unite, character, entry);
    return unite;
  }

  public static toUniteArray(entries: any, character: Character): Array<Unite> {
    const unites: Array<Unite> = [];
    if (entries) {
      const entryNames: string[] = Object.getOwnPropertyNames(entries);
      for (const entryName of entryNames) {
        unites.push(CharacterEntryMapper.toUnite(entries[entryName], +entryName, character));
      }
    }
    return unites;
  }

  private static convertCompendiumId(entry: CharacterEntry, character: Character): number {
    let compendiumId = entry.compendium_id;
    if (CharacterEntryMapper.isBraveShiftUnit(entry, character)) {
      compendiumId += 1000000;
    }
    return compendiumId;
  }

  private static convertRarity(entry: CharacterEntry, character: Character): number {
    let rarity = entry.rarity;
    if (CharacterEntryMapper.isNeoVisionUnit(entry, character)) {
      rarity = FFBE_UNITE_NEO_VISION_RANK;
    } else if (CharacterEntryMapper.isBraveShiftUnit(entry, character)) {
      rarity = FFBE_UNITE_BRAVE_SHIFT_RANK;
    }
    return rarity;
  }

  private static isNeoVisionUnit(entry: CharacterEntry, character: Character): boolean {
    return character.rarity_max === 7 && !FfbeUtils.isNullOrUndefined(entry.nv_upgrade);
  }

  private static isBraveShiftUnit(entry: CharacterEntry, character: Character): boolean {
    return character.rarity_min === 7 && character.rarity_max === 7 && FfbeUtils.isNullOrUndefined(entry.nv_upgrade);
  }

  private static convertLimitBurst(unite: Unite, lb: LimitBurst) {
    if (lb) {
      unite.limite = lb.names[FFBE_FRENCH_TABLE_INDEX];
      unite.limite_en = lb.names[FFBE_ENGLISH_TABLE_INDEX];
      unite.lim_desc = lb.descriptions[FFBE_FRENCH_TABLE_INDEX];
      unite.lim_desc_en = lb.descriptions[FFBE_ENGLISH_TABLE_INDEX];
      unite.lim_effect_min = lb.min_level.length > 0 ? lb.min_level.join('<br />') : null;
      unite.lim_effect_max = lb.max_level.length > 0 ? lb.max_level.join('<br />') : null;
      unite.lim_min = CharacterEntryMapper.parseLimitBurstEffect(lb, 0);
      unite.lim_max = CharacterEntryMapper.parseLimitBurstEffect(lb, lb.levels.length - 1);
      unite.lim_hits = lb.attack_count.length > 0 ? lb.attack_count[0] : null;
      unite.lim_frames = lb.attack_frames.length > 0 ? lb.attack_frames[0].join(' ') : null;
      unite.lim_damages = lb.attack_damage.length > 0 ? lb.attack_damage[0].join(' ') : null;
      unite.lim_cristals_niv_min = lb.levels.length > 0 && lb.levels[0].length > 0 ? lb.levels[0][0] : null;
      unite.lim_cristals_niv_max = lb.levels.length > 0 && lb.levels[lb.levels.length - 1].length > 0 ? lb.levels[lb.levels.length - 1][0] : null;
      unite.lim_nb_niv = lb.levels.length;
    }
  }

  private static convertUpgradedLimitBurst(unite: Unite, upgradedLb: LimitBurst) {
    if (upgradedLb) {
      unite.lim_up_min = CharacterEntryMapper.parseLimitBurstEffect(upgradedLb, 0);
      unite.lim_up_max = CharacterEntryMapper.parseLimitBurstEffect(upgradedLb, upgradedLb.levels.length - 1);
    }
  }

  private static parseLimitBurstEffect(lb: LimitBurst, limitBurstIndex: number): string {
    let limitBurstEffect: string = null;

    if (lb.levels.length > limitBurstIndex && lb.levels[limitBurstIndex].length > 1) {
      const rawEffect = lb.levels[limitBurstIndex][1];
      const fakeMinLevelSkill = new Skill();
      fakeMinLevelSkill.effects_raw = rawEffect;
      fakeMinLevelSkill.active = true;
      fakeMinLevelSkill.element_inflict = lb.element_inflict;
      fakeMinLevelSkill.attack_type = lb.damage_type;
      limitBurstEffect = SkillEffectsMapper.mapAbilitySkillEffects(fakeMinLevelSkill);
    }

    return limitBurstEffect;
  }

  private static convertAwakeningMaterials(unite: Unite, entry: CharacterEntry) {
    if (entry.awakening?.materials) {
      unite.materiauxEveil = AwakeningMaterialsMapper.toFormule(entry.awakening);
    } else if (entry.nv_upgrade?.length) {
      unite.materiauxEveil = AwakeningMaterialsMapper.toFormule(entry.nv_upgrade[0]);
    }
  }

  private static convertUniteCompetences(unite: Unite, character: Character, entry: CharacterEntry) {
    unite.competences = [];
    entry.characterEntrySkills.forEach(characterSkill => {
      const competence: Competence = SkillMapper.toCompetence(Skill.produce(characterSkill.skill));
      const characterSkillRarity = CharacterEntryMapper.computeCharacterSkillRarity(characterSkill);
      const niveau = (unite.stars > characterSkillRarity && Object.getOwnPropertyNames(character.entries).length > 1) ? 1 : characterSkill.level;
      unite.competences.push(new UniteCompetence(competence, niveau));
    });
  }

  public static computeCharacterSkillRarity(characterSkill: CharacterSkill): number {
    let rarity = characterSkill.rarity;
    if (!FfbeUtils.isNullOrUndefined(characterSkill.brave_ability)) {
      rarity += characterSkill.brave_ability;
    }
    return rarity;
  }
}
