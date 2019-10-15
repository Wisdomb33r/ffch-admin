import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityDamagesPercentParser', () => {

  it('should parse HP percent damages to caster', () => {
    // GIVEN
    const effect = JSON.parse('[1, 3, 9, [50, 50, 100]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Retire 50% des PV au lanceur');
  });

  it('should parse HP percent damages to caster with alternative params', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 9, [35,  35,  100,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Retire 35% des PV au lanceur');
  });

  it('should parse HP percent damages to all enemies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 9, [20, 30, 100]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Retire UNKNOWN% des PV aux adversaires');
  });

});
