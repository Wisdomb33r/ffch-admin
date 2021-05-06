import {
  ABILITY_SKILLS_NAMES_TEST_DATA,
  ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA,
  ABILITY_SKILLS_TEST_DATA,
  MAGIC_SKILLS_NAMES_TEST_DATA,
  MAGIC_SKILLS_SHORTDESCRIPTIONS_TEST_DATA,
  MAGIC_SKILLS_TEST_DATA
} from '../../../skill.model.spec';
import {Skill} from '../../../skill.model';
import {SkillsService} from '../../../../services/skills.service';
import {HTML_LINE_RETURN} from '../../../../mappers/effects/skill-effects.mapper';
import {SkillsServiceMock} from '../../../../services/skills.service.spec';
import {AbilitySkillEffectFactory} from '../../ability-skill-effect.factory';

describe('AbilitySkillModifierIncreaseEffect', () => {

  it('should parse skill modifier increase for caster', () => {
    // GIVEN
    const skills = {...(JSON.parse(ABILITY_SKILLS_TEST_DATA)), ...(JSON.parse(MAGIC_SKILLS_TEST_DATA))};
    const names = {...(JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA)), ...(JSON.parse(MAGIC_SKILLS_NAMES_TEST_DATA))};
    const descriptions = {
      ...(JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA)),
      ...(JSON.parse(MAGIC_SKILLS_SHORTDESCRIPTIONS_TEST_DATA))
    };
    const skill1: Skill = skills['20430'];
    skill1.gumi_id = 20430;
    skill1.active = true;
    skill1.names = names['20430'];
    skill1.descriptions = descriptions['20430'];
    const skill2: Skill = skills['509024'];
    skill2.gumi_id = 509024;
    skill2.active = true;
    skill2.names = names['509024'];
    skill2.descriptions = descriptions['509024'];

    const effect = JSON.parse('[0, 3, 136, [[20430,  509024], 0, 0, 300, 5, 1, 1214, 1]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(Skill.produce(skill1), Skill.produce(skill2));
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+600% de puissance à <a href="ffexvius_skills.php?gumiid=509024">Météore X</a> au lanceur pour 5 tours (ID #1214)'
      + HTML_LINE_RETURN + '+400% de puissance à <a href="ffexvius_skills.php?gumiid=20430">Météore</a> au lanceur pour 5 tours (ID #1214)');
  });

  it('should parse skill modifier increase for one ally', () => {
    // GIVEN
    const skills = {...(JSON.parse(ABILITY_SKILLS_TEST_DATA)), ...(JSON.parse(MAGIC_SKILLS_TEST_DATA))};
    const names = {...(JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA)), ...(JSON.parse(MAGIC_SKILLS_NAMES_TEST_DATA))};
    const descriptions = {
      ...(JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA)),
      ...(JSON.parse(MAGIC_SKILLS_SHORTDESCRIPTIONS_TEST_DATA))
    };
    const skill1: Skill = skills['20430'];
    skill1.gumi_id = 20430;
    skill1.active = true;
    skill1.names = names['20430'];
    skill1.descriptions = descriptions['20430'];
    const skill2: Skill = skills['509024'];
    skill2.gumi_id = 509024;
    skill2.active = true;
    skill2.names = names['509024'];
    skill2.descriptions = descriptions['509024'];

    const effect = JSON.parse('[1, 2, 136, [[20430,  509024], 0, 0, 300, 5, 1, 1214, 1]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(Skill.produce(skill1), Skill.produce(skill2));
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+600% de puissance à <a href="ffexvius_skills.php?gumiid=509024">Météore X</a> à un allié pour 5 tours (ID #1214)'
      + HTML_LINE_RETURN + '+400% de puissance à <a href="ffexvius_skills.php?gumiid=20430">Météore</a> à un allié pour 5 tours (ID #1214)');
  });


  it('should parse general physical skill modifier increase for all allies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 136, [0,  1,  0,  1000,  6,  1,  111289,  0]]');

    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+1000% de puissance aux attaques physiques hors limites aux alliés pour 6 tours (ID #111289)');
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

    const effect = JSON.parse('[1, 2, 136, [[10020], 0, 0, 300, 1, 1, 1214, 1]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(Skill.produce(skill1));
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+1.5x la PSY + 0.3x la MAG de puissance à <a href="ffexvius_skills.php?gumiid=10020">Soin</a> à un allié pour 1 tour (ID #1214)');
  });
});
