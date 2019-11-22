import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityDebuffsStealParser', () => {

  it('should parse steal debuffs and imperils for one ally', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 133, [1, 0, 1, 1, 0, 0, 0, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Vole les baisses de ATT/MAG/PSY et de résistances à un allié');
  });

  it('should parse steal debuffs for allies except caster', () => {
    // GIVEN
    const effect = JSON.parse('[2, 5, 133, [1, 1, 0, 0, 0, 0, 0, 0]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Vole les baisses de ATT/DÉF aux alliés sauf le lanceur');
  });

});
