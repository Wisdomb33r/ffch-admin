import {SkillMockDataHelper} from '../../../skill.model.spec';
import {Skill} from '../../../skill.model';
import {SkillsServiceMock} from '../../../../services/skills.service.spec';
import {SkillsService} from '../../../../services/skills.service';
import {PassiveSkillEffectFactory} from '../../passive-skill-effect.factory';

describe('PassiveSkillMoraleJaugeActivationEffect', () => {

  it('should parse activation effect when morale jauge is above threshold', () => {
    // GIVEN
    const skill: Skill = SkillMockDataHelper.mockAbilitySkill(200200);
    const effect = JSON.parse('[0, 3, 10007, [200200,  150,  1,  1]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(skill);

    // WHEN
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);
    const s = skillEffect.wordEffect(skill);

    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(200200);
    expect(Array.isArray(skillEffect.getActivatedSkills())).toBeTrue();
    expect(skillEffect.getActivatedSkills().length).toEqual(1);
    expect(skillEffect.getActivatedSkills()[0].gumi_id).toEqual(200200);
    expect(s).toEqual('Donne accès à <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a> au lanceur quand le moral est supérieur à 150%');
  });

  it('should parse activation effect when morale jauge is below threshold', () => {
    // GIVEN
    const skill: Skill = SkillMockDataHelper.mockAbilitySkill(200270);
    const effect = JSON.parse('[0, 3, 10007, [200270,  50,  0,  1]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(skill);

    // WHEN
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);
    const s = skillEffect.wordEffect(skill);

    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(200270);
    expect(mySpy).toHaveBeenCalledWith(200270);
    expect(Array.isArray(skillEffect.getActivatedSkills())).toBeTrue();
    expect(skillEffect.getActivatedSkills().length).toEqual(1);
    expect(skillEffect.getActivatedSkills()[0].gumi_id).toEqual(200270);
    expect(s).toEqual('Donne accès à <a href="ffexvius_skills.php?gumiid=200270">Transpercer</a> au lanceur quand le moral est inférieur à 50%');
  });

  it('should return empty activated skills array upon parameterError in morale jauge activator skill', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 10007, []]');
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const activatedSkills = skillEffect.getActivatedSkills();

    // THEN
    expect(activatedSkills).toEqual([]);
  });
});
