import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityItemStealParser', () => {

  it('should parse item steal', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 37, [0]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Vole un objet à un adversaire');
  });

  it('should parse item steal with chance', () => {
    // GIVEN
    const effect = JSON.parse('[3, 1, 37, [50]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Vole un objet à un adversaire au hasard (50% de chance)');
  });

});
