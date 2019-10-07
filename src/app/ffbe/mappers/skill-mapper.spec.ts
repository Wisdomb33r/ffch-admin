import {Skill} from '../model/skill.model';
import {Competence} from '../model/competence.model';
import {SkillMapper} from './skill-mapper';
import {
  ABILITY_SKILLS_NAMES_TEST_DATA,
  ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA,
  ABILITY_SKILLS_TEST_DATA,
  MAGIC_SKILLS_NAMES_TEST_DATA,
  MAGIC_SKILLS_SHORTDESCRIPTIONS_TEST_DATA,
  MAGIC_SKILLS_TEST_DATA
} from '../model/skill.model.spec';

describe('SkillMapper', () => {
  it('should transform ability icon string to number', () => {
    // GIVEN
    const skills = JSON.parse(MAGIC_SKILLS_TEST_DATA);
    const skill: Skill = skills['10010'];
    const names = JSON.parse(MAGIC_SKILLS_NAMES_TEST_DATA);
    skill.names = names['10010'];
    const descriptions = JSON.parse(MAGIC_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['10010'];
    skill.icon = 'ability_79.png';
    // WHEN
    const competence: Competence = SkillMapper.toCompetence(Skill.produce(skill));
    // THEN
    expect(competence.icone).toEqual(79);
  });

  it('should transform ability icon string with more than 2 digits to number', () => {
    // GIVEN
    const skills = JSON.parse(MAGIC_SKILLS_TEST_DATA);
    const skill: Skill = skills['10010'];
    const names = JSON.parse(MAGIC_SKILLS_NAMES_TEST_DATA);
    skill.names = names['10010'];
    const descriptions = JSON.parse(MAGIC_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['10010'];
    skill.icon = 'ability_9876.png';
    // WHEN
    const competence: Competence = SkillMapper.toCompetence(Skill.produce(skill));
    // THEN
    expect(competence.icone).toEqual(9876);
  });

  it('should combine correctly hits, frames, and damages if effects do not overlap', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const skill: Skill = skills['509624'];
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    skill.names = names['509624'];
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['509624'];
    skill.active = true;
    skill.type = 'ABILITY';
    skill.attack_type = 'Physical';
    // WHEN
    const competence: Competence = SkillMapper.toCompetence(Skill.produce(skill));
    // THEN
    expect(competence.hits).toEqual(8);
    expect(competence.frames).toEqual('70 76 82 88 94 100 106 112');
    expect(competence.damages).toEqual('0 0 0 0 0 0 0 0');
  });

  it('should combine correctly hits, frames, and damages when effects overlap', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const skill: Skill = skills['912882'];
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    skill.names = names['912882'];
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['912882'];
    skill.active = true;
    skill.type = 'ABILITY';
    skill.attack_type = 'Physical';
    // WHEN
    const competence: Competence = SkillMapper.toCompetence(Skill.produce(skill));
    // THEN
    expect(competence.hits).toEqual(14);
    expect(competence.frames).toEqual('35 40 45 50 55 60 65 70 75 80 85 90 95 100');
    expect(competence.damages).toEqual('0 0 0 0 0 0 0 0 0 0 0 0 0 0');
  });

  it('should combine correctly hits, frames, and damages when no effects deal damages', () => {
    // GIVEN
    const skills = JSON.parse(MAGIC_SKILLS_TEST_DATA);
    const skill: Skill = skills['10010'];
    const names = JSON.parse(MAGIC_SKILLS_NAMES_TEST_DATA);
    skill.names = names['10010'];
    const descriptions = JSON.parse(MAGIC_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['10010'];
    skill.active = true;
    skill.type = 'ABILITY';
    skill.attack_type = 'Hybrid';
    // WHEN
    const competence: Competence = SkillMapper.toCompetence(Skill.produce(skill));
    // THEN
    expect(competence.hits).toEqual(1);
    expect(competence.frames).toEqual('130');
    expect(competence.damages).toEqual('100');
  });

});
