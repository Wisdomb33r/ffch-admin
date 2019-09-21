import {AbilityEffectParserFactory} from './ability-effect-parser.factory';
import {
  ABILITY_SKILLS_NAMES_TEST_DATA,
  ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA,
  ABILITY_SKILLS_TEST_DATA, MAGIC_SKILLS_NAMES_TEST_DATA, MAGIC_SKILLS_SHORTDESCRIPTIONS_TEST_DATA, MAGIC_SKILLS_TEST_DATA
} from '../../../model/skill.model.spec';
import {Skill} from '../../../model/skill.model';
import {SkillsService} from '../../../services/skills.service';
import {HTML_LINE_RETURN} from '../skill-effects.mapper';

class SkillsServiceMock {
  private static INSTANCE: SkillsServiceMock = new SkillsServiceMock();

  public static getInstance() {
    return SkillsServiceMock.INSTANCE;
  }

  public searchForSkillByGumiId(gumiId: number): Skill {
    return null;
  }
}

describe('AbilitySkillModifierIncreaseParser', () => {

  /*
  it('should parse skill modifier increase for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 136, [[20430,  509024], 0, 0, 300, 5, 1, 1214, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% MAG, +20% ATT, +10% DÉF/PSY au lanceur pour 5 tours');
  });*/

  it('should parse skill modifier increase for caster', () => {
    // GIVEN
    const skills = {...(JSON.parse(ABILITY_SKILLS_TEST_DATA)), ...(JSON.parse(MAGIC_SKILLS_TEST_DATA))};
    const names = {...(JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA)), ...(JSON.parse(MAGIC_SKILLS_NAMES_TEST_DATA))};
    const descriptions = {...(JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA)),
                          ...(JSON.parse(MAGIC_SKILLS_SHORTDESCRIPTIONS_TEST_DATA))};
    const skill1: Skill = skills['20430'];
    skill1.gumi_id = 20430;
    skill1.names = names['20430'];
    skill1.descriptions = descriptions['20430'];
    const skill2: Skill = skills['509024'];
    skill2.gumi_id = 509024;
    skill2.names = names['509024'];
    skill2.descriptions = descriptions['509024'];

    const effect = JSON.parse('[0, 3, 136, [[20430,  509024], 0, 0, 300, 5, 1, 1214, 1]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(Skill.produce(skill1), Skill.produce(skill2));
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+600% de puissance à <a href="ffexvius_skills.php?gumiid=509024">Météore X</a> pour 5 tours'
      + HTML_LINE_RETURN + '+400% de puissance à <a href="ffexvius_skills.php?gumiid=20430">Météore</a> pour 5 tours');
  });

  it('should parse skill modifier increase for one ally', () => {
    // GIVEN
    const skills = {...(JSON.parse(ABILITY_SKILLS_TEST_DATA)), ...(JSON.parse(MAGIC_SKILLS_TEST_DATA))};
    const names = {...(JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA)), ...(JSON.parse(MAGIC_SKILLS_NAMES_TEST_DATA))};
    const descriptions = {...(JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA)),
      ...(JSON.parse(MAGIC_SKILLS_SHORTDESCRIPTIONS_TEST_DATA))};
    const skill1: Skill = skills['20430'];
    skill1.gumi_id = 20430;
    skill1.names = names['20430'];
    skill1.descriptions = descriptions['20430'];
    const skill2: Skill = skills['509024'];
    skill2.gumi_id = 509024;
    skill2.names = names['509024'];
    skill2.descriptions = descriptions['509024'];

    const effect = JSON.parse('[1, 2, 136, [[20430,  509024], 0, 0, 300, 5, 1, 1214, 1]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(Skill.produce(skill1), Skill.produce(skill2));
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+600% de puissance à <a href="ffexvius_skills.php?gumiid=509024">Météore X</a> pour un allié pour 5 tours'
      + HTML_LINE_RETURN + '+400% de puissance à <a href="ffexvius_skills.php?gumiid=20430">Météore</a> pour un allié pour 5 tours');
  });
});