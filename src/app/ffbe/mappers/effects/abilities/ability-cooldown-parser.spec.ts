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

describe('AbilityCooldownParser', () => {
  it('should parse cooldown skills available on turn 1', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);

    const cooldownActivator: Skill = skills['229425'];
    cooldownActivator.gumi_id = 229425;
    cooldownActivator.names = names['229425'];
    cooldownActivator.descriptions = descriptions['229425'];
    const cooldownActivated: Skill = skills['509014'];
    cooldownActivated.gumi_id = 509014;
    cooldownActivated.names = names['509014'];
    cooldownActivated.descriptions = descriptions['509014'];
    cooldownActivated.active = true;
    const multiSkillActivated: Skill = skills['912380'];
    multiSkillActivated.gumi_id = 912380;
    multiSkillActivated.names = names['912380'];
    multiSkillActivated.descriptions = descriptions['912380'];
    multiSkillActivated.active = true;

    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId')
      .and.returnValues(Skill.produce(cooldownActivated), Skill.produce(multiSkillActivated));

    const effect = JSON.parse('[0, 3, 130, [509014, 1, [7,  7], 0]]');

    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, cooldownActivator);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(2);
    expect(mySpy).toHaveBeenCalledWith(509014);
    expect(mySpy).toHaveBeenCalledWith(912380);

    expect(s).toEqual('Disponible tous les 8 tours dès le tour 1:<br />' +
      '+250% ATT au lanceur pour 6 tours<br />Effet UNKNOWN<br />Effet UNKNOWN<br />' +
      'Donne accès à <a href="ffexvius_skills.php?gumiid=912380">Fouet triple</a> pour 4 tours');
  });

  it('should parse cooldown skills available on turn N, same as cooldown N', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);

    const cooldownActivator: Skill = skills['229425'];
    cooldownActivator.gumi_id = 229425;
    cooldownActivator.names = names['229425'];
    cooldownActivator.descriptions = descriptions['229425'];
    const cooldownActivated: Skill = skills['200200'];
    cooldownActivated.gumi_id = 200200;
    cooldownActivated.names = names['200200'];
    cooldownActivated.descriptions = descriptions['200200'];
    cooldownActivated.active = true;

    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId')
      .and.returnValues(Skill.produce(cooldownActivated), Skill.produce(cooldownActivated));

    const effect = JSON.parse('[0, 3, 130, [200200, 1, [6,  0]]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, cooldownActivator);
    // THEN
    expect(s).toEqual('Disponible tous les 7 tours dès le tour 7:<br />Dégâts physiques neutres de puissance 110% aux adversaires');
    expect(cooldownActivator.attack_count === [3]);
    expect(cooldownActivator.attack_frames === [[2, 5, 8]]);
    expect(cooldownActivator.attack_damage === [[0, 0, 0]]);
  });

  it('should parse cooldowns skills available on turn M, less than cooldown N', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);

    const cooldownActivator: Skill = skills['229425'];
    cooldownActivator.gumi_id = 229425;
    cooldownActivator.names = names['229425'];
    cooldownActivator.descriptions = descriptions['229425'];
    const cooldownActivated: Skill = skills['509624'];
    cooldownActivated.gumi_id = 509624;
    cooldownActivated.names = names['509624'];
    cooldownActivated.descriptions = descriptions['509624'];
    cooldownActivated.active = true;

    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId')
      .and.returnValues(Skill.produce(cooldownActivated), Skill.produce(cooldownActivated));

    const effect = JSON.parse('[0, 3, 130, [509624, 1, [5,  2], 0]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, cooldownActivator);
    // THEN
    expect(s).toEqual('Disponible tous les 6 tours dès le tour 4:<br />' +
      'Dégâts physiques neutres de puissance 25% (ignore 50% DÉF, 50% total) à un adversaire (ignore les couvertures)<br />' +
      'Dégâts physiques neutres de puissance 50% (ignore 50% DÉF, 100% total) à un adversaire (ignore les couvertures)<br />' +
      'Dégâts physiques neutres de puissance 500% (ignore 50% DÉF, 1000% total) à un adversaire (ignore les couvertures)');
    expect(cooldownActivator.attack_count === [8]);
    expect(cooldownActivator.attack_frames === [[70, 76, 82, 88, 94, 100, 106, 112]]);
    expect(cooldownActivator.attack_damage === [[0, 0, 0, 0, 0, 0, 0, 0]]);
  });
});