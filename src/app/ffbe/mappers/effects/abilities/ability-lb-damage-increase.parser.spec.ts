import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityLbDamageIncreaseParser', () => {

  it('should parse LB damage increase for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 120, [25,  2,  1,  0]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+25% aux dégâts de la limite du lanceur pour 2 tours (bonus non-dissipable)');
  });

  it('should parse dispellable LB damage increase for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 120, [30,  5,  1,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% aux dégâts de la limite du lanceur pour 5 tours');
  });

  it('should parse LB damage increase for 1 turn for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 120, [50,  1,  1,  0]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+50% aux dégâts de la limite du lanceur pour 1 tour (bonus non-dissipable)');
  });

  it('should parse LB damage increase for one ally', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 120, [15,  3,  1,  0]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+15% aux dégâts de la limite d\'un allié pour 3 tours (bonus non-dissipable)');
  });

});
