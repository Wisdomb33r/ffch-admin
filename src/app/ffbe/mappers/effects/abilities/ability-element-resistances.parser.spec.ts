import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityElementResistancesParser', () => {

    it('should parse element resistance increase for caster', () => {
      // GIVEN
      const effect = JSON.parse('[0, 3, 33, [30,  0,  0,  0,  0,  0,  0,  0,  1,  3]]');
      // WHEN
      const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
      // THEN
      expect(s).toEqual('+30% de rés. Feu au lanceur pour 3 tours');
    });

  it('should parse element resistance buffs for an ally', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 33, [0, 0, 0, 0, 0, 0, 40, 40, 1, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+40% de rés. Lumière, Ténèbres à un allié pour 5 tours');
  });

  it('should parse resistance buffs to all elements for an ally', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 33, [25, 25, 25, 25, 25, 25, 25, 25, 1, 4]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+25% de rés. aux éléments à un allié pour 4 tours');
  });

  it('should parse element resistance buffs for the party', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 33, [20, 10, 30, 10, 20, 10, 30, 10, 1, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% de rés. Foudre, Lumière, +20% de rés. Feu, Vent, +10% de rés. Glace, Eau, Terre, Ténèbres aux alliés pour 5 tours');
  });

  it('should parse stats breaks for one enemy', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 33, [0, 0, 30, 0, 20, 0, 30, 0, 1, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% de rés. Foudre, Lumière, +20% de rés. Vent à un adversaire pour 5 tours');
  });

  it('should parse no stats breaks for one enemy', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 33, [0,  0,  0,  0,  0,  0,  0,  0,  1,  0]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('');
  });

  it('should parse element resistance debuffs for all enemies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 33, [20, 0, 30, 0, 20, 0, 30, 0, 1, 4]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% de rés. Foudre, Lumière, +20% de rés. Feu, Vent aux adversaires pour 4 tours');
  });

  it('should parse element resistance debuffs for all enemies for 1 turn', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 33, [0,  -80,  0,  0,  0,  0,  0,  0,  1,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('-80% de rés. Glace aux adversaires pour 1 tour');
  });

});
