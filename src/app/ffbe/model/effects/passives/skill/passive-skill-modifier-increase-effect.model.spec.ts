import {SkillMockDataHelper} from '../../../skill.model.spec';
import {Skill} from '../../../skill.model';
import {SkillsServiceMock} from '../../../../services/skills.service.spec';
import {SkillsService} from '../../../../services/skills.service';
import {HTML_LINE_RETURN} from '../../../../mappers/effects/skill-effects.mapper';
import {PassiveSkillEffectFactory} from '../../passive-skill-effect.factory';

describe('PassiveSkillModifierIncreaseEffect', () => {

  it('should parse skill modifier increase', () => {
    // GIVEN
    const skill1: Skill = SkillMockDataHelper.mockAbilitySkill(200200);
    const skill2: Skill = SkillMockDataHelper.mockAbilitySkill(200270);

    const effect = JSON.parse('[0, 3, 73, [[200200, 200270], 0, 0, 100]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(skill1, skill2);
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+200% de puissance à <a href="ffexvius_skills.php?gumiid=200270">Transpercer</a>'
      + HTML_LINE_RETURN + '+100% de puissance à <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a>');
  });

  it('should parse skill modifier increase for physical combos', () => {
    // GIVEN
    const skill1: Skill = SkillMockDataHelper.mockAbilitySkill(202340);

    const effect = JSON.parse('[0, 3, 73, [202340, 0, 0, 100]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(skill1);
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+350% de puissance à <a href="ffexvius_skills.php?gumiid=202340">Tir rapide</a>');
  });

  it('should parse skill modifier increase for healing', () => {
    // GIVEN
    const skill1: Skill = SkillMockDataHelper.mockMagicSkill(10020);

    const effect = JSON.parse('[0, 3, 73, [10020, 0, 0, 300]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(skill1);
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+1.5x la PSY + 0.3x la MAG de puissance à <a href="ffexvius_skills.php?gumiid=10020">Soin</a>');
  });
});
