import {Skill} from '../model/skill.model';
import {Caracteristiques} from '../model/caracteristiques.model';
import {ResistancesElementaires} from '../model/resistances-elementaires.model';
import {ResistancesAlterations} from '../model/resistances-alterations.model';

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

  protected static mapElementResistances(dmSkills: Array<Skill>): ResistancesElementaires {
    if (!Array.isArray(dmSkills)) {
      return new ResistancesElementaires();
    }

    const resistances = ItemWithSkillsMapper.filterSkillsWithoutUnitRestriction(dmSkills)
      .map(dmSkill => dmSkill.calculateElementResistances());

    return ResistancesElementaires.computeSum(resistances);
  }

  protected static mapAilmentResistances(dmSkills: Array<Skill>): ResistancesAlterations {
    if (!Array.isArray(dmSkills)) {
      return new ResistancesAlterations();
    }

    const resistances = ItemWithSkillsMapper.filterSkillsWithoutUnitRestriction(dmSkills)
      .map(dmSkill => dmSkill.calculeAilmentResistances());

    return ResistancesAlterations.computeSum(resistances);
  }

  private static filterSkillsWithoutUnitRestriction(dmSkills: Array<Skill>): Array<Skill> {
    return dmSkills.filter(skill => !skill.hasUnitRestriction());
  }

  protected static capResistancesAlterations(resistancesAlterations: ResistancesAlterations) {
    resistancesAlterations.poison = Math.min(resistancesAlterations.poison, 100);
    resistancesAlterations.cecite = Math.min(resistancesAlterations.cecite, 100);
    resistancesAlterations.sommeil = Math.min(resistancesAlterations.sommeil, 100);
    resistancesAlterations.silence = Math.min(resistancesAlterations.silence, 100);
    resistancesAlterations.paralysie = Math.min(resistancesAlterations.paralysie, 100);
    resistancesAlterations.confusion = Math.min(resistancesAlterations.confusion, 100);
    resistancesAlterations.maladie = Math.min(resistancesAlterations.maladie, 100);
    resistancesAlterations.petrification = Math.min(resistancesAlterations.petrification, 100);
  }
}
