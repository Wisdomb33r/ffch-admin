import {CharacterEntry} from '../model/character-entry.model';
import {Unite} from '../model/unite.model';
import {Personnage} from '../model/personnage.model';
import {CharacterEntryStatsMapper} from './character-entry-stats.mapper';
import {LimitBurst} from '../model/limit-burst.model';
import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {AwakeningMaterialsMapper} from './awakening-materials-mapper';
import {Skill} from '../model/skill.model';
import {SkillEffectsMapper} from './effects/skill-effects.mapper';
import {FfbeUtils} from '../utils/ffbe-utils';

export class CharacterEntryMapper {

  public static toUnite(entry: CharacterEntry, gumi_id: number, perso: Personnage): Unite {
    const unite = new Unite(
      CharacterEntryMapper.convertCompendiumId(entry, perso),
      CharacterEntryMapper.convertRarity(entry, perso),
      entry.limitburst_id,
      gumi_id
    );
    unite.carac = CharacterEntryStatsMapper.toUniteCarac(entry.stats, unite, entry.character_entry_skills);
    CharacterEntryMapper.convertLimitBurst(unite, entry.lb);
    CharacterEntryMapper.convertUpgradedLimitBurst(unite, entry.upgraded_lb);
    CharacterEntryMapper.convertAwakeningMaterials(unite, entry.awakening);
    return unite;
  }

  public static toUniteArray(entries: any, perso: Personnage): Array<Unite> {
    const unites: Array<Unite> = [];
    if (entries) {
      const entryNames: string[] = Object.getOwnPropertyNames(entries);
      for (const entryName of entryNames) {
        unites.push(CharacterEntryMapper.toUnite(entries[entryName], +entryName, perso));
      }
    }
    return unites;
  }

  private static convertCompendiumId(entry: CharacterEntry, perso: Personnage): number {
    let compendiumId = entry.compendium_id;
    if (CharacterEntryMapper.isBraveShiftUnit(entry, perso)) {
      compendiumId += 1000000;
    }
    return compendiumId;
  }

  private static convertRarity(entry: CharacterEntry, perso: Personnage): number {
    let rarity = entry.rarity;
    if (CharacterEntryMapper.isNeoVisionUnit(entry, perso)) {
      rarity = 8;
    } else if (CharacterEntryMapper.isBraveShiftUnit(entry, perso)) {
      rarity = 81;
    }
    return rarity;
  }

  private static isNeoVisionUnit(entry: CharacterEntry, perso: Personnage): boolean {
    return perso.max_rank === 7 && !FfbeUtils.isNullOrUndefined(entry.nv_upgrade);
  }

  private static isBraveShiftUnit(entry: CharacterEntry, perso: Personnage): boolean {
    return perso.min_rank === 7 && perso.max_rank === 7 && FfbeUtils.isNullOrUndefined(entry.nv_upgrade);
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

  private static convertAwakeningMaterials(unite: Unite, awakening: any) {
    if (awakening && awakening.materials) {

      const formule = AwakeningMaterialsMapper.toFormule(awakening);

      if (formule.ingredients.length > 0) {
        unite.materiauxEveil = formule;
      }
    }
  }
}
