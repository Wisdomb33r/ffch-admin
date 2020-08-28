import {
  ABILITY_SKILLS_NAMES_TEST_DATA,
  ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA,
  ABILITY_SKILLS_TEST_DATA
} from '../../../skill.model.spec';
import {Skill} from '../../../skill.model';
import {SkillsService} from '../../../../services/skills.service';
import {SkillsServiceMock} from '../../../../services/skills.service.spec';
import {AbilitySkillEffectFactory} from '../../ability-skill-effect.factory';

describe('AbilitySkillMagnusEffect', () => {
  it('should parse NV magnus skills', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);

    const magnusSkill: Skill = skills['912380'];
    magnusSkill.gumi_id = 912380;
    magnusSkill.names = names['912380'];
    magnusSkill.descriptions = descriptions['912380'];
    magnusSkill.active = true;

    const activatedSkill: Skill = skills['200200'];
    activatedSkill.gumi_id = 200200;
    activatedSkill.names = names['200200'];
    activatedSkill.descriptions = descriptions['200200'];
    activatedSkill.active = true;

    const effect = JSON.parse('[1, 1, 157, [200200,  1,  1,  1,  1,  1,  1,  1,  0]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(Skill.produce(activatedSkill));
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
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);

    const magnusSkill: Skill = skills['912380'];
    magnusSkill.gumi_id = 912380;
    magnusSkill.names = names['912380'];
    magnusSkill.descriptions = descriptions['912380'];
    magnusSkill.active = true;

    const activatedSkill: Skill = skills['200200'];
    activatedSkill.gumi_id = 200200;
    activatedSkill.names = names['200200'];
    activatedSkill.descriptions = descriptions['200200'];
    activatedSkill.active = true;

    const effect = JSON.parse('[1, 1, 157, [200200,  1,  3,  3,  1,  1,  1,  0,  0]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(Skill.produce(activatedSkill));
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
