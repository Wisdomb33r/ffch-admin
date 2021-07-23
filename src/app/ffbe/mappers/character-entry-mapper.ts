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
import {NeoVisionUpgradeEntry} from '../model/character/neovision-upgrade-entry.model';
import {Caracteristiques} from '../model/caracteristiques.model';
import {UniteCarac} from '../model/unite-carac.model';
import {UniteCompetenceArray} from '../model/unite-competence-array.model';
import {classToClass} from 'class-transformer';

export class CharacterEntryMapper {

  public static toUnite(entry: CharacterEntry, gumiId: number, character: Character, competences: Array<Competence>): Unite {
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
    CharacterEntryMapper.convertUniteCompetences(unite, character, entry, competences);
    CharacterEntryMapper.convertEXCaracteristiques(unite, entry.nv_upgrade);
    return unite;
  }

  public static toUniteArray(entries: any, character: Character, competences: Array<Competence>): Array<Unite> {
    const unites: Array<Unite> = [];
    if (entries) {
      const entryNames: string[] = Object.getOwnPropertyNames(entries);
      for (const entryName of entryNames) {
        unites.push(CharacterEntryMapper.toUnite(entries[entryName], +entryName, character, competences));
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
      const minLevelFakeSkill: Skill = CharacterEntryMapper.createFakeSkillForLb(lb, 0);
      const maxLevelFakeSkill: Skill = CharacterEntryMapper.createFakeSkillForLb(lb, lb.levels.length - 1);
      unite.limite = lb.names[FFBE_FRENCH_TABLE_INDEX];
      unite.limite_en = lb.names[FFBE_ENGLISH_TABLE_INDEX];
      unite.lim_effect_min = lb.min_level.length > 0 ? lb.min_level.join('<br />') : null;
      unite.lim_effect_max = lb.max_level.length > 0 ? lb.max_level.join('<br />') : null;
      unite.lim_min = SkillEffectsMapper.mapAbilitySkillEffects(minLevelFakeSkill);
      unite.lim_max = SkillEffectsMapper.mapAbilitySkillEffects(maxLevelFakeSkill);
      const hitsFramesDamages = SkillMapper.mapHitsFramesAndDamages(minLevelFakeSkill);
      unite.lim_hits = hitsFramesDamages.hits;
      unite.lim_frames = hitsFramesDamages.frames;
      unite.lim_damages = hitsFramesDamages.damages;
      unite.lim_cristals_niv_min = lb.levels.length > 0 && lb.levels[0].length > 0 ? lb.levels[0][0] : null;
      unite.lim_cristals_niv_max = lb.levels.length > 0 && lb.levels[lb.levels.length - 1].length > 0 ? lb.levels[lb.levels.length - 1][0] : null;
      unite.lim_nb_niv = lb.levels.length;
    }
  }

  private static convertUpgradedLimitBurst(unite: Unite, upgradedLb: LimitBurst) {
    if (upgradedLb) {
      const minLevelFakeSkill: Skill = CharacterEntryMapper.createFakeSkillForLb(upgradedLb, 0);
      const maxLevelFakeSkill: Skill = CharacterEntryMapper.createFakeSkillForLb(upgradedLb, upgradedLb.levels.length - 1);
      unite.lim_up_min = SkillEffectsMapper.mapAbilitySkillEffects(minLevelFakeSkill);
      unite.lim_up_max = SkillEffectsMapper.mapAbilitySkillEffects(maxLevelFakeSkill);
    }
  }

  private static createFakeSkillForLb(lb: LimitBurst, limitBurstIndex: number): Skill {
    const rawEffect = lb.levels[limitBurstIndex][1];
    const fakeSkill = new Skill();
    fakeSkill.gumi_id = lb.gumi_id;
    fakeSkill.effects_raw = rawEffect;
    fakeSkill.active = true;
    fakeSkill.element_inflict = lb.element_inflict;
    fakeSkill.attack_type = lb.damage_type;
    fakeSkill.attack_count = lb.attack_count;
    fakeSkill.attack_damage = lb.attack_damage;
    fakeSkill.attack_frames = lb.attack_frames;
    return fakeSkill;
  }

  private static convertAwakeningMaterials(unite: Unite, entry: CharacterEntry) {
    if (entry.awakening?.materials) {
      unite.materiauxEveil = AwakeningMaterialsMapper.toFormule(entry.awakening);
    } else if (entry.nv_upgrade?.length) {
      unite.materiauxEveil = AwakeningMaterialsMapper.toFormule(entry.nv_upgrade[0]);
    }
  }

  private static convertUniteCompetences(unite: Unite, character: Character, entry: CharacterEntry, competences: Array<Competence>) {
    unite.competences = new UniteCompetenceArray();
    let currentActivatedSkillLevel = -200;
    entry.characterEntrySkills.forEach(characterSkill => {
      const skill: Skill = classToClass(characterSkill.skill).initializeSkillEffects();
      const competence = competences.find(c => c.gumi_id === characterSkill.id);
      const characterSkillRarity = CharacterEntryMapper.computeCharacterSkillRarity(characterSkill);
      let niveau = characterSkill.level;
      if (unite.stars > characterSkillRarity && Object.getOwnPropertyNames(character.entries).length > 1) {
        niveau = 1;
      }
      if (characterSkill.ex_level && characterSkill.ex_level > 0) {
        niveau = -(+`${characterSkill.ex_level}${characterSkill.ex_level}${characterSkill.ex_level}${characterSkill.ex_level}`);
      }
      unite.competences.push(new UniteCompetence(competence, niveau));
      skill.activatedSkills?.forEach(activatedSkill => {
        CharacterEntryMapper.searchTransitiveActivatedSkills(activatedSkill)?.forEach(transitiveActivatedSkill => {
          if (FfbeUtils.isNullOrUndefined(unite.competencesActivees)) {
            unite.competencesActivees = new UniteCompetenceArray();
          }
          if (!unite.competencesActivees.find(c => c.competence.gumi_id === transitiveActivatedSkill.gumi_id)) {
            const competenceActivee = CharacterEntryMapper.searchOrMapCompetence(transitiveActivatedSkill, competences);
            unite.competencesActivees.push(new UniteCompetence(competenceActivee, currentActivatedSkillLevel));
            currentActivatedSkillLevel += 2;
          }
        });
      });
    });
  }

  private static searchTransitiveActivatedSkills(skill: Skill): Array<Skill> {
    const skills: Array<Skill> = [skill];
    let skillNumber = -1;
    while (skillNumber < skills.length) {
      skillNumber = skills.length;
      for (let i = 0; i < skills.length; i++) {
        skills[i].activatedSkills.forEach(activated => {
          if (!skills.find(s => s.gumi_id === activated.gumi_id)) {
            skills.push(activated);
          }
        });
      }
    }
    return skills;
  }

  private static searchOrMapCompetence(skill: Skill, competences: Array<Competence>): Competence {
    let competence = competences.find(existingCompetence => existingCompetence.gumi_id === skill.gumi_id);
    if (FfbeUtils.isNullOrUndefined(competence)) {
      competence = SkillMapper.toCompetence(skill);
      competences.push(competence);
    }
    return competence;
  }

  public static computeCharacterSkillRarity(characterSkill: CharacterSkill): number {
    if (characterSkill.rarity === 'NV') {
      return 8;
    }
    return +characterSkill.rarity;
  }

  public static computeCharacterEntryRarity(entry: CharacterEntry): number {
    let rarity = entry.rarity;
    if (rarity === 7) {
      if (!FfbeUtils.isNullOrUndefined(entry.nv_upgrade)) {
        rarity = 8;
      } else if (!FfbeUtils.isNullOrUndefined(entry.brave_shift)) {
        rarity = 81;
      }
    }
    return rarity;
  }

  private static convertEXCaracteristiques(unite: Unite, nvUpgradeEntries: Array<NeoVisionUpgradeEntry>) {
    if (Array.isArray(nvUpgradeEntries) && nvUpgradeEntries.length > 0) {
      unite.caracEX = nvUpgradeEntries.map((nvUpgradeEntry, index) => {
        return new UniteCarac(
          unite.carac.level_max + index + 1,
          unite.carac.level_max,
          new Caracteristiques(
            nvUpgradeEntry.stats.HP,
            nvUpgradeEntry.stats.MP,
            nvUpgradeEntry.stats.ATK,
            nvUpgradeEntry.stats.DEF,
            nvUpgradeEntry.stats.MAG,
            nvUpgradeEntry.stats.SPR
          ),
          null,
          null,
          null,
          null,
          null
        );
      });
    }
  }
}
