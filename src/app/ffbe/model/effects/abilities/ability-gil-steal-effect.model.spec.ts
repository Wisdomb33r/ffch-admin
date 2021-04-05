import {AbilitySkillEffectFactory} from '../ability-skill-effect.factory';

describe('AbilityGilStealEffect', () => {

  it('should parse gil steal', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 76, [80, 100]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('Vole 80% à 100% des gils d\'un adversaire');
  });
});
