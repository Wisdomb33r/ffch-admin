import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityRaiseAutoParser', () => {

  it('should parse auto-raise for all allies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 27, [60, 4]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Active Auréole (60% de PV) aux alliés pour 4 tours');
  });

  it('should parse auto-raise for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 27, [50, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Active Auréole (50% de PV) au lanceur pour 1 tour');
  });

});
