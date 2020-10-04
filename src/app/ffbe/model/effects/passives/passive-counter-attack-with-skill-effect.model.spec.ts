import {
  ABILITY_SKILLS_NAMES_TEST_DATA,
  ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA,
  ABILITY_SKILLS_TEST_DATA,
  PASSIVE_SKILLS_TEST_DATA
} from '../../skill.model.spec';
import {Skill} from '../../skill.model';
import {SkillsServiceMock} from '../../../services/skills.service.spec';
import {SkillsService} from '../../../services/skills.service';
import {PassiveSkillEffectFactory} from '../passive-skill-effect.factory';

describe('PassiveCounterAttackWithSkillEffect', () => {
  it('should parse counter attack with skill effect with max per turn', () => {
    // GIVEN
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);
    const skill: Skill = skills['100020'];
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    skill.names = names['100020'];
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['100020'];

    const effect = JSON.parse('[0, 3, 49, [15, 3, 100020, 2]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValue(Skill.produce(skill));
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('15% de chance de contrer les dégâts physiques par: +20% PV (max 2 par tour)');
  });

  it('should parse counter attack with skill effect without max limit per turn', () => {
    // GIVEN
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);
    const skill: Skill = skills['100020'];
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    skill.names = names['100020'];
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['100020'];

    const effect = JSON.parse('[0, 3, 50, [15, 3, 100020]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValue(Skill.produce(skill));
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('15% de chance de contrer les dégâts magiques par: +20% PV');
  });

  it('should parse counter attack with skill with chain damages', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const skill: Skill = skills['509624'];
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    skill.names = names['509624'];
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['509624'];
    skill.active = true;
    skill.gumi_id = 509624;

    const effect = JSON.parse('[0, 3, 49, [15, 3, 509624]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValue(Skill.produce(skill));
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('15% de chance de contrer les dégâts physiques par: ' +
      '<a href="ffexvius_skills.php?gumiid=509624">Lame des braves (FFV)</a>');
  });
});
