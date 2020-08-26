import {AbilitySkillEffectFactory} from '../ability-skill-effect.factory';

describe('AbilityMitigationMonsterTypeEffect', () => {

  it('should parse beast physical damage mitigation to caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 149, [[1,  10], -1, -1, -1, -1, -1, 0, 99999, 1]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+10% de mitigation physique contre les bêtes au lanceur pour 99999 tours');
  });

  it('should parse beast magical damage mitigation to caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 150, [[1,  10], -1, -1, -1, -1, -1, 0, 99999, 1]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+10% de mitigation magique contre les bêtes au lanceur pour 99999 tours');
  });

});
