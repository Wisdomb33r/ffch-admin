import {SkillMockDataHelper} from '../../../skill.model.spec';
import {SkillsServiceMock} from '../../../../services/skills.service.spec';
import {SkillsService} from '../../../../services/skills.service';
import {PassiveSkillEffectFactory} from '../../passive-skill-effect.factory';

describe('PassiveSkillBattleStartActivationEffect', () => {

  it('should parse battle start activation effect', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 35, [100020]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValue(SkillMockDataHelper.mockPassiveSkill(100020));
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('Effet activé en début de combat ou après résurrection: +20% PV');
  });

  it('should return empty activated skills array upon parameterError in battle start activator skill', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 35, []]');
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const activatedSkills = skillEffect.getActivatedSkills();

    // THEN
    expect(activatedSkills).toEqual([]);
  });
});
