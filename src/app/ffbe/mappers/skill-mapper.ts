import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {Skill} from '../model/skill.model';
import {Competence} from '../model/competence.model';

export class SkillMapper {

  public static toCompetence(lb: Skill): Competence {
    return new Competence(
      1, // TODO algorithm to map the Skill to a Competence categorie according to the FFCH identifiers
      lb.strings.name[FFBE_FRENCH_TABLE_INDEX],
      lb.strings.name[FFBE_ENGLISH_TABLE_INDEX],
      lb.strings.desc_long[FFBE_FRENCH_TABLE_INDEX],
      lb.strings.desc_long[FFBE_ENGLISH_TABLE_INDEX],
      lb.mp_cost,
      lb.attack_count.length > 0 ? lb.attack_count[0] : null,
      lb.attack_frames.length > 0 ? lb.attack_frames[0].join(" ") : null
    );
  }
}
