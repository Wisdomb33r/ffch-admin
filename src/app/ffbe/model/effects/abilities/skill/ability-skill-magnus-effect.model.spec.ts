import {SkillMockDataHelper} from '../../../skill.model.spec';
import {Skill} from '../../../skill.model';
import {SkillsService} from '../../../../services/skills.service';
import {SkillsServiceMock} from '../../../../services/skills.service.spec';
import {AbilitySkillEffectFactory} from '../../ability-skill-effect.factory';

describe('AbilitySkillMagnusEffect', () => {
  it('should parse NV magnus skills', () => {
    // GIVEN
    const magnusSkill: Skill = SkillMockDataHelper.mockAbilitySkill(912380);
    const activatedSkill: Skill = SkillMockDataHelper.mockAbilitySkill(200200);

    const effect = JSON.parse('[1, 1, 157, [200200,  1,  1,  1,  1,  1,  1,  1,  0]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(activatedSkill);
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(magnusSkill);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(200200);
    expect(s).toEqual('<strong>1 utilisation par combat</strong>:<br />Dégâts physiques neutres de puissance 110% aux adversaires');
    expect(magnusSkill.attack_count[0]).toEqual(3);
    expect(magnusSkill.attack_frames[0].length).toEqual(3);
    expect(magnusSkill.attack_frames[0][0]).toEqual(2);
    expect(magnusSkill.attack_frames[0][1]).toEqual(5);
    expect(magnusSkill.attack_frames[0][2]).toEqual(8);
    expect(magnusSkill.attack_damage[0].length).toEqual(3);
    expect(magnusSkill.attack_damage[0][0]).toEqual(33);
    expect(magnusSkill.attack_damage[0][1]).toEqual(33);
    expect(magnusSkill.attack_damage[0][2]).toEqual(34);
    expect(magnusSkill.attack_type).toEqual('Physical');
    expect(magnusSkill.physique).toBeTruthy();
  });

  it('should parse NV magnus skills with per-turn usage restriction', () => {
    // GIVEN
    const magnusSkill: Skill = SkillMockDataHelper.mockAbilitySkill(912380);
    const activatedSkill: Skill = SkillMockDataHelper.mockAbilitySkill(200200);

    const effect = JSON.parse('[1, 1, 157, [200200,  1,  3,  3,  1,  1,  1,  0,  0]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(activatedSkill);
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(magnusSkill);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(200200);
    expect(s).toEqual('<strong>3 utilisations par combat</strong> (une seule utilisation par multi-cast):<br />'
      + 'Dégâts physiques neutres de puissance 110% aux adversaires');
    expect(magnusSkill.attack_count[0]).toEqual(3);
    expect(magnusSkill.attack_frames[0].length).toEqual(3);
    expect(magnusSkill.attack_frames[0][0]).toEqual(2);
    expect(magnusSkill.attack_frames[0][1]).toEqual(5);
    expect(magnusSkill.attack_frames[0][2]).toEqual(8);
    expect(magnusSkill.attack_damage[0].length).toEqual(3);
    expect(magnusSkill.attack_damage[0][0]).toEqual(33);
    expect(magnusSkill.attack_damage[0][1]).toEqual(33);
    expect(magnusSkill.attack_damage[0][2]).toEqual(34);
    expect(magnusSkill.attack_type).toEqual('Physical');
    expect(magnusSkill.physique).toBeTruthy();
  });

});
