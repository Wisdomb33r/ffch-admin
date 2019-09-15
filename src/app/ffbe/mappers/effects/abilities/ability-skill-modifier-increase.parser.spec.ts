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

  it('should parse skill modifier increase', () => {
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
    expect(s).toEqual('+600% de puissance à <a href="ffexvius_skills.php?gumiid=509024">Météore X</a>'
      + HTML_LINE_RETURN + '+400% de puissance à <a href="ffexvius_skills.php?gumiid=20430">Météore</a>');
  });




/*
  it('should parse stats increase with whole-fight duration for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 3, [20, 10, 30, 10, -1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% MAG, +20% ATT, +10% DÉF/PSY au lanceur pour ce combat');
  });

  it('should parse non-dispellable stats increase for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 3, [30, 0, 30, 0, 3, 1, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% ATT/MAG au lanceur pour 3 tours (bonus non-dissipable)');
  });

  it('should parse stats increase for an ally', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 3, [20, 10, 30, 10, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% MAG, +20% ATT, +10% DÉF/PSY à un allié pour 5 tours');
  });


  it('should parse stats increase for the party', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 3, [20, 10, 30, 10, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% MAG, +20% ATT, +10% DÉF/PSY à tous les alliés pour 5 tours');
  });

  it('should parse stats increase for the rest of the party', () => {
    // GIVEN
    const effect = JSON.parse('[2, 5, 3, [20, 10, 30, 10, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% MAG, +20% ATT, +10% DÉF/PSY à tous les alliés sauf le lanceur pour 5 tours');
  });

  it('should parse stats breaks for one enemy', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 24, [-20, 0, -30, 0, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('-30% MAG, -20% ATT à un adversaire pour 5 tours');
  });

  it('should parse null stats breaks for one enemy', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 3, [0,  0,  0,  0,  0,  0]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('');
  });

  it('should parse stats breaks for all enemies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 24, [-20, 0, -30, 0, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('-30% MAG, -20% ATT à tous les adversaires pour 5 tours');
  });

 */
});
