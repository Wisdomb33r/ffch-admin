import {AbilitySkillEffectFactory} from '../ability-skill-effect.factory';

describe('AbilityMoraleJaugeEffect', () => {

  it('should parse morale jauge filling', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 1015, [650,  0,  0,  0,  0,  0,  0]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+650 à la jauge de moral');
  });
});
