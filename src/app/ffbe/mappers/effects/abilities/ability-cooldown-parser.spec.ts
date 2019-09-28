import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

fdescribe('AbilityCooldownParser', () => {
  it('should parse cooldowns with three items and same values in array', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 130, [507362, 1, [2,  2]]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('(Une fois tous les 3 tours)<br />507362<br />Disponible dès le tour 1');
  });

  it('should parse cooldowns with three items and different values in array', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 130, [911992, 1, [6,  0]]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('(Une fois tous les 7 tours)<br />911992<br />Disponible dès le tour 7');
  });

  it('should parse cooldowns with four items, pair = (0, 0) and values in array = (4, 4)', () => {
    // GIVEN
    const effect = JSON.parse(' [0, 3, 130, [507530, 0, [4,  4], 0]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('(Une fois tous les 5 tours)<br />507530<br />Disponible dès le tour 5');
  });
});
