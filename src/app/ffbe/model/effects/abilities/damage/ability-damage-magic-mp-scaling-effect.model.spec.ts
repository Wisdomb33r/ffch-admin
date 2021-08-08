import {Skill} from '../../../skill.model';
import {AbilitySkillEffectFactory} from '../../ability-skill-effect.factory';

describe('AbilityDamageMagicMpScalingEffect', () => {

  it('should parse magic light damages scaling on MP with 1.25x multiplicator', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 105, [125, 9000, 400]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Light'];
    fakeSkill.attack_type = 'Magic';
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts magiques de Lumière calculés sur les PM (multipliés par 1.25x, max 7200) de puissance 400% aux adversaires');
  });

});
