import {SkillMockDataHelper} from '../../../skill.model.spec';
import {Skill} from '../../../skill.model';
import {SkillsServiceMock} from '../../../../services/skills.service.spec';
import {SkillsService} from '../../../../services/skills.service';
import {PassiveSkillEffectFactory} from '../../passive-skill-effect.factory';

describe('PassiveCounterAttackWithSkillEffect', () => {
  it('should parse counter attack with skill effect with max per turn', () => {
    // GIVEN
    const skill: Skill = SkillMockDataHelper.mockPassiveSkill(100020);

    const effect = JSON.parse('[0, 3, 49, [15, 3, 100020, 2]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValue(skill);
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('15% de chance de contrer les dégâts physiques par: +20% PV (max 2 par tour)');
  });

  it('should parse counter attack with skill effect without max limit per turn', () => {
    // GIVEN
    const skill: Skill = SkillMockDataHelper.mockPassiveSkill(100020);

    const effect = JSON.parse('[0, 3, 50, [15, 3, 100020]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValue(skill);
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('15% de chance de contrer les dégâts magiques par: +20% PV');
  });

  it('should parse counter attack with skill with chain damages', () => {
    // GIVEN
    const skill: Skill = SkillMockDataHelper.mockAbilitySkill(509624);

    const effect = JSON.parse('[0, 3, 49, [15, 3, 509624]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValue(skill);
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('15% de chance de contrer les dégâts physiques par: ' +
      '<a href="ffexvius_skills.php?gumiid=509624">Lame des braves (FFV)</a>');
  });

  it('should store activated skill for effects worded with a link', () => {
    // GIVEN
    const skill: Skill = SkillMockDataHelper.mockAbilitySkill(509624);

    const effect = JSON.parse('[0, 3, 49, [15, 3, 509624]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValue(skill);
    // WHEN
    const activatedSkills = PassiveSkillEffectFactory.getSkillEffect(effect).getActivatedSkills(new Skill());

    // THEN
    expect(activatedSkills.length).toEqual(1);
    expect(activatedSkills[0].gumi_id).toEqual(509624);
  });

  it('should parse counter physical attack with normal attack', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 49, [30,  1,  0,  0]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValue(null);
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('30% de chance de contrer les dégâts physiques par une attaque normale de puissance 100%');
  });


  it('should parse counter magical attack with normal attack', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 50, [30,  1,  0,  0]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValue(null);
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('30% de chance de contrer les dégâts magiques par une attaque normale de puissance 100%');
  });

  it('should return empty activated skills array upon parameterError for physical counterattack', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 49, []]');
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const activatedSkills = skillEffect.getActivatedSkills(new Skill());

    // THEN
    expect(activatedSkills).toEqual([]);
  });

  it('should return empty activated skills array upon parameterError for magical counterattack', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 50, []]');
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const activatedSkills = skillEffect.getActivatedSkills(new Skill());

    // THEN
    expect(activatedSkills).toEqual([]);
  });
});
