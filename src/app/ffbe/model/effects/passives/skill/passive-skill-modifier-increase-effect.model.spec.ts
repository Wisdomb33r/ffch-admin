import {
  ABILITY_SKILLS_NAMES_TEST_DATA,
  ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA,
  ABILITY_SKILLS_TEST_DATA, MAGIC_SKILLS_NAMES_TEST_DATA, MAGIC_SKILLS_SHORTDESCRIPTIONS_TEST_DATA, MAGIC_SKILLS_TEST_DATA
} from '../../../skill.model.spec';
import {Skill} from '../../../skill.model';
import {SkillsServiceMock} from '../../../../services/skills.service.spec';
import {SkillsService} from '../../../../services/skills.service';
import {HTML_LINE_RETURN} from '../../../../mappers/effects/skill-effects.mapper';
import {PassiveSkillEffectFactory} from '../../passive-skill-effect.factory';

describe('PassiveSkillModifierIncreaseEffect', () => {

  it('should parse skill modifier increase', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    const skill1: Skill = skills['200200'];
    skill1.gumi_id = 200200;
    skill1.active = true;
    skill1.names = names['200200'];
    skill1.descriptions = descriptions['200200'];
    const skill2: Skill = skills['200270'];
    skill2.gumi_id = 200270;
    skill2.active = true;
    skill2.names = names['200270'];
    skill2.descriptions = descriptions['200270'];

    const effect = JSON.parse('[0, 3, 73, [[200200, 200270], 0, 0, 100]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(Skill.produce(skill1), Skill.produce(skill2));
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+200% de puissance à <a href="ffexvius_skills.php?gumiid=200270">Transpercer</a>'
      + HTML_LINE_RETURN + '+100% de puissance à <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a>');
  });

  it('should parse skill modifier increase for physical combos', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    const skill1: Skill = skills['202340'];
    skill1.gumi_id = 202340;
    skill1.active = true;
    skill1.names = names['202340'];
    skill1.descriptions = descriptions['202340'];

    const effect = JSON.parse('[0, 3, 73, [202340, 0, 0, 100]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(Skill.produce(skill1));
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+350% de puissance à <a href="ffexvius_skills.php?gumiid=202340">Tir rapide</a>');
  });

  it('should parse skill modifier increase for healing', () => {
    // GIVEN
    const skills = JSON.parse(MAGIC_SKILLS_TEST_DATA);
    const names = JSON.parse(MAGIC_SKILLS_NAMES_TEST_DATA);
    const descriptions = JSON.parse(MAGIC_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    const skill1: Skill = skills['10020'];
    skill1.gumi_id = 10020;
    skill1.active = true;
    skill1.names = names['10020'];
    skill1.descriptions = descriptions['10020'];

    const effect = JSON.parse('[0, 3, 73, [10020, 0, 0, 300]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(Skill.produce(skill1));
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+1.5x la PSY + 0.3x la MAG de puissance à <a href="ffexvius_skills.php?gumiid=10020">Soin</a>');
  });
});
