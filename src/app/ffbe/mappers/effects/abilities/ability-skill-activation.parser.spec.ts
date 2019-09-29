import {AbilityEffectParserFactory} from './ability-effect-parser.factory';
import {
  ABILITY_SKILLS_NAMES_TEST_DATA,
  ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA,
  ABILITY_SKILLS_TEST_DATA
} from '../../../model/skill.model.spec';
import {Skill} from '../../../model/skill.model';
import {SkillsService} from '../../../services/skills.service';

class SkillsServiceMock {
  private static INSTANCE: SkillsServiceMock = new SkillsServiceMock();

  public static getInstance() {
    return SkillsServiceMock.INSTANCE;
  }

  public searchForSkillByGumiId(gumiId: number): Skill {
    return null;
  }
}

describe('AbilitySkillActivationParser', () => {
  it('should parse skill activation for caster for N turns and no usage limit', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);

    const skill: Skill = skills['200200'];
    skill.gumi_id = 200200;
    skill.names = names['200200'];
    skill.descriptions = descriptions['200200'];
    const effect = JSON.parse('[0, 3, 100, [2,  200200,  99999,  5,  1,  1]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(Skill.produce(skill));
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, skill);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(200200);
    expect(s).toEqual('Donne accès à <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a> pour 4 tours');
  });
});
