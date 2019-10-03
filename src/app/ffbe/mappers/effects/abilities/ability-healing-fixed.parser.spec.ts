import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityHealingFixedParser', () => {

  it('should parse healing fixed', () => {
    // GIVEN
    const effect = JSON.parse('[2, 6, 17, [70]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Soigne 70 PM aux alliés');
  });

});
