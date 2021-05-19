import {AbilitySkillEffectFactory} from '../ability-skill-effect.factory';

describe('AbilityMagIncreaseNextAction', () => {
  it('should parse mag increase for next action', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 90, [100, 100, 0]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+100% MAG pour la prochaine action du lanceur');
  });

  it('should parse mag cumulative increase for next action', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 90, [10, 100, 0]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+10% MAG pour la prochaine action du lanceur (cumulable, +100% max)');
  });
});
