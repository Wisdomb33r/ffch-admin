import {AbilitySkillEffectFactory} from '../ability-skill-effect.factory';

describe('AbilityZombieCureEffect', () => {

  it('should parse zombie cure to random ally', () => {
    // GIVEN
    const effect = JSON.parse('[3, 2, 148, ["whatever", "parameter"]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('Soigne Zombie à un allié au hasard');
  });

});
