import {Skill} from '../../../skill.model';
import {AbilitySkillEffectFactory} from '../../ability-skill-effect.factory';

describe('AbilityDamageMagicMpIncreasedEffect', () => {

  it('should parse magic light damages power-increased by MP used', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 169, [4, 60, 2, 100]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Light'];
    fakeSkill.attack_type = 'Magic';
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts magiques de Lumière de puissance 100% (+60% par PM consommé) aux adversaires');
  });

});
