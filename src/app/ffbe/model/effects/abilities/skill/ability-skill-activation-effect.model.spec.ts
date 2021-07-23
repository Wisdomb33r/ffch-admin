import {SkillMockDataHelper} from '../../../skill.model.spec';
import {Skill} from '../../../skill.model';
import {SkillsService} from '../../../../services/skills.service';
import {SkillsServiceMock} from '../../../../services/skills.service.spec';
import {AbilitySkillEffectFactory} from '../../ability-skill-effect.factory';

describe('AbilitySkillActivationEffect', () => {
  it('should parse skill activation for caster for 1 turn and no usage limit', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 100, [2,  200200,  9999,  2,  1]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(SkillMockDataHelper.mockAbilitySkill(200200));
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(new Skill());
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(200200);
    expect(s).toEqual('Donne accès à <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a> au lanceur pour 1 tour');
  });

  it('should parse skill activation for caster for N turns and no usage limit', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 100, [2,  200200,  0,  5,  1,  1]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(SkillMockDataHelper.mockAbilitySkill(200200));
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(new Skill());
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(200200);
    expect(s).toEqual('Donne accès à <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a> au lanceur pour 4 tours');
  });

  it('should parse activation of three skills for caster for N turns and no usage limit', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 100, [[2,  2,  2], [200200, 200270, 202340], 9999, 4, 1, 0]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(
      SkillMockDataHelper.mockAbilitySkill(200200),
      SkillMockDataHelper.mockAbilitySkill(200270),
      SkillMockDataHelper.mockAbilitySkill(202340)
    );
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(new Skill());
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(3);
    expect(mySpy).toHaveBeenCalledWith(200200);
    expect(mySpy).toHaveBeenCalledWith(200270);
    expect(mySpy).toHaveBeenCalledWith(202340);
    expect(s).toEqual('Donne accès à <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a>, ' +
      '<a href="ffexvius_skills.php?gumiid=200270">Transpercer</a>, ' +
      '<a href="ffexvius_skills.php?gumiid=202340">Tir rapide</a> au lanceur pour 3 tours');
  });

  it('should parse skill activation for caster for 1 use and no turn limit', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 100, [2,  200200,  1,  9999,  1,  1]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(SkillMockDataHelper.mockAbilitySkill(200200));
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(new Skill());
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(200200);
    expect(s).toEqual('Donne accès à <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a> au lanceur pour 1 utilisation');
  });

  it('should parse skill activation for caster for M uses and no turn limit', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 100, [2,  200200,  4,  -1,  1,  1]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(SkillMockDataHelper.mockAbilitySkill(200200));
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(new Skill());
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(200200);
    expect(s).toEqual('Donne accès à <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a> au lanceur pour 4 utilisations');
  });

  it('should parse skill activation for caster for M uses over N turns', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 100, [2,  200200,  3,  6,  1,  1]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(SkillMockDataHelper.mockAbilitySkill(200200));
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(new Skill());
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(200200);
    expect(s).toEqual('Donne accès à <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a> ' +
      'au lanceur pour 3 utilisations sur 5 tours');
  });

  it('should parse skill activation for caster without turn or use limit', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 100, [2,  200200,  99999,  99999,  1]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(SkillMockDataHelper.mockAbilitySkill(200200));
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(new Skill());
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(200200);
    expect(s).toEqual('Donne accès à <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a> au lanceur');
  });

  it('should parse skill activation for one ally', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 100, [2,  200200,  999,  3,  1,  912309]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(SkillMockDataHelper.mockAbilitySkill(200200));
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(new Skill());
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(200200);
    expect(s).toEqual('Donne accès à <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a> à un allié pour 3 tours');
  });

  it('should parse skill activation for all allies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 100, [2,  200200,  1,  4,  1,  85700]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(SkillMockDataHelper.mockAbilitySkill(200200));
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(new Skill());
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(200200);
    expect(s).toEqual('Donne accès à <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a> aux alliés pour 1 utilisation sur 4 tours');
  });

  it('should parse skill activation for caster for the current turn when activated by passive skill', () => {
    // GIVEN
    const skill: Skill = SkillMockDataHelper.mockAbilitySkill(512170);
    skill.isActivatedByPassiveSkill = true;

    const effect = JSON.parse('[0, 3, 100, [2,  512170,  99999,  1,  1,  5]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(skill);
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(skill);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(512170);
    expect(s).toEqual('Donne accès à <a href="ffexvius_skills.php?gumiid=512170">Point faible + : Feu</a> au lanceur pour 1 tour');
  });

  it('should return empty activated skills array upon parameterError in activator skill', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 100, []]');
    const skillEffect = AbilitySkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const activatedSkills = skillEffect.getActivatedSkills(new Skill());

    // THEN
    expect(activatedSkills).toEqual([]);
  });
});

