import {SkillMockDataHelper} from '../../../skill.model.spec';
import {Skill} from '../../../skill.model';
import {SkillsService} from '../../../../services/skills.service';
import {SkillsServiceMock} from '../../../../services/skills.service.spec';
import {AbilitySkillEffectFactory} from '../../ability-skill-effect.factory';

describe('AbilitySkillRandomEffect', () => {
  it('should parse random skills', () => {
    // GIVEN
    const skill1: Skill = SkillMockDataHelper.mockAbilitySkill(200200);
    const skill2: Skill = SkillMockDataHelper.mockAbilitySkill(200270);
    const skill3: Skill = SkillMockDataHelper.mockAbilitySkill(202340);

    const effect = JSON.parse('[2, 2, 29, [[200200,  70], [200270,  20], [202340,  10], 0, 0]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(skill1, skill2, skill3);
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(null);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(3);
    expect(mySpy).toHaveBeenCalledWith(200200);
    expect(mySpy).toHaveBeenCalledWith(200270);
    expect(mySpy).toHaveBeenCalledWith(202340);
    expect(s).toEqual('Effet aléatoire:<br />70%: Lance <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a><br />' +
      '20%: Lance <a href="ffexvius_skills.php?gumiid=200270">Transpercer</a><br />' +
      '10%: Lance <a href="ffexvius_skills.php?gumiid=202340">Tir rapide</a>');
  });

  it('should return empty activated skills array upon parameterError in random skill', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 29, []]');
    const skillEffect = AbilitySkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const activatedSkills = skillEffect.getActivatedSkills(new Skill());

    // THEN
    expect(activatedSkills).toEqual([]);
  });
});
