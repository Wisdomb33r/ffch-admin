import {SkillsService} from '../../../services/skills.service';
import {SkillsServiceMock} from '../../../services/skills.service.spec';
import {
  ABILITY_SKILLS_NAMES_TEST_DATA,
  ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA,
  ABILITY_SKILLS_TEST_DATA
} from '../../skill.model.spec';
import {Skill} from '../../skill.model';
import {PassiveSkillEffectFactory} from '../passive-skill-effect.factory';

describe('PassiveSkillReplacingNormalAttackEffect', () => {

  it('should parse skill replacing for normal attack effect', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const skill: Skill = skills['200200'];
    skill.gumi_id = 200200;
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    skill.names = names['200200'];
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['200200'];

    const effect = JSON.parse('[0, 3, 100, [200200, 1, 1, 0]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValue(Skill.produce(skill));
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('Remplace les attaques normales par <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a>');
  });

  it('should return empty activated skills array upon parameterError in cooldown skill', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 100, []]');
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const activatedSkills = skillEffect.getActivatedSkills();

    // THEN
    expect(activatedSkills).toEqual([]);
  });
});
