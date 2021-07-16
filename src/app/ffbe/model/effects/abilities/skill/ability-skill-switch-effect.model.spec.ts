import {SkillMockDataHelper} from '../../../skill.model.spec';
import {Skill} from '../../../skill.model';
import {SkillsService} from '../../../../services/skills.service';
import {SkillsServiceMock} from '../../../../services/skills.service.spec';
import {AbilitySkillEffectFactory} from '../../ability-skill-effect.factory';

describe('AbilitySkillSwitchEffect', () => {
  it('should parse skill switch after single skill', () => {
    // GIVEN
    const switchSkill: Skill = new Skill();
    const skill: Skill = SkillMockDataHelper.mockAbilitySkill(200200);
    const activatorSkill: Skill = SkillMockDataHelper.mockAbilitySkill(229425);
    const activatedSkill: Skill = SkillMockDataHelper.mockAbilitySkill(200270);

    const effect = JSON.parse('[1, 1, 99, [2,  229425,  2,  200270,  2,  200200]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(skill, activatedSkill, activatorSkill);
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(switchSkill);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(3);
    expect(mySpy).toHaveBeenCalledWith(200200);
    expect(mySpy).toHaveBeenCalledWith(200270);
    expect(mySpy).toHaveBeenCalledWith(229425);
    expect(s).toEqual('Dégâts physiques neutres de puissance 110% aux adversaires<br /><br />' +
      'Si utilisé après <a href="ffexvius_skills.php?gumiid=229425">Fini de jouer</a>:<br />' +
      'Dégâts physiques neutres de puissance 80% avec absorption de 20% des dégâts infligés à un adversaire<br />' +
      'Dégâts physiques neutres sur les PM de puissance 30% avec absorption de 10% des dégâts infligés à un adversaire');
    expect(switchSkill.attack_count[0]).toEqual(3);
    expect(switchSkill.attack_frames[0].length).toEqual(3);
    expect(switchSkill.attack_frames[0][0]).toEqual(2);
    expect(switchSkill.attack_frames[0][1]).toEqual(5);
    expect(switchSkill.attack_frames[0][2]).toEqual(8);
    expect(switchSkill.attack_damage[0].length).toEqual(3);
    expect(switchSkill.attack_damage[0][0]).toEqual(33);
    expect(switchSkill.attack_damage[0][1]).toEqual(33);
    expect(switchSkill.attack_damage[0][2]).toEqual(34);
    expect(switchSkill.attack_type).toEqual('Physical');
    expect(switchSkill.physique).toBeTruthy();
  });

  it('should parse skill switch after several skills', () => {
    // GIVEN
    const switchSkill: Skill = new Skill();
    const skill: Skill = SkillMockDataHelper.mockAbilitySkill(200200);
    const activatorSkill1: Skill = SkillMockDataHelper.mockAbilitySkill(229425);
    const activatorSkill2: Skill = SkillMockDataHelper.mockAbilitySkill(510754);
    const activatorSkill3: Skill = SkillMockDataHelper.mockAbilitySkill(202340);
    const activatedSkill: Skill = SkillMockDataHelper.mockAbilitySkill(200270);

    const effect = JSON.parse('[1, 1, 99, [[2,  2,  2], [229425, 510754, 202340], 2, 200270, 2, 200200]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(
      skill, activatedSkill, activatorSkill1, activatorSkill2, activatorSkill3
    );
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(switchSkill);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(5);
    expect(mySpy).toHaveBeenCalledWith(200200);
    expect(mySpy).toHaveBeenCalledWith(200270);
    expect(mySpy).toHaveBeenCalledWith(229425);
    expect(mySpy).toHaveBeenCalledWith(510754);
    expect(mySpy).toHaveBeenCalledWith(202340);
    expect(s).toEqual('Dégâts physiques neutres de puissance 110% aux adversaires<br /><br />' +
      'Si utilisé après <a href="ffexvius_skills.php?gumiid=229425">Fini de jouer</a>, ' +
      '<a href="ffexvius_skills.php?gumiid=510754">Sauveur d\'Elréa</a>, ' +
      '<a href="ffexvius_skills.php?gumiid=202340">Tir rapide</a>:<br />' +
      'Dégâts physiques neutres de puissance 80% avec absorption de 20% des dégâts infligés à un adversaire<br />' +
      'Dégâts physiques neutres sur les PM de puissance 30% avec absorption de 10% des dégâts infligés à un adversaire');
  });
});
