import {SkillMockDataHelper} from '../../../skill.model.spec';
import {Skill} from '../../../skill.model';
import {SkillsService} from '../../../../services/skills.service';
import {SkillsServiceMock} from '../../../../services/skills.service.spec';
import {AbilitySkillEffectFactory} from '../../ability-skill-effect.factory';

describe('AbilitySkillDelayedEffect', () => {
  it('should parse delayed skill on caster after 3 turns', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 132, [200190,  0,  3,  100,  0,  4]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(SkillMockDataHelper.mockAbilitySkill(200190));
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(200190);
    expect(s).toEqual('<br />Activation <strong>3 tours plus tard</strong>:<br />Soigne 10 PM + 0.05x la PSY + 0.01x la MAG du lanceur aux alliés sur 3 tours');
  });

  it('should parse delayed skill on all allies after 1 turn', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 132, [200190,  0,  1,  100,  0,  233166]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(SkillMockDataHelper.mockAbilitySkill(200190));
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(200190);
    expect(s).toEqual('<br />Activation <strong>1 tour plus tard</strong>:<br />Soigne 10 PM + 0.05x la PSY + 0.01x la MAG du lanceur aux alliés sur 3 tours');
  });

  it('should parse delayed transitive skills activation', () => {
    // GIVEN
    const skill1: Skill = SkillMockDataHelper.mockAbilitySkill(912791);
    const skill2: Skill = SkillMockDataHelper.mockAbilitySkill(912792);
    const skill3: Skill = SkillMockDataHelper.mockAbilitySkill(912793);

    const effect = JSON.parse('[0, 3, 132, [912791,  1,  1,  100,  1,  912785]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(skill1, skill2, skill3);
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(3);
    expect(mySpy).toHaveBeenCalledWith(912791);
    expect(mySpy).toHaveBeenCalledWith(912792);
    expect(mySpy).toHaveBeenCalledWith(912793);
    expect(s).toEqual('<br />'
      + 'Activation <strong>1 tour plus tard</strong>:<br />'
      + '+280% MAG au lanceur pour 1 tour (bonus non-dissipable)<br />'
      + 'Dégâts magiques neutres de puissance 1700% (ignore 50% PSY, 3400% total) aux adversaires (ignore les reflets)<br />'
      + '<br />'
      + 'Activation <strong>2 tours plus tard</strong>:<br />'
      + '+290% MAG au lanceur pour 1 tour (bonus non-dissipable)<br />'
      + 'Dégâts magiques neutres de puissance 1800% (ignore 50% PSY, 3600% total) aux adversaires (ignore les reflets)<br />'
      + '<br />'
      + 'Activation <strong>3 tours plus tard</strong>:<br />'
      + '+300% MAG au lanceur pour 3 tours (bonus non-dissipable)<br />'
      + 'Dégâts magiques neutres de puissance 2000% (ignore 50% PSY, 4000% total) aux adversaires (ignore les reflets)');
  });

  it('should parse multiple delayed skills activation', () => {
    // GIVEN
    const skill1: Skill = SkillMockDataHelper.mockAbilitySkill(512175);
    const skill2: Skill = SkillMockDataHelper.mockAbilitySkill(512176);

    const effect = JSON.parse('[2, 2, 130, [512175, 1, [3,  3], 0]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(skill1, skill2, skill2, skill2);
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(new Skill());
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(4);
    expect(mySpy).toHaveBeenCalledWith(512175);
    expect(mySpy).toHaveBeenCalledWith(512176);
    expect(s).toEqual('Disponible tous les 4 tours dès le tour 1:<br />'
      + '+1 esquive physique aux alliés pour 1 tour<br />'
      + '<br />'
      + 'Activation <strong>1 tour plus tard</strong>:<br />'
      + '+1 esquive physique aux alliés pour 1 tour<br />'
      + '<br />'
      + 'Activation <strong>2 tours plus tard</strong>:<br />'
      + '+1 esquive physique aux alliés pour 1 tour<br />'
      + '<br />'
      + 'Activation <strong>3 tours plus tard</strong>:<br />'
      + '+1 esquive physique aux alliés pour 1 tour');
  });

});
