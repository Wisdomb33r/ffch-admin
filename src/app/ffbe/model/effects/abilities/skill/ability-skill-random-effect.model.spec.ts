import {
  ABILITY_SKILLS_NAMES_TEST_DATA,
  ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA,
  ABILITY_SKILLS_TEST_DATA
} from '../../../skill.model.spec';
import {Skill} from '../../../skill.model';
import {SkillsService} from '../../../../services/skills.service';
import {SkillsServiceMock} from '../../../../services/skills.service.spec';
import {AbilitySkillEffectFactory} from '../../ability-skill-effect.factory';

describe('AbilitySkillRandomEffect', () => {
  it('should parse random skills', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);

    const skill1: Skill = skills['200200'];
    skill1.gumi_id = 200200;
    skill1.names = names['200200'];
    skill1.descriptions = descriptions['200200'];
    const skill2: Skill = skills['200270'];
    skill2.gumi_id = 200270;
    skill2.names = names['200270'];
    skill2.descriptions = descriptions['200270'];
    const skill3: Skill = skills['202340'];
    skill3.gumi_id = 202340;
    skill3.names = names['202340'];
    skill3.descriptions = descriptions['202340'];


    const effect = JSON.parse('[2, 2, 29, [[200200,  70], [200270,  20], [202340,  10], 0, 0]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId')
      .and.returnValues(Skill.produce(skill1), Skill.produce(skill2), Skill.produce(skill3));
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
});
