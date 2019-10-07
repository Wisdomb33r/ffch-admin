import {AbilityLbSpeedIncreaseParser} from './ability-lb-speed-increase.parser';
import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityLbSpeedIncreaseParser', () => {
  it('should parse LB speed increase for caster', () => {
    // GIVEN
    const effect = JSON.parse('[1, 3, 63, [100,  3]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+100% à la vitesse de la jauge de limite du lanceur pour 3 tours');
  });

  it('should parse LB speed increase for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 63, [300,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+300% à la vitesse de la jauge de limite du lanceur pour 1 tour');
  });

  it('should parse LB speed increase for one ally', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 63, [200,  4]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+200% à la vitesse de la jauge de limite d\'un allié pour 4 tours');
  });

  it('should parse interval of LB cryst gain for all allies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 63, [150,  5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+150% à la vitesse de la jauge de limite des alliés pour 5 tours');
  });

  it('should parse interval of LB cryst gain for all allies except caster', () => {
    // GIVEN
    const effect = JSON.parse('[2, 5, 63, [150,  3]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+150% à la vitesse de la jauge de limite des alliés sauf le lanceur pour 3 tours');
  });
});
