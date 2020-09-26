import {Skill} from '../model/skill.model';
import {Caracteristiques} from '../model/caracteristiques.model';
import {ObjetElements} from '../model/objet/objet-elements.model';
import {FfbeUtils} from '../utils/ffbe-utils';

export abstract class ItemWithSkillsMapper {
  protected static mapEquipmentBaseIncreasesPercent(dmSkills: Array<Skill>): Caracteristiques {
    if (!Array.isArray(dmSkills)) {
      return new Caracteristiques();
    }

    const increases = ItemWithSkillsMapper.filterSkillsWithoutUnitRestriction(dmSkills)
      .map(dmSkill => dmSkill.calculateBaseIncreasesPercent());
    return Caracteristiques.computeSum(increases);
  }

  protected static mapEquipmentDoublehandIncreasesPercent(dmSkills: Array<Skill>): Caracteristiques {
    if (!Array.isArray(dmSkills)) {
      return new Caracteristiques();
    }

    const increases = ItemWithSkillsMapper.filterSkillsWithoutUnitRestriction(dmSkills)
      .map(dmSkill => dmSkill.calculateDoublehandIncreasesPercent());
    return Caracteristiques.computeSum(increases);
  }

  protected static mapEquipmentTrueDoublehandIncreasesPercent(dmSkills: Array<Skill>): Caracteristiques {
    if (!Array.isArray(dmSkills)) {
      return new Caracteristiques();
    }

    const increases = ItemWithSkillsMapper.filterSkillsWithoutUnitRestriction(dmSkills)
      .map(dmSkill => dmSkill.calculateTrueDoubleHandIncreasesPercent());
    return Caracteristiques.computeSum(increases);
  }

  protected static mapEquipmentDualwieldIncreasesPercent(dmSkills: Array<Skill>): Caracteristiques {
    if (!Array.isArray(dmSkills)) {
      return new Caracteristiques();
    }

    const increases = ItemWithSkillsMapper.filterSkillsWithoutUnitRestriction(dmSkills)
      .map(dmSkill => dmSkill.calculateDualwieldIncreasesPercent());
    return Caracteristiques.computeSum(increases);
  }

  protected static mapElementResistances(dmSkills: Array<Skill>): ObjetElements {
    if (!Array.isArray(dmSkills)) {
      return new ObjetElements();
    }

    const resistances = ItemWithSkillsMapper.filterSkillsWithoutUnitRestriction(dmSkills)
      .map(dmSkill => dmSkill.calculateElementResistances());

    return ObjetElements.computeSum(resistances);
  }

  private static filterSkillsWithoutUnitRestriction(dmSkills: Array<Skill>): Array<Skill> {
    return dmSkills.filter(skill => !skill.hasUnitRestriction());
  }
}
