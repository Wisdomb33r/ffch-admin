import {AbilitySkillEffectFactory} from '../../ability-skill-effect.factory';

describe('AbilityDamagePhysicalIncreasedBreakEffect', () => {

  it('should parse damages with bonus BREAK provided by a single weapon type', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 159, [4,  400,  1,  100,  0,  1]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(null);
    // THEN
    expect(s).toEqual('Physical damage (1x, ATK) with bonus BREAK damage when equipped with a Katana (400%) to one enemy');
  });

});

