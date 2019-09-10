import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityEffectParser', () => {
/*
  it('should parse element resistance increase for caster', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 33, [20, 10, 30, 10, 5]]');
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

  it('should parse stats increase for an ally', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 3, [20, 10, 30, 10, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% MAG, +20% ATT, +10% DÉF/PSY à un allié pour 5 tours');
  });
*/

  it('should parse element resistance buffs for the party', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 33, [20, 10, 30, 10, 20, 10, 30, 10, 1, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% à la résistance Foudre/Lumière, +20% à la résistance Feu/Vent, +10% à la résistance Glace/Eau/Terre/Ténèbres de tous les alliés pour 5 tours');
  });
/*
  it('should parse stats increase for the rest of the party', () => {
    // GIVEN
    const effect = JSON.parse('[2, 5, 3, [20, 10, 30, 10, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% MAG, +20% ATT, +10% DÉF/PSY à tous les alliés sauf le lanceur pour 5 tours');
  });

  it('should parse stats breaks for one enemy', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 24, [-20, 0, -30, 0, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('-30% MAG, -20% ATT à un adversaire pour 5 tours');
  });

  it('should parse stats breaks for all enemies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 24, [-20, 0, -30, 0, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('-30% MAG, -20% ATT à tous les adversaires pour 5 tours');
  });
  */
});
