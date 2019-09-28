import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

fdescribe('AbilityCooldownParser', () => {
  it('should parse cooldowns with three items and same value in array', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 130, [507362, 1, [2,  2]]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('(Une fois tous les 3 tours)<br />507362<br />Disponible dès le tour 1');
  });
});
