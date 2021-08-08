import {SkillsServiceMock} from '../../../../services/skills.service.spec';
import {SkillsService} from '../../../../services/skills.service';
import {SkillMockDataHelper} from '../../../skill.model.spec';
import {Skill} from '../../../skill.model';
import {PassiveSkillEffectFactory} from '../../passive-skill-effect.factory';

describe('PassiveSkillOrMagicMultipleActivationEffectModel', () => {

  it('should parse multi-skill of abilities and green magic when effect is the only one', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 102, [[3, 5], 0, 0, 2, 514425, 0]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId');
    const fakeSkill: Skill = new Skill();
    fakeSkill.effects_raw = [effect];
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(skillsServiceMock.searchForSkillByGumiId).toHaveBeenCalledTimes(0);
    expect(s).toEqual('Permet l\'utilisation des magies vertes et compétences spéciales natives 2x par tour');
  });

  it('should parse multi-skill worded as link when effect is not the only one', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 102, [[3, 5], 0, 0, 2, 200200, 0]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValue(SkillMockDataHelper.mockAbilitySkill(200200));
    const fakeSkill: Skill = new Skill();
    fakeSkill.effects_raw = [effect, effect]; // multiple effect in the skill
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(skillsServiceMock.searchForSkillByGumiId).toHaveBeenCalledOnceWith(200200);
    expect(s).toEqual('Donne accès à <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a>');
  });

  it('should parse multi-skill of all magic types with additional skills', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 102, [[1, 2, 3], [200200, 200270], 0, 5, 514425, 0]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId')
      .and.returnValues(SkillMockDataHelper.mockAbilitySkill(200200), SkillMockDataHelper.mockAbilitySkill(200270));
    const fakeSkill: Skill = new Skill();
    fakeSkill.effects_raw = [effect];
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(skillsServiceMock.searchForSkillByGumiId).toHaveBeenCalledTimes(2);
    expect(skillsServiceMock.searchForSkillByGumiId).toHaveBeenCalledWith(200200);
    expect(skillsServiceMock.searchForSkillByGumiId).toHaveBeenCalledWith(200270);
    expect(s).toEqual('Permet l\'utilisation des magies blanches, magies noires et magies vertes natives ainsi que <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a>, <a href="ffexvius_skills.php?gumiid=200270">Transpercer</a> 5x par tour');
  });

  it('should parse unique multi-skill of UNKNOWN type with excluded skills', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 102, [[4], 0, [200200, 200270], 4, 514425, 1]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId')
      .and.returnValues(SkillMockDataHelper.mockAbilitySkill(200200), SkillMockDataHelper.mockAbilitySkill(200270));
    const fakeSkill: Skill = new Skill();
    fakeSkill.effects_raw = [effect];
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(skillsServiceMock.searchForSkillByGumiId).toHaveBeenCalledTimes(2);
    expect(skillsServiceMock.searchForSkillByGumiId).toHaveBeenCalledWith(200200);
    expect(skillsServiceMock.searchForSkillByGumiId).toHaveBeenCalledWith(200270);
    expect(s).toEqual('Permet l\'utilisation d\'aptitudes <strong>distinctes</strong> parmi les UNKNOWN TYPE natives excepté <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a>, <a href="ffexvius_skills.php?gumiid=200270">Transpercer</a> 4x par tour');
  });

  it('should return the multi-skill as activated skill if worded as link', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 102, [[3, 5], [200270], [200270], 2, 200200, 0]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValue(SkillMockDataHelper.mockAbilitySkill(200200));
    const fakeSkill: Skill = new Skill();
    fakeSkill.effects_raw = [effect];
    fakeSkill.isActivatedByPassiveSkill = true;
    // WHEN
    const activatedSkills = PassiveSkillEffectFactory.getSkillEffect(effect).getActivatedSkills(fakeSkill);
    // THEN
    expect(skillsServiceMock.searchForSkillByGumiId).toHaveBeenCalledOnceWith(200200);
    expect(activatedSkills.length).toEqual(1);
    expect(activatedSkills[0].gumi_id).toEqual(200200);
  });

  it('should not return the multi-skill as activated skill if not worded as link', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 102, [[3, 5], [200270], [200270], 2, 200200, 0]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValue(SkillMockDataHelper.mockAbilitySkill(200200));
    const fakeSkill: Skill = new Skill();
    fakeSkill.effects_raw = [effect];
    // WHEN
    const activatedSkills = PassiveSkillEffectFactory.getSkillEffect(effect).getActivatedSkills(fakeSkill);
    // THEN
    expect(skillsServiceMock.searchForSkillByGumiId).toHaveBeenCalledTimes(0);
    expect(activatedSkills.length).toEqual(0);
  });
});
