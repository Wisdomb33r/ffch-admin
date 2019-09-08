import {Skill} from '../model/skill.model';
import {Competence} from '../model/competence.model';
import {SkillMapper} from './skill-mapper';
import {
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
    const competence: Competence = SkillMapper.toCompetence(skill);
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
    const competence: Competence = SkillMapper.toCompetence(skill);
    // THEN
    expect(competence.icone).toEqual(9876);
  });

  it('should initialize correctly physical as damage type if category is 6', () => {
    // GIVEN
    const skills = JSON.parse(MAGIC_SKILLS_TEST_DATA);
    const skill: Skill = skills['10010'];
    const names = JSON.parse(MAGIC_SKILLS_NAMES_TEST_DATA);
    skill.names = names['10010'];
    const descriptions = JSON.parse(MAGIC_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['10010'];
    skill.active = true;
    skill.type = 'ABILITY';
    skill.attack_type = 'Physical';
    skill.attack_count = [100];
    const competence: Competence = SkillMapper.toCompetence(skill);
    // WHEN
    SkillMapper.mapCategorieToDamageType(competence);
    // THEN
    expect(competence.categorie).toEqual(6);
    expect(competence.physique).toEqual('1');
    expect(competence.hybride).toEqual('0');
    expect(competence.magique).toEqual('0');
  });

  it('should initialize correctly magical as damage type if category is 7', () => {
    // GIVEN
    const skills = JSON.parse(MAGIC_SKILLS_TEST_DATA);
    const skill: Skill = skills['10010'];
    const names = JSON.parse(MAGIC_SKILLS_NAMES_TEST_DATA);
    skill.names = names['10010'];
    const descriptions = JSON.parse(MAGIC_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['10010'];
    skill.active = true;
    skill.type = 'ABILITY';
    skill.attack_type = 'Magic';
    skill.attack_count = [100];
    const competence: Competence = SkillMapper.toCompetence(skill);
    // WHEN
    SkillMapper.mapCategorieToDamageType(competence);
    // THEN
    expect(competence.categorie).toEqual(7);
    expect(competence.physique).toEqual('0');
    expect(competence.hybride).toEqual('0');
    expect(competence.magique).toEqual('1');
  });

  it('should initialize correctly magical as damage type if category is 2', () => {
    // GIVEN
    const skills = JSON.parse(MAGIC_SKILLS_TEST_DATA);
    const skill: Skill = skills['10010'];
    const names = JSON.parse(MAGIC_SKILLS_NAMES_TEST_DATA);
    skill.names = names['10010'];
    const descriptions = JSON.parse(MAGIC_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['10010'];
    skill.active = true;
    skill.type = 'MAGIC';
    skill.magic_type = 'Black';
    const competence: Competence = SkillMapper.toCompetence(skill);
    // WHEN
    SkillMapper.mapCategorieToDamageType(competence);
    // THEN
    expect(competence.categorie).toEqual(2);
    expect(competence.physique).toEqual('0');
    expect(competence.hybride).toEqual('0');
    expect(competence.magique).toEqual('1');
  });

  it('should initialize correctly hybrid as damage type if category is 8', () => {
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
    skill.attack_count = [100];
    const competence: Competence = SkillMapper.toCompetence(skill);
    // WHEN
    SkillMapper.mapCategorieToDamageType(competence);
    // THEN
    expect(competence.categorie).toEqual(8);
    expect(competence.physique).toEqual('0');
    expect(competence.hybride).toEqual('1');
    expect(competence.magique).toEqual('0');
  });
});
