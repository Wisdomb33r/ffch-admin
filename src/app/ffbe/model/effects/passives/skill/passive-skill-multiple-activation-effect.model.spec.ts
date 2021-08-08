import {SkillsServiceMock} from '../../../../services/skills.service.spec';
import {SkillsService} from '../../../../services/skills.service';
import {SkillMockDataHelper} from '../../../skill.model.spec';
import {Skill} from '../../../skill.model';
import {PassiveSkillEffectFactory} from '../../passive-skill-effect.factory';

describe('PassiveSkillMultipleActivationEffect', () => {

  it('should parse multi-skill when effect is the only one', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 53, [3, 123456, -1, [200200, 200270], 1]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId')
      .and.returnValues(SkillMockDataHelper.mockAbilitySkill(200200), SkillMockDataHelper.mockAbilitySkill(200270));
    const fakeSkill: Skill = new Skill();
    fakeSkill.effects_raw = [effect]; // single effect in the skill
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Permet l\'utilisation de <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a>, <a href="ffexvius_skills.php?gumiid=200270">Transpercer</a> 3x par tour');
  });

  it('should parse multi-skill without duplicates', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 53, [3, 123456, -1, [200200], 1, 1]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(SkillMockDataHelper.mockAbilitySkill(200200));
    const fakeSkill: Skill = new Skill();
    fakeSkill.effects_raw = [effect]; // single effect in the skill
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Permet l\'utilisation d\'aptitudes <strong>distinctes</strong> parmi <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a> 3x par tour');
  });

  it('should parse multi-skill when there is multiple effects', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 53, [3, 200200, -1, [200270], 1]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId')
      .and.returnValues(SkillMockDataHelper.mockAbilitySkill(200200), SkillMockDataHelper.mockAbilitySkill(200270));
    const fakeSkill: Skill = new Skill();
    fakeSkill.effects_raw = [effect, effect]; // multiple effects in the skill
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Donne accès à <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a>');
  });

});
