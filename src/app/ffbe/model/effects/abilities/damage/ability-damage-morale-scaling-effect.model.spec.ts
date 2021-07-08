import {Skill} from '../../../skill.model';
import {AbilitySkillEffectFactory} from '../../ability-skill-effect.factory';

describe('AbilityDamageMoraleScalingEffect', () => {

  it('should parse magic morale-scaling damage', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 1016, [2000,  2,  3,  2000,  5,  100,  1]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'Physical';
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Attaque physique à dégâts magiques neutres de puissance 2000% (+2000% par tranche de 5% de moral au-dessus de 100%, max 42000%) à un adversaire');
  });

  it('should parse hybrid morale-scaling damage', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 1016, [7500,  3,  0,  2700,  10,  100,  0]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'Hybrid';
    fakeSkill.element_inflict = ['Fire'];
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts hybrides de Feu de puissance 7500% (+2700% par tranche de 10% de moral au-dessus de 100%, max 34500%) à un adversaire');
  });

});
