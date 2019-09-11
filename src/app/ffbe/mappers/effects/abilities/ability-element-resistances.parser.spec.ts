import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityEffectParser', () => {

    it('should parse element resistance increase for caster', () => {
      // GIVEN
      const effect = JSON.parse('[0, 3, 33, [30,  0,  0,  0,  0,  0,  0,  0,  1,  3]]');
      // WHEN
      const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
      // THEN
      expect(s).toEqual('+30% à la résistance Feu du lanceur pour 3 tours');
    });

  it('should parse element resistance buffs for an ally', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 33, [0, 0, 0, 0, 0, 0, 40, 40, 1, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+40% à la résistance Lumière/Ténèbres d\'un allié pour 5 tours');
  });

  it('should parse resistance buffs to all elements for an ally', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 33, [25, 25, 25, 25, 25, 25, 25, 25, 1, 4]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+25% à la résistance à tous les éléments d\'un allié pour 4 tours');
  });

  it('should parse element resistance buffs for the party', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 33, [20, 10, 30, 10, 20, 10, 30, 10, 1, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% à la résistance Foudre/Lumière, +20% à la résistance Feu/Vent, +10% à la résistance Glace/Eau/Terre/Ténèbres de tous les alliés pour 5 tours');
  });

  it('should parse stats breaks for one enemy', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 33, [0, 0, 30, 0, 20, 0, 30, 0, 1, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% à la résistance Foudre/Lumière, +20% à la résistance Vent de l\'adversaire pour 5 tours');
  });

  it('should parse element resistance debuffs for all enemies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 33, [20, 0, 30, 0, 20, 0, 30, 0, 1, 4]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% à la résistance Foudre/Lumière, +20% à la résistance Feu/Vent de tous les adversaires pour 4 tours');
  });

});
