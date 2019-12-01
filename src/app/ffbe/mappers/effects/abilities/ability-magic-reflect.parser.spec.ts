import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityMagicReflectParser', () => {

  it('should parse magic reflect to caster', () => {
    // GIVEN
    const effect = JSON.parse('[1, 3, 86, [100, 1, 4]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Active le renvoi de 1 sort de magie sur le lanceur pour 4 tours');
  });

  it('should parse magic reflect to allies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 86, [100, 3, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Active le renvoi de 3 sorts de magie sur les alliés pour 1 tour');
  });

  it('should parse magic reflect without num limit nor turns limit', () => {
    // GIVEN
    const effect = JSON.parse('[3, 2, 86, [100, -1, -1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Active le renvoi des sorts de magie sur un allié au hasard');
  });

});
