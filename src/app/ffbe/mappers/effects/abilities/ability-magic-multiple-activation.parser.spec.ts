import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityDamagesPhysicalJumpDelayParser', () => {

  it('should parse dual cast black magic effect 44', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 44, ["none"]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Permet l\'utilisation des sorts de magie noire 2x par tour');
  });

  it('should parse dual cast all magic effect 45', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 45, ["none"]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Permet l\'utilisation des sorts de magie 2x par tour');
  });

  it('should parse dual cast all magic', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 52, [0, 2, 123456]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Permet l\'utilisation des sorts de magie 2x par tour');
  });

  it('should parse triple cast black magic', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 52, [1, 3, 123456]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Permet l\'utilisation des sorts de magie noire 3x par tour');
  });

  it('should parse quad cast white/green magic', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 52, [2, 3, 4, 4, 123456, 123456]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Permet l\'utilisation des sorts de magie blanche et verte 4x par tour');
  });

});
