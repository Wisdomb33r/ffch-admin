import {AbilitySkillEffectFactory} from '../ability-skill-effect.factory';

describe('AbilityAccuracyIncreaseEffect', () => {

  it('should parse accuracy increase to all allies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 162, [50,  0,  1,  1,  1]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+50% précision aux alliés pour 1 tour');
  });

  it('should parse undispellable accuracy increase to caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 162, [200,  0,  99999,  1,  0]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+200% précision au lanceur pour 99999 tours (bonus non-dissipable)');
  });

  it('should parse accuracy decrease to an enemy', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 162, [-25,  0,  4,  1,  1]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('-25% précision à un adversaire pour 4 tours');
  });

});
