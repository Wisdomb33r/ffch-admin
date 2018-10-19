import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {Skill} from '../model/skill.model';
import {Competence} from '../model/competence.model';
import {isNullOrUndefined} from 'util';

export class SkillMapper {

  public static toCompetence(skill: Skill): Competence {
    return new Competence(
      skill.gumi_id,
      SkillMapper.determineCategorieCompetence(skill),
      SkillMapper.transformIcon(skill.icon),
      skill.strings.name[FFBE_FRENCH_TABLE_INDEX],
      skill.strings.name[FFBE_ENGLISH_TABLE_INDEX],
      skill.strings.desc_short[FFBE_FRENCH_TABLE_INDEX],
      skill.strings.desc_short[FFBE_ENGLISH_TABLE_INDEX],
      null,
      skill.effects.length > 0 ? skill.effects.join('<br />') : null,
      null,
      skill.cost.MP === 0 ? null : skill.cost.MP,
      skill.cost.LB === 0 ? null : skill.cost.LB,
      skill.cost.EP === 0 ? null : skill.cost.EP,
      skill.attack_count.length > 0 && skill.attack_count[0] > 0 ? skill.attack_count[0] : null,
      skill.attack_frames.length > 0 ? skill.attack_frames[0].join(' ') : null,
      skill.attack_damage.length > 0 ? skill.attack_damage[0].join(' ') : null
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
        const pointSplitted = underscoreSplitted[underscoreSplitted.length-1].split('.');
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
