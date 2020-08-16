import {Skill} from '../../../skill.model';
import {SkillEffectFactory} from '../../skill-effect.factory';

describe('AbilityDamagePhysicalTurnDelayEffect', () => {

  it('should parse physical neutral damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 13, [1, 0, 0, 2, 5013271, 400]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'Physical';
    // WHEN
    const s = SkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts physiques neutres de puissance 400% avec délai de 1 tour à un adversaire');
  });

  it('should parse fixed attack with physical elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 13, [2, 0, 0, 2, 5013271, 300]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Fire', 'Earth', 'Light'];
    fakeSkill.attack_type = 'None';
    // WHEN
    const s = SkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Attaque fixe à dégâts physiques de Feu, Terre, Lumière de puissance 300% avec délai de 2 tours aux adversaires');
  });

});
