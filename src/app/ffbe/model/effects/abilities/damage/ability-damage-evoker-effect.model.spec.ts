import {Skill} from '../../../skill.model';
import {SkillEffectFactory} from '../../skill-effect.factory';

describe('AbilityDamageEvokerEffect', () => {

  it('should parse evoker neutral damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 124, [0, 0, 0, 0, 0, 0, 0, 1000, 1000, [40, 60]]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'None';
    // WHEN
    const s = SkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Attaque fixe à dégâts d\'invocateur neutres de puissance 1000% (40% MAG, 60% PSY) à un adversaire');
  });

  it('should parse evoker elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 124, [0, 0, 0, 0, 0, 0, 0, 0, 4000, [0, 100]]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Fire', 'Earth', 'Light'];
    fakeSkill.attack_type = 'Magic';
    // WHEN
    const s = SkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Attaque UNKNOWN à dégâts d\'invocateur de Feu, Terre, Lumière de puissance 4000% (0% MAG, 100% PSY) aux adversaires');
  });

});
