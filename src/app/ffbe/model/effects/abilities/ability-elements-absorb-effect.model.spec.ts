import {AbilitySkillEffectFactory} from '../ability-skill-effect.factory';

describe('AbilityElementResistancesEffect', () => {

  it('should parse element absorb activation to allies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 1017, [1,  0,  0,  1,  0,  0,  0,  0,  1,  1]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('Active l\'absorption des dégâts d\'élément Feu ou Eau aux alliés pour 1 tour');
  });

});
