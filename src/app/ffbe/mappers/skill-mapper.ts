import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {Skill} from '../model/skill.model';
import {Competence} from '../model/competence.model';
import {isNullOrUndefined} from 'util';
import {SkillEffectsMapper} from './effects/skill-effects.mapper';

export class SkillMapper {

  public static toCompetence(skill: Skill): Competence {
    let attackCount: number = skill.attack_count && skill.attack_count.length > 0 && skill.attack_count[0] > 0 ?
      skill.attack_count[0] : null;
    let attackFrames: string = skill.attack_frames && skill.attack_frames.length > 0 ? skill.attack_frames[0].join(' ') : null;
    let attackDamages: string = skill.attack_damage && skill.attack_damage.length > 0 ? skill.attack_damage[0].join(' ') : null;
    let frames = [];

    const effectsWithDamages = skill.effects_raw.filter((effect) => skill.isEffectWithDamage(effect));
    const multipleEffects = effectsWithDamages && effectsWithDamages.length > 1;

    effectsWithDamages.forEach((value, index) => {
      if (Array.isArray(skill.attack_frames) && skill.attack_frames.length > index) {
        frames = frames.concat(skill.attack_frames[index]);
      }
    });
    frames.sort((a, b) => {
      return a - b;
    });

    if (multipleEffects) {
      attackCount = Array.isArray(frames) && frames.length > 0 ? frames.length : null;
      attackFrames = Array.isArray(frames) && frames.length > 0 ? frames.join(' ') : null;
      attackDamages = Array.isArray(frames) && frames.length > 0 ? frames.map(frame => 0).join(' ') : null;
    }

    const parsedSkillEffects: string = SkillEffectsMapper.mapSkillEffects(skill);

    return new Competence(
      skill.gumi_id,
      SkillMapper.determineCategorieCompetence(skill),
      SkillMapper.transformIcon(skill.icon),
      skill.names[FFBE_FRENCH_TABLE_INDEX],
      skill.names[FFBE_ENGLISH_TABLE_INDEX],
      skill.descriptions[FFBE_FRENCH_TABLE_INDEX],
      skill.descriptions[FFBE_ENGLISH_TABLE_INDEX],
      null,
      skill.effects.length > 0 ? skill.effects.join('<br />') : null,
      parsedSkillEffects && parsedSkillEffects.length ? parsedSkillEffects : 'Aucun effet',
      null,
      !skill.cost || skill.cost.MP === 0 ? null : skill.cost.MP,
      !skill.cost || skill.cost.LB === 0 ? null : skill.cost.LB,
      !skill.cost || skill.cost.EP === 0 ? null : skill.cost.EP,
      attackCount,
      attackFrames,
      attackDamages
    );
  }

  public static mapCategorieToDamageType(competence: Competence) {
    if (competence.categorie === 2 || competence.categorie === 7) {
      competence.physique = '0';
      competence.magique = '1';
      competence.hybride = '0';
    }
    if (competence.categorie === 6) {
      competence.physique = '1';
      competence.magique = '0';
      competence.hybride = '0';
    }
    if (competence.categorie === 8) {
      competence.physique = '0';
      competence.magique = '0';
      competence.hybride = '1';
    }
  }

  public static mapUndefinedEnhanced(competence: Competence) {
    if (competence && isNullOrUndefined(competence.enhanced)) {
      competence.enhanced = false;
    }
  }

  private static transformIcon(icon: string): number {
    if (icon) {
      const underscoreSplitted = icon.split('_');
      if (Array.isArray(underscoreSplitted) && underscoreSplitted.length >= 2) {
        const pointSplitted = underscoreSplitted[underscoreSplitted.length - 1].split('.');
        if (Array.isArray(pointSplitted) && pointSplitted.length === 2) {
          return +(pointSplitted[0]);
        }
      }
    }
    return null;
  }

  private static determineCategorieCompetence(skill: Skill) {
    if (skill.type === 'MAGIC') {
      if (skill.magic_type === 'White') {
        return 1;
      }
      if (skill.magic_type === 'Black') {
        return 2;
      }
      if (skill.magic_type === 'Green') {
        return 3;
      }
    }
    if (skill.type === 'ABILITY') {
      if (!skill.active) {
        return 4;
      }
      if (Array.isArray(skill.attack_count) && skill.attack_count.length > 0 && skill.attack_count[0] > 0) {
        if (skill.attack_type === 'Physical') {
          return 6;
        }
        if (skill.attack_type === 'Magic') {
          return 7;
        }
        if (skill.attack_type === 'Hybrid') {
          return 8;
        }
      }
      return 5;
    }
    return undefined;
  }
}
