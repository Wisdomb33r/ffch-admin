import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {Skill} from '../model/skill.model';
import {Competence} from '../model/competence.model';

export class SkillMapper {

  public static toCompetence(skill: Skill, gumi_id: number): Competence {
    return new Competence(
      gumi_id,
      1, // TODO algorithm to map the Skill to a Competence categorie according to the FFCH identifiers
      skill.strings.name[FFBE_FRENCH_TABLE_INDEX],
      skill.strings.name[FFBE_ENGLISH_TABLE_INDEX],
      skill.strings.desc_short[FFBE_FRENCH_TABLE_INDEX],
      skill.strings.desc_short[FFBE_ENGLISH_TABLE_INDEX],
      skill.mp_cost,
      skill.attack_count.length > 0 ? skill.attack_count[0] : null,
      skill.attack_frames.length > 0 ? skill.attack_frames[0].join(" ") : null
    );
  }
}
