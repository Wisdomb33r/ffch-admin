import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityProvocationsParser', () => {

  it('should parse single-turn provocations for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 61, [50,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+50% de chances pour le lanceur d\'être ciblé pour 1 tour');
  });

  it('should parse multi-turn provocations for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 61, [100,  3]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+100% de chances pour le lanceur d\'être ciblé pour 3 tours');
  });

  it('should parse provocations for one ally', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 61, [100,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+100% de chances pour un allié d\'être ciblé pour 1 tour');
  });

});
