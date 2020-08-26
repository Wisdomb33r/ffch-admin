import {Skill} from '../../../skill.model';
import {AbilitySkillEffectFactory} from '../../ability-skill-effect.factory';

describe('AbilityDamagePhysicalConsecutiveIncreaseEffect', () => {

  it('should parse physical neutral damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 126, [1, 0, 0, 300, 250, 250, 5]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'Physical';
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts physiques neutres de puissance 550% (+250% par utilisation successive, 4x, max 1550%) à un adversaire');
  });

  it('should parse fixed attack with physical elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 126, [1, 0, 0, 400, 400, 400, 6]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Fire', 'Earth', 'Light'];
    fakeSkill.attack_type = 'None';
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Attaque fixe à dégâts physiques de Feu, Terre, Lumière de puissance 800% (+400% par utilisation successive, 5x, max 2800%) aux adversaires');
  });

});
