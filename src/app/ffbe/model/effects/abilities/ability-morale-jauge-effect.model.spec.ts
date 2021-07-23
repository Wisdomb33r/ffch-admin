import {AbilitySkillEffectFactory} from '../ability-skill-effect.factory';

describe('AbilityMoraleJaugeEffect', () => {

  it('should parse morale jauge increase correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 1015, [650,  0,  0,  0,  0,  0,  0]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+6.5% au moral des alliés');
  });

  it('should parse morale jauge decrease correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 1015, [-300,  0,  0,  0,  0,  0,  0]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('-3% au moral des alliés');
  });

  it('should parse morale jauge increase per active ally correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 1015, [0,  200,  0,  0,  0,  1,  0]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+2% de moral par allié actif');
  });

  it('should parse morale jauge decrease per active ally correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 1015, [0,  -50,  0,  0,  0,  1,  0]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('-0.5% de moral par allié actif');
  });

  it('should parse combined morale jauge changes correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 1015, [-350,  400,  0,  0,  0,  0,  0]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('-3.5% au moral des alliés<br />+4% de moral par allié actif');
  });
});
