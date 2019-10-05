import {AbilitySkillSwitchParser} from './ability-skill-switch.parser';
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

describe('AbilitySkillSwitchParser', () => {
  it('should parse skill switch after single skill', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);

    const switchSkill: Skill = skills['912380'];
    switchSkill.gumi_id = 912380;
    switchSkill.names = names['912380'];
    switchSkill.descriptions = descriptions['912380'];
    switchSkill.active = true;

    const skill: Skill = skills['200200'];
    skill.gumi_id = 200200;
    skill.names = names['200200'];
    skill.descriptions = descriptions['200200'];
    skill.active = true;

    const activatorSkill: Skill = skills['229425'];
    activatorSkill.gumi_id = 229425;
    activatorSkill.names = names['229425'];
    activatorSkill.descriptions = descriptions['229425'];

    const activatedSkill: Skill = skills['200270'];
    activatedSkill.gumi_id = 200270;
    activatedSkill.names = names['200270'];
    activatedSkill.descriptions = descriptions['200270'];

    const effect = JSON.parse('[1, 1, 99, [2,  229425,  2,  200270,  2,  200200]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(Skill.produce(skill),
      Skill.produce(activatedSkill), Skill.produce(activatorSkill));
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, switchSkill);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(3);
    expect(mySpy).toHaveBeenCalledWith(200200);
    expect(mySpy).toHaveBeenCalledWith(200270);
    expect(mySpy).toHaveBeenCalledWith(229425);
    expect(s).toEqual('Dégâts physiques neutres de puissance 110% aux adversaires<br /><br />' +
      'Se transforme en <a href="ffexvius_skills.php?gumiid=200270">Transpercer</a> si utilisé après ' +
      '<a href="ffexvius_skills.php?gumiid=229425">Fini de jouer</a>');
    expect(Array.isArray(switchSkill.attack_count) && switchSkill.attack_count.length === 1 && switchSkill.attack_count[0] === 3).toBeTruthy();
    expect(Array.isArray(switchSkill.attack_frames) && switchSkill.attack_frames.length === 1 && switchSkill.attack_frames[0].length === 3).toBeTruthy();
    expect(switchSkill.attack_frames[0][0] === 2).toBeTruthy();
    expect(switchSkill.attack_frames[0][1] === 5).toBeTruthy();
    expect(switchSkill.attack_frames[0][2] === 8).toBeTruthy();
    expect(Array.isArray(switchSkill.attack_damage) && switchSkill.attack_damage.length === 1 && switchSkill.attack_damage[0].length === 3).toBeTruthy();
    expect(switchSkill.attack_damage[0][0] === 33).toBeTruthy();
    expect(switchSkill.attack_damage[0][1] === 33).toBeTruthy();
    expect(switchSkill.attack_damage[0][2] === 34).toBeTruthy();
  });

  it('should parse skill switch after several skills', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);

    const switchSkill: Skill = skills['912380'];
    switchSkill.gumi_id = 912380;
    switchSkill.names = names['912380'];
    switchSkill.descriptions = descriptions['912380'];
    switchSkill.active = true;

    const skill: Skill = skills['200200'];
    skill.gumi_id = 200200;
    skill.names = names['200200'];
    skill.descriptions = descriptions['200200'];
    skill.active = true;

    const activatorSkill1: Skill = skills['229425'];
    activatorSkill1.gumi_id = 229425;
    activatorSkill1.names = names['229425'];
    activatorSkill1.descriptions = descriptions['229425'];
    const activatorSkill2: Skill = skills['510754'];
    activatorSkill2.gumi_id = 510754;
    activatorSkill2.names = names['510754'];
    activatorSkill2.descriptions = descriptions['510754'];
    const activatorSkill3: Skill = skills['202340'];
    activatorSkill3.gumi_id = 202340;
    activatorSkill3.names = names['202340'];
    activatorSkill3.descriptions = descriptions['202340'];

    const activatedSkill: Skill = skills['200270'];
    activatedSkill.gumi_id = 200270;
    activatedSkill.names = names['200270'];
    activatedSkill.descriptions = descriptions['200270'];

    const effect = JSON.parse('[1, 1, 99, [[2,  2,  2], [229425, 510754, 202340], 2, 200270, 2, 200200]]');

    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(Skill.produce(skill),
      Skill.produce(activatedSkill), Skill.produce(activatorSkill1), Skill.produce(activatorSkill2),
      Skill.produce(activatorSkill3));
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, switchSkill);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(5);
    expect(mySpy).toHaveBeenCalledWith(200200);
    expect(mySpy).toHaveBeenCalledWith(200270);
    expect(mySpy).toHaveBeenCalledWith(229425);
    expect(mySpy).toHaveBeenCalledWith(510754);
    expect(mySpy).toHaveBeenCalledWith(202340);
    expect(s).toEqual('Dégâts physiques neutres de puissance 110% aux adversaires<br /><br />' +
      'Se transforme en <a href="ffexvius_skills.php?gumiid=200270">Transpercer</a> si utilisé après ' +
      '<a href="ffexvius_skills.php?gumiid=229425">Fini de jouer</a>, ' +
      '<a href="ffexvius_skills.php?gumiid=510754">Sauveur d\'Elréa</a>, ' +
      '<a href="ffexvius_skills.php?gumiid=202340">Tir rapide</a>');
  });
});
