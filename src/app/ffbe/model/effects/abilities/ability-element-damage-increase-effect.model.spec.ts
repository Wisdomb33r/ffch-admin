import {AbilitySkillEffectFactory} from '../ability-skill-effect.factory';

describe('AbilityElementDamagesIncreaseEffect', () => {

  it('should parse physical elemental damages increase to caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 149, [0, [10,  0,  0,  0,  0,  0,  10,  0], 1, 99999, 0]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+10% aux dégâts physiques de Feu et Lumière infligés par le lanceur pour 99999 tours (bonus non-dissipable)');
  });

  it('should parse magical elemental damages increase to caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 149, [1, [0,  10,  10,  0,  20,  20,  0,  0], 1, 99999, 1]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+20% aux dégâts magiques de Vent et Terre, +10% aux dégâts magiques de Glace et Foudre infligés par le lanceur pour 99999 tours');
  });

});
