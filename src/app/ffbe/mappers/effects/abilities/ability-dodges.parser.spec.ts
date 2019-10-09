import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityDodgesParser', () => {

  it('should parse single physical dodge for caster', () => {
    // GIVEN
    const effect = JSON.parse('[1, 3, 54, [1,  5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+1 esquive physique au lanceur pour 5 tours');
  });

  it('should parse multiple physical dodges for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 54, [2,  3]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+2 esquives physiques au lanceur pour 3 tours');
  });

  it('should parse single physical dodge for one ally', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 54, [2,  5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+2 esquives physiques à un allié pour 5 tours');
  });

  it('should parse single physical dodge for all allies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 54, [1,  3,  0]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+1 esquive physique aux alliés pour 3 tours');
  });

});
