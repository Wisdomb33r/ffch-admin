import {SkillMockDataHelper} from '../../../skill.model.spec';
import {Skill} from '../../../skill.model';
import {SkillsService} from '../../../../services/skills.service';
import {HTML_LINE_RETURN} from '../../../../mappers/effects/skill-effects.mapper';
import {SkillsServiceMock} from '../../../../services/skills.service.spec';
import {AbilitySkillEffectFactory} from '../../ability-skill-effect.factory';

describe('AbilityCooldownEffect', () => {
  it('should parse cooldown skills available on turn 1', () => {
    // GIVEN
    const cooldownActivated: Skill = SkillMockDataHelper.mockAbilitySkill(509014);
    const multiSkillActivated: Skill = SkillMockDataHelper.mockAbilitySkill(912380);

    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(cooldownActivated, multiSkillActivated);

    const effect = JSON.parse('[0, 3, 130, [509014, 1, [7,  7], 0]]');

    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(new Skill());
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(2);
    expect(mySpy).toHaveBeenCalledWith(509014);
    expect(mySpy).toHaveBeenCalledWith(912380);

    expect(s).toEqual('Disponible tous les 8 tours dès le tour 1:' + HTML_LINE_RETURN
      + '+250% ATT au lanceur pour 6 tours' + HTML_LINE_RETURN
      + 'Soigne les baisses de ATT/DÉF/MAG/PSY au lanceur' + HTML_LINE_RETURN
      + '+100% de rés. aux baisses de ATT/DÉF/MAG/PSY au lanceur pour 6 tours' + HTML_LINE_RETURN
      + 'Donne accès à <a href="ffexvius_skills.php?gumiid=912380">Fouet triple</a> pour 4 tours');
  });

  it('should parse cooldown skills available on turn N, same as cooldown N', () => {
    // GIVEN
    const cooldownActivator: Skill = new Skill();
    const cooldownActivated: Skill = SkillMockDataHelper.mockAbilitySkill(200200);

    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(cooldownActivated);

    const effect = JSON.parse('[0, 3, 130, [200200, 1, [6,  0]]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(cooldownActivator);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(200200);
    expect(s).toEqual('Disponible tous les 7 tours dès le tour 7:<br />Dégâts physiques neutres de puissance 110% aux adversaires');
    expect(cooldownActivator.attack_count.length).toEqual(1);
    expect(cooldownActivator.attack_count[0]).toEqual(3);
    expect(cooldownActivator.attack_frames.length).toEqual(1);
    expect(cooldownActivator.attack_frames[0].length).toEqual(3);
    expect(cooldownActivator.attack_frames.join('/')).toEqual('2,5,8');
    expect(cooldownActivator.attack_damage.length).toEqual(1);
    expect(cooldownActivator.attack_damage[0].length).toEqual(3);
    expect(cooldownActivator.attack_damage.join('/')).toEqual('33,33,34');
  });

  it('should parse cooldowns skills available on turn M, less than cooldown N', () => {
    // GIVEN
    const cooldownActivator: Skill = new Skill();
    const cooldownActivated: Skill = SkillMockDataHelper.mockAbilitySkill(509624);

    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(cooldownActivated);

    const effect = JSON.parse('[0, 3, 130, [509624, 1, [5,  2], 1]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(cooldownActivator);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(509624);
    expect(s).toEqual('Disponible tous les 6 tours dès le tour 4:<br />' +
      'Dégâts physiques neutres de puissance 25% (ignore 50% DÉF, 50% total) à un adversaire (ignore les couvertures)<br />' +
      'Dégâts physiques neutres de puissance 50% (ignore 50% DÉF, 100% total) à un adversaire (ignore les couvertures)<br />' +
      'Dégâts physiques neutres de puissance 500% (ignore 50% DÉF, 1000% total) à un adversaire (ignore les couvertures)');

    expect(cooldownActivator.attack_count.length).toEqual(3);
    expect(cooldownActivator.attack_count.join('/')).toEqual('4/3/1');

    expect(cooldownActivator.attack_frames.length).toEqual(3);
    expect(cooldownActivator.attack_frames.join('/')).toEqual('70,76,82,88/94,100,106/112');

    expect(cooldownActivator.attack_damage.length).toEqual(3);
    expect(cooldownActivator.attack_damage.join('/')).toEqual('25,25,25,25/30,30,40/100');
  });

  it('should parse cooldowns skills that trigger only once when dual-wielding', () => {
    // GIVEN
    const cooldownActivator: Skill = new Skill();
    cooldownActivator.attack_type = 'Hybrid';
    const cooldownActivated: Skill = SkillMockDataHelper.mockAbilitySkill(509624);

    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(cooldownActivated);

    const effect = JSON.parse('[0, 3, 130, [509624, 1, [5,  2], 0]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(cooldownActivator);
    // THEN
    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(mySpy).toHaveBeenCalledWith(509624);
    expect(s).toEqual('Disponible tous les 6 tours dès le tour 4:<br />' +
      'Dégâts physiques neutres de puissance 25% (ignore 50% DÉF, 50% total) à un adversaire (ignore les couvertures)<br />' +
      'Dégâts physiques neutres de puissance 50% (ignore 50% DÉF, 100% total) à un adversaire (ignore les couvertures)<br />' +
      'Dégâts physiques neutres de puissance 500% (ignore 50% DÉF, 1000% total) à un adversaire (ignore les couvertures)<br />' +
      'Ne s\'active qu\'<strong>une fois</strong> si l\'unité porte deux armes');
  });

  it('should return empty activated skills array upon parameterError in cooldown skill', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 130, []]');
    const skillEffect = AbilitySkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const activatedSkills = skillEffect.getActivatedSkills();

    // THEN
    expect(activatedSkills).toEqual([]);
  });
});
