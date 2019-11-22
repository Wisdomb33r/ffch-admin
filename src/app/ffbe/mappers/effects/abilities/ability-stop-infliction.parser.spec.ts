import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityStopInflictionParser', () => {
  it('should parse Stop infliction for allies allies and enemies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 4, 88, [50,  3]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Inflige Stop (50%) aux alliés et adversaires pour 3 tours');
  });

  it('should parse Stop infliction for all enemies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 88, [30,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Inflige Stop (30%) aux adversaires pour 1 tour');
  });
});
