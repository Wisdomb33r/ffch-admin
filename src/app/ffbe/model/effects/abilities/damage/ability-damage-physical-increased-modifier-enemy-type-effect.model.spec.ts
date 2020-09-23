import {AbilitySkillEffectFactory} from '../../ability-skill-effect.factory';
import {Skill} from '../../../skill.model';

describe('AbilityDamagePhysicalIncreasedModifierEnemyTypeEffect', () => {

  it('should parse neutral damages with increased power to dragons', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 22, [7,  0,  0,  1000]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = null;
    fakeSkill.attack_type = 'Physical';

    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts physiques neutres de puissance 100% (1000% sur les dragons) à un adversaire');
  });

  it('should parse elemental damages with increased power to avians', () => {
    // GIVEN
    const effect = JSON.parse('[1, 6, 22, [2,  0,  0,  210]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Water'];
    fakeSkill.attack_type = 'Physical';

    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts physiques d\'Eau de puissance 100% (210% sur les oiseaux) à une cible');
  });

});

