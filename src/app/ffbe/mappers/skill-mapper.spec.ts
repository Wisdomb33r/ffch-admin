import {Skill} from '../model/skill.model';
import {Competence} from '../model/competence.model';
import {SkillMapper} from './skill-mapper';
import {SKILL_TEST_DATA} from '../model/skill.model.spec';

describe('SkillMapper', () => {
  it('should transform ability string to number', () => {
    // GIVEN
    const skills = JSON.parse(SKILL_TEST_DATA);
    const skill: Skill = skills['10010'];
    skill.icon = 'ability_79.png';
    // WHEN
    const competence: Competence = SkillMapper.toCompetence(skill);
    // replaces
    expect(competence.icone).toEqual(79);
  });

  it('should transform ability string with more than 2 digits to number', () => {
    // GIVEN
    const skills = JSON.parse(SKILL_TEST_DATA);
    const skill: Skill = skills['10010'];
    skill.icon = 'ability_9876.png';
    // WHEN
    const competence: Competence = SkillMapper.toCompetence(skill);
    // replaces
    expect(competence.icone).toEqual(9876);
  });
});
