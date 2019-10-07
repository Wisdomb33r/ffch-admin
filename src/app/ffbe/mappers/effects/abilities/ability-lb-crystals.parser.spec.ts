import {AbilityLbCrystalsParser} from './ability-lb-crystals.parser';
import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityLbCrystalsParser', () => {
  it('should parse 1 LB cryst gain for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 125, [100,  100]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+1 cristal de limite au lanceur');
  });

  it('should parse fixed LB cryst gain for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 125, [700,  700]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+7 cristaux de limite au lanceur');
  });

  it('should parse interval of LB cryst gain for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 125, [800,  1200]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+8 à 12 cristaux de limite au lanceur');
  });

  it('should parse interval of LB cryst gain for one ally', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 125, [400,  600]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+4 à 6 cristaux de limite à un allié');
  });

  it('should parse interval of LB cryst gain for all allies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 125, [200,  300]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+2 à 3 cristaux de limite aux alliés');
  });

  it('should parse interval of LB cryst gain for all allies except caster', () => {
    // GIVEN
    const effect = JSON.parse('[2, 5, 125, [100,  500]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+1 à 5 cristaux de limite aux alliés sauf le lanceur');
  });
});
