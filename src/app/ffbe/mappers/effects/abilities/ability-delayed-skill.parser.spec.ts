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

describe('AbilityDelayedSkillParser', () => {
  it('should parse delayed skill on caster after 3 turns', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);

    const skill: Skill = skills['200190'];
    skill.gumi_id = 200190;
    skill.names = names['200190'];
    skill.descriptions = descriptions['200190'];
    skill.active = true;

    const effect = JSON.parse('[0, 3, 132, [200190,  0,  3,  100,  0,  4]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(Skill.produce(skill));
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(200190);
    expect(s).toEqual('Lance <a href="ffexvius_skills.php?gumiid=200190">Bénédiction</a>' +
      ' avec délai de 3 tours au lanceur');
  });

  it('should parse delayed skill on one ally after 2 turns', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);

    const skill: Skill = skills['200190'];
    skill.gumi_id = 200190;
    skill.names = names['200190'];
    skill.descriptions = descriptions['200190'];
    skill.active = true;

    const effect = JSON.parse('[1, 2, 132, [200190,  1,  2,  100,  0,  2]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(Skill.produce(skill));
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(200190);
    expect(s).toEqual('Lance <a href="ffexvius_skills.php?gumiid=200190">Bénédiction</a>' +
      ' avec délai de 2 tours à un allié');
  });

  it('should parse delayed skill on all allies after 1 turn', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);

    const skill: Skill = skills['200190'];
    skill.gumi_id = 200190;
    skill.names = names['200190'];
    skill.descriptions = descriptions['200190'];
    skill.active = true;

    const effect = JSON.parse('[2, 2, 132, [200190,  0,  1,  100,  0,  233166]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(Skill.produce(skill));
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(200190);
    expect(s).toEqual('Lance <a href="ffexvius_skills.php?gumiid=200190">Bénédiction</a>' +
      ' avec délai de 1 tour aux alliés');
  });

  it('should parse delayed skill on one enemy after 1 turn', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);

    const skill: Skill = skills['200190'];
    skill.gumi_id = 200190;
    skill.names = names['200190'];
    skill.descriptions = descriptions['200190'];
    skill.active = true;

    const effect = JSON.parse('[1, 1, 132, [200190,  0,  1,  100,  0,  0]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(Skill.produce(skill));
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(200190);
    expect(s).toEqual('Lance <a href="ffexvius_skills.php?gumiid=200190">Bénédiction</a>' +
      ' avec délai de 1 tour à un adversaire');
  });

  it('should parse delayed skill on all enemies after 2 turns', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);

    const skill: Skill = skills['200190'];
    skill.gumi_id = 200190;
    skill.names = names['200190'];
    skill.descriptions = descriptions['200190'];
    skill.active = true;

    const effect = JSON.parse('[2, 1, 132, [200190,  0,  2,  100,  0,  2]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(Skill.produce(skill));
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(200190);
    expect(s).toEqual('Lance <a href="ffexvius_skills.php?gumiid=200190">Bénédiction</a>' +
      ' avec délai de 2 tours aux adversaires');
  });
});
