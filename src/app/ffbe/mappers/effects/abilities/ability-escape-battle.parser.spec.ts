import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityEscapeBattleParser', () => {

  it('should parse single esper orb', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 51, [100]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Permet de fuir la plupart des combats');
  });

});
