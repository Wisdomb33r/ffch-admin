import {AbilitySkillEffectFactory} from '../ability-skill-effect.factory';

describe('AbilityMitigationMonsterTypeEffect', () => {

  it('should parse beast physical damage mitigation to caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 153, [[1,  10], -1, -1, -1, -1, -1, 1, 99999, 1]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+10% de mitigation physique contre les bêtes au lanceur pour 99999 tours');
  });

  it('should parse machinas physical damage mitigation to party', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 153, [[6,  15], -1, -1, -1, -1, -1, -1, 3, 1]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+15% de mitigation physique contre les machines aux alliés pour 3 tours');
  });

  it('should parse beast magical damage mitigation to caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 154, [[1,  10], [2,  20], [3,  10], [4,  10], -1, -1, 0, 5, 1]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+20% de mitigation magique contre les oiseaux au lanceur pour 5 tours (bonus non-dissipable)<br />'
      + '+10% de mitigation magique contre les bêtes, aquatiques et démons au lanceur pour 5 tours (bonus non-dissipable)');
  });

});
