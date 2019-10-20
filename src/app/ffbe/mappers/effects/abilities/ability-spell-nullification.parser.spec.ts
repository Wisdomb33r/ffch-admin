import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilitySpellNullificationParser', () => {

  it('should parse enemy scan', () => {
    // GIVEN
    const effect = JSON.parse('[1, 3, 84, [1,  0,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Bloque le prochain sort de magie durant un tour');
  });

});
