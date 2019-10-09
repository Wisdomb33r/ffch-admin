import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityRaiseParser', () => {

  it('should parse raise for all allies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 4, [60]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Ranime avec 60% de PV les alliés');
  });

  it('should parse raise for one ally', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 4, [50]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Ranime avec 50% de PV un allié');
  });

  it('should parse raise for all allies', () => {
    // GIVEN
    const effect = JSON.parse('[1, 6, 4, [80]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Ranime avec 80% de PV un allié ou inflige Mort à une cible mort-vivante');
  });

});
