import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityThrowItemsParser', () => {
  it('should parse throw items', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 50, ["none"]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Permet d\'utiliser les objets lançables');
  });
});
