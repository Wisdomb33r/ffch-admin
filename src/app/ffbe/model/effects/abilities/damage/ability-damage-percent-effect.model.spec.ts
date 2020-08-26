import {AbilitySkillEffectFactory} from '../../ability-skill-effect.factory';

describe('AbilityDamagePercentEffect', () => {

  it('should parse HP percent damages to caster', () => {
    // GIVEN
    const effect = JSON.parse('[1, 3, 9, [50, 50, 100]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(null);
    // THEN
    expect(s).toEqual('Retire 50% des PV au lanceur');
  });

  it('should parse HP percent damages to caster with alternative params', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 9, [35,  35,  100,  1]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(null);
    // THEN
    expect(s).toEqual('Retire 35% des PV au lanceur');
  });

  it('should parse HP percent damages to all enemies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 9, [20, 30, 100]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(null);
    // THEN
    expect(s).toEqual('Effet AbilityDamagePercentEffect inconnu: Mauvaise liste de paramètres');
  });

});
