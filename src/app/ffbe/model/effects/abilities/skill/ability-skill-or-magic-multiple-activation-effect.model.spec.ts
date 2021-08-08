import {Skill} from '../../../skill.model';
import {SkillMockDataHelper} from '../../../skill.model.spec';
import {SkillsServiceMock} from '../../../../services/skills.service.spec';
import {SkillsService} from '../../../../services/skills.service';
import {AbilitySkillEffectFactory} from '../../ability-skill-effect.factory';

describe('AbilitySkillOrMagicMultipleActivationEffect', () => {

  it('should parse triple-skill effect for native abilities and additional skill', () => {
    // GIVEN
    const skill: Skill = SkillMockDataHelper.mockAbilitySkill(200200);
    const effect = JSON.parse('[0, 3, 168, [5, 200200, 0, 3, 512740, 0, 2, 1, 99999]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(skill);
    const fakeSkill = new Skill();
    fakeSkill.gumi_id = 512740;
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(200200);
    expect(s).toEqual('Permet l\'utilisation des compétences spéciales natives ainsi que <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a> 3x par tour');
  });

  it('should parse triple-skill activation effect to caster for 2 uses over 5 turns', () => {
    // GIVEN
    const skill: Skill = SkillMockDataHelper.mockAbilitySkill(200200);
    const effect = JSON.parse('[0, 3, 168, [5,  512746,  0,  3,  200200,  0,  6,  1,  2]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(skill);
    const fakeSkill = new Skill();
    fakeSkill.gumi_id = 512745;
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(200200);
    expect(s).toEqual('Donne accès à <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a> au lanceur pour 2 utilisations pour 5 tours');
  });

});
