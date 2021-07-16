import {AbilityEffectParserFactory} from './ability-effect-parser.factory';
import {SkillMockDataHelper} from '../../../model/skill.model.spec';
import {Skill} from '../../../model/skill.model';
import {SkillsService} from '../../../services/skills.service';
import {SkillsServiceMock} from '../../../services/skills.service.spec';

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
    const multiSkillActivator: Skill = SkillMockDataHelper.mockAbilitySkill(509014);
    const multiSkillActivated: Skill = SkillMockDataHelper.mockAbilitySkill(912380);
    const effect = JSON.parse('[0, 3, 98, [3, 912380, -1, [200200, 200270], 5, 1, 1, 0]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(multiSkillActivated);
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, multiSkillActivator);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(912380);
    expect(s).toEqual('Donne accès à <a href="ffexvius_skills.php?gumiid=912380">Fouet triple</a> pour 4 tours');
  });

  it('should parse multi-skill activation effect when activated by a passive skill', () => {
    // GIVEN
    const multiSkillActivator: Skill = SkillMockDataHelper.mockAbilitySkill(510754);
    multiSkillActivator.isActivatedByPassiveSkill = true;
    const multiSkillActivated: Skill = SkillMockDataHelper.mockAbilitySkill(912380);

    const effect = JSON.parse('[0, 3, 98, [3, 912380, -1, [200200, 200270], 5, 1, 1, 0]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(multiSkillActivated);
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, multiSkillActivator);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(912380);
    expect(s).toEqual('Donne accès à <a href="ffexvius_skills.php?gumiid=912380">Fouet triple</a> pour 5 tours');
  });

  it('should parse multi-skill effect', () => {
    // GIVEN
    const skill1: Skill = SkillMockDataHelper.mockAbilitySkill(200200);
    const skill2: Skill = SkillMockDataHelper.mockAbilitySkill(200270);
    const multiSkillActivated: Skill = SkillMockDataHelper.mockAbilitySkill(912380);

    const effect = JSON.parse('[0, 3, 53, [3, 229421, -1, [200200, 200270], 1]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(skill1, skill2);
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, multiSkillActivated);
    // THEN
    expect(s).toEqual('Permet l\'utilisation de <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a>, <a href="ffexvius_skills.php?gumiid=200270">Transpercer</a> 3x par tour');
  });

  it('should parse multi-skill activation GLEX effect', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 1006, [3, [912380]]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(SkillMockDataHelper.mockAbilitySkill(912380));
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(912380);
    expect(s).toEqual('Permet l\'utilisation de <a href="ffexvius_skills.php?gumiid=912380">Fouet triple</a> 3x par tour');
  });
});
