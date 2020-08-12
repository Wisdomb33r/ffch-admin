import {Skill} from '../../../skill.model';
import {SkillEffectFactory} from '../../skill-effect.factory';

describe('AbilityDamagePhysicalDefScalingEffect', () => {

  it('should parse physical neutral damages scaling on DEF', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 102, [100, 99999, 300]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'Physical';
    // WHEN
    const s = SkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts physiques neutres calculés sur la DÉF de puissance 300% à un adversaire');
  });

  it('should parse magic attack with physical elemental damages scaling on DEF', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 102, [100, 9999, 500]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Ice', 'Lightning', 'Wind'];
    fakeSkill.attack_type = 'Magic';
    // WHEN
    const s = SkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Attaque magique à dégâts physiques de Glace, Foudre, Vent calculés sur la DÉF de puissance 500% aux adversaires');
  });

});
