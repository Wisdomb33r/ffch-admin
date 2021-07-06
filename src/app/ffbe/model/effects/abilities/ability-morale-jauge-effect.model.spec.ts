import {AbilitySkillEffectFactory} from '../ability-skill-effect.factory';

describe('AbilityMoraleJaugeEffect', () => {

  it('should parse morale jauge increase correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 1015, [650,  0,  0,  0,  0,  0,  0]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+6.5% à la jauge de moral');
  });

  it('should parse morale jauge decrease correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 1015, [-300,  0,  0,  0,  0,  0,  0]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('-3% à la jauge de moral');
  });

  it('should parse morale jauge increase per active ally correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 1015, [0,  200,  0,  0,  0,  1,  0]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+2% à la jauge de moral par allié actif');
  });

  it('should parse morale jauge decrease per active ally correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 1015, [0,  -50,  0,  0,  0,  1,  0]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('-0.5% à la jauge de moral par allié actif');
  });

  it('should parse combined morale jauge changes correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 1015, [-350,  400,  0,  0,  0,  0,  0]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('-3.5% à la jauge de moral<br />+4% à la jauge de moral par allié actif');
  });
});
