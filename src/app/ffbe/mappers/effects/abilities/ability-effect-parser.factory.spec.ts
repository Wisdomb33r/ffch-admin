import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityEffectParser', () => {
  it('should return unknown effect for unknown identifiers', () => {
    // GIVEN
    const effect = JSON.parse('[9999, 9999, 9999, [0]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Effet UNKNOWN');
  });

  it('should parse stats increase for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 3, [20, 10, 30, 10, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% MAG, +20% ATT, +10% DEF/PSY au lanceur pour 5 tours');
  });

  it('should parse stats increase with whole-fight duration for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 3, [20, 10, 30, 10, -1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% MAG, +20% ATT, +10% DEF/PSY au lanceur pour ce combat');
  });

});
