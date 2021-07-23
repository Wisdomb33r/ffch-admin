import {AbilitySkillEffectFactory} from '../ability-skill-effect.factory';

describe('AbilityTemporaryRemovalFromFightEffect', () => {

  it('should parse removal of caster from fight for one turn', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 53, [1,  1]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('Retire le lanceur du combat pour 1 tour');
  });

  it('should parse removal of caster from fight for a fixed number of turns', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 53, [2,  2]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('Retire le lanceur du combat pour 2 tours');
  });

  it('should parse removal of caster from fight for a variable number of turns', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 53, [3,  5]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('Retire le lanceur du combat pour 3 à 5 tours');
  });

  it('should parse removal of caster from fight for one to a variable number of turns', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 53, [1,  2]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('Retire le lanceur du combat pour 1 à 2 tours');
  });

});
