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

});
