import {SkillMockDataHelper} from '../../../skill.model.spec';
import {SkillsServiceMock} from '../../../../services/skills.service.spec';
import {SkillsService} from '../../../../services/skills.service';
import {PassiveSkillEffectFactory} from '../../passive-skill-effect.factory';
import {Skill} from '../../../skill.model';
import {HTML_LINE_RETURN} from '../../../../mappers/effects/skill-effects.mapper';

describe('PassiveSkillBattleStartActivationEffect', () => {

  it('should parse battle start or raising activation effect (effectId 35)', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 35, [100020]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValue(SkillMockDataHelper.mockPassiveSkill(100020));
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('Effet activé en début de combat ou après résurrection: +20% PV');
  });

  it('should parse battle start or raising activation effect (effectId 56)', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 56, [100020]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValue(SkillMockDataHelper.mockPassiveSkill(100020));
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('Effet activé en début de combat ou après résurrection: +20% PV');
  });

  it('should parse battle start activation effect', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 103, [501090,  0,  0]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValue(SkillMockDataHelper.mockAbilitySkill(501090));
    // WHEN
    const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('Effet activé en début de combat: +80% ATT/MAG aux alliés pour 1 tour');
  });

  it('should return activated-by-activated skills for battle start activation effect', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 103, [509014,  0,  0]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(
      SkillMockDataHelper.mockAbilitySkill(509014), SkillMockDataHelper.mockAbilitySkill(912380),
      SkillMockDataHelper.mockAbilitySkill(912380), SkillMockDataHelper.mockAbilitySkill(912380));
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);
    // WHEN
    const s = skillEffect.wordEffect(undefined);
    const activatedSkills = skillEffect.getActivatedSkills(new Skill());

    // THEN
    expect(s).toEqual('Effet activé en début de combat: +250% ATT au lanceur pour 6 tours' + HTML_LINE_RETURN
      + 'Effet activé en début de combat: Soigne les baisses de ATT/DÉF/MAG/PSY au lanceur' + HTML_LINE_RETURN
      + 'Effet activé en début de combat: +100% de rés. aux baisses de ATT/DÉF/MAG/PSY au lanceur pour 6 tours' + HTML_LINE_RETURN
      + 'Effet activé en début de combat: Donne accès à <a href="ffexvius_skills.php?gumiid=912380">Fouet triple</a> pour 5 tours');
    expect(Array.isArray(activatedSkills)).toBeTrue();
    expect(activatedSkills.length).toEqual(1);
    expect(mySpy).toHaveBeenCalledTimes(3);
    expect(mySpy).toHaveBeenCalledWith(509014);
    expect(mySpy).toHaveBeenCalledWith(912380);
    expect(activatedSkills[0]?.gumi_id).toEqual(912380);
  });

  it('should return empty activated skills array upon parameterError in battle start activator skill', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 35, []]');
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const activatedSkills = skillEffect.getActivatedSkills(new Skill());

    // THEN
    expect(activatedSkills).toEqual([]);
  });
});
