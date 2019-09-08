import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityEffectParser', () => {

  it('should parse stats increase for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 3, [20, 10, 30, 10, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% MAG, +20% ATT, +10% DÉF/PSY au lanceur pour 5 tours');
  });

  it('should parse stats increase with whole-fight duration for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 3, [20, 10, 30, 10, -1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% MAG, +20% ATT, +10% DÉF/PSY au lanceur pour ce combat');
  });

  it('should parse non-dispellable stats increase for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 3, [30, 0, 30, 0, 3, 1, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% ATT/MAG au lanceur pour 3 tours (bonus non-dissipable)');
  });

  it('should parse stats increase for the party', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 3, [20, 10, 30, 10, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% MAG, +20% ATT, +10% DÉF/PSY à tous les alliés pour 5 tours');
  });

  it('should parse stats increase for the rest of the party', () => {
    // GIVEN
    const effect = JSON.parse('[2, 5, 3, [20, 10, 30, 10, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% MAG, +20% ATT, +10% DÉF/PSY à tous les alliés sauf le lanceur pour 5 tours');
  });

});
