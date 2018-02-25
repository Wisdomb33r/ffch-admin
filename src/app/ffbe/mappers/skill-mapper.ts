import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {Skill} from '../model/skill.model';
import {Competence} from '../model/competence.model';

export class SkillMapper {

  public static toCompetence(skill: Skill): Competence {
    return new Competence(
      skill.gumi_id,
      SkillMapper.determineCategorieCompetence(skill),
      skill.strings.name[FFBE_FRENCH_TABLE_INDEX],
      skill.strings.name[FFBE_ENGLISH_TABLE_INDEX],
      skill.strings.desc_short[FFBE_FRENCH_TABLE_INDEX],
      skill.strings.desc_short[FFBE_ENGLISH_TABLE_INDEX],
      null,
      skill.effects.length > 0 ? skill.effects.join('<br />') : null,
      null,
      skill.mp_cost,
      skill.attack_count.length > 0 ? skill.attack_count[0] : null,
      skill.attack_frames.length > 0 ? skill.attack_frames[0].join(' ') : null
    );
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
        return 5;
      }
      return 5;
    }
    return undefined;
  }
}
