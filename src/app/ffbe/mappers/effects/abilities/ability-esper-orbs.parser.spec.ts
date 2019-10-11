import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityEsperOrbsParser', () => {

  it('should parse single esper orb', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 32, [1,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+1 sphère de chimère');
  });

  it('should parse single optional esper orb', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 32, [0,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+0 à 1 sphère de chimère');
  });

  it('should parse multiples esper orbs', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 32, [3,  5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+3 à 5 sphères de chimère');
  });

});
