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

describe('AbilitySkillMultipleActivationParser', () => {

  it('should parse removal of caster from fight for one turn', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 53, [1,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Retire le lanceur du combat pour 1 tour');
  });

  it('should parse removal of caster from fight for a fixed number of turns', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 53, [2,  2]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Retire le lanceur du combat pour 2 tours');
  });

  it('should parse removal of caster from fight for a variable number of turns', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 53, [3,  5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Retire le lanceur du combat pour 3 à 5 tours');
  });

  it('should parse multi-skill activation effect', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);

    const multiSkillActivator: Skill = skills['509014'];
    multiSkillActivator.gumi_id = 509014;
    multiSkillActivator.names = names['509014'];
    multiSkillActivator.descriptions = descriptions['509014'];
    const multiSkillActivated: Skill = skills['912380'];
    multiSkillActivated.gumi_id = 912380;
    multiSkillActivated.names = names['912380'];
    multiSkillActivated.descriptions = descriptions['912380'];
    const effect = JSON.parse('[0, 3, 98, [3, 912380, -1, [200200, 200270], 5, 1, 1, 0]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(Skill.produce(multiSkillActivated));
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, multiSkillActivator);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(912380);
    expect(s).toEqual('Donne accès à <a href="ffexvius_skills.php?gumiid=912380">Fouet triple</a> pour 4 tours');
  });

  it('should parse multi-skill activation effect when skill has several effects', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);

    const multiSkillActivator: Skill = skills['510754'];
    multiSkillActivator.gumi_id = 510754;
    multiSkillActivator.names = names['510754'];
    multiSkillActivator.descriptions = descriptions['510754'];
    const multiSkillActivated: Skill = skills['912380'];
    multiSkillActivated.gumi_id = 912380;
    multiSkillActivated.names = names['912380'];
    multiSkillActivated.descriptions = descriptions['912380'];
    const effect = JSON.parse('[0, 3, 98, [3, 912380, -1, [200200, 200270], 5, 1, 1, 0]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(Skill.produce(multiSkillActivated));
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, multiSkillActivator);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(912380);
    expect(s).toEqual('Donne accès à <a href="ffexvius_skills.php?gumiid=912380">Fouet triple</a> pour 4 tours');
  });

  it('should parse multi-skill activation effect valid for one turn', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);

    const multiSkillActivator: Skill = skills['510754'];
    multiSkillActivator.gumi_id = 510754;
    multiSkillActivator.names = names['510754'];
    multiSkillActivator.descriptions = descriptions['510754'];
    const multiSkillActivated: Skill = skills['912380'];
    multiSkillActivated.gumi_id = 912380;
    multiSkillActivated.names = names['912380'];
    multiSkillActivated.descriptions = descriptions['912380'];
    const effect = JSON.parse('[0, 3, 98, [3, 912380, -1, [200200, 200270], 1, 1, 1, 0, 1, -1]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(Skill.produce(multiSkillActivated));
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, multiSkillActivator);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(912380);
    expect(s).toEqual('Donne accès à <a href="ffexvius_skills.php?gumiid=912380">Fouet triple</a> pour 1 tour');
  });

  it('should parse multi-skill effect', () => {
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

    const multiSkillActivated: Skill = skills['912380'];
    multiSkillActivated.gumi_id = 912380;
    multiSkillActivated.names = names['912380'];
    multiSkillActivated.descriptions = descriptions['912380'];
    const effect = JSON.parse('[0, 3, 53, [3, 229421, -1, [200200, 200270], 1]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(Skill.produce(skill1), Skill.produce(skill2));
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, multiSkillActivated);
    // THEN
    expect(s).toEqual('Permet l\'utilisation de <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a>, <a href="ffexvius_skills.php?gumiid=200270">Transpercer</a> 3x par tour');
  });
});
