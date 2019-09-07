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
    const effect = JSON.parse('[0, 3, 1, [20,  10,  30,  10,  20,  10,  30]]');
    // WHEN
    const s = PassiveEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // replaces
    expect(s).toEqual('+30% MAG, +20% PV/ATT, +10% PM/DEF/PSY');
  });

});
