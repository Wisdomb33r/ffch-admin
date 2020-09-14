import {Skill} from '../model/skill.model';
import {Caracteristiques} from '../model/caracteristiques.model';

export abstract class ItemWithSkillsMapper {
  protected static mapEquipmentBaseIncreasesPercent(dmSkills: Array<Skill>): Caracteristiques {
    if (!Array.isArray(dmSkills)) {
      return new Caracteristiques();
    }

    const increases = dmSkills.map(dmSkill => dmSkill.calculateBaseIncreasesPercent());
    return Caracteristiques.computeSum(increases);
  }

  protected static mapEquipmentDualwieldIncreasesPercent(dmSkills: Array<Skill>): Caracteristiques {
    if (!Array.isArray(dmSkills)) {
      return new Caracteristiques();
    }

    const increases = dmSkills.map(dmSkill => dmSkill.calculateDualwieldIncreasesPercent());
    return Caracteristiques.computeSum(increases);
  }
}
