import {PassiveEffectParserFactory} from './passive-effect-parser.factory';

describe('PassiveEffectParser', () => {
  it('should return unknown effect for unknown identifiers', () => {
    // GIVEN
    const effect = JSON.parse('[9999, 9999, 9999, [0]]');
    // WHEN
    const s = PassiveEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // replaces
    expect(s).toEqual('Effet inconnu');
  });

  it('should parse passive stats increase', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 1, [20, 10, 30, 10, 20, 10, 30]]');
    // WHEN
    const s = PassiveEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // replaces
    expect(s).toEqual('+30% MAG, +20% PV/ATT, +10% PM/DEF/PSY');
  });

  it('should parse passive ailment increase', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 2, [50, 40, 60, 50, 50, 50, 40, 20]]');
    // WHEN
    const s = PassiveEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // replaces
    expect(s).toEqual('+60% de résistance à Sommeil, +50% de résistance à Poison, Silence, Paralysie, Confusion, +40% de résistance à Cécité, Maladie, +20% de résistance à Pétrification');
  });

  it('should parse passive ailment increase for all identical values', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 2, [20, 20, 20, 20, 20, 20, 20, 20]]');
    // WHEN
    const s = PassiveEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // replaces
    expect(s).toEqual('+20% de résistance à toutes les altérations');
  });

  it('should parse passive element increase', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 3, [50, 40, 60, 50, 50, 50, 40, 20]]');
    // WHEN
    const s = PassiveEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // replaces
    expect(s).toEqual('+60% de résistance Foudre, +50% de résistance Feu, Eau, Vent, Terre, +40% de résistance Glace, Lumière, +20% de résistance Ténèbres');
  });

  it('should parse passive element increase for all identical values', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 3, [20, 20, 20, 20, 20, 20, 20, 20]]');
    // WHEN
    const s = PassiveEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // replaces
    expect(s).toEqual('+20% de résistance à tous les éléments');
  });

  it('should parse stats increase on HP threshold', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 4, [2, 40, 9999, 30, 0, -1]]');
    // WHEN
    const s = PassiveEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // replaces
    expect(s).toEqual('+40% DÉF quand les PV passent sous 30% (max 9999 fois)');
  });

  it('should parse stats increase for number of tunrs on HP threshold', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 4, [2, 40, 9999, 30, 0, 3]]');
    // WHEN
    const s = PassiveEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // replaces
    expect(s).toEqual('+40% DÉF pour 3 tours quand les PV passent sous 30% (max 9999 fois)');
  });

  it('should parse equipment category unlock', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 5, [11]]');
    // WHEN
    const s = PassiveEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // replaces
    expect(s).toEqual('Permet d\'équiper les Harpes');
  });

  it('should parse equipment category unlock for unknown', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 5, [666]]');
    // WHEN
    const s = PassiveEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // replaces
    expect(s).toEqual('Permet d\'équiper les UNKNOWN');
  });

  it('should parse EVO MAG increase', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 21, [20]]');
    // WHEN
    const s = PassiveEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // replaces
    expect(s).toEqual('+20% INV');
  });

});
