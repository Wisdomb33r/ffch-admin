import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityDebuffsCureParser', () => {

  it('should parse remove debuffs for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 111, [1, 1, 0, 1, 1, 0]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Soigne les baisses de ATT/DÉF/PSY et Stop au lanceur');
  });

  it('should parse remove debuffs for allies except caster', () => {
    // GIVEN
    const effect = JSON.parse('[2, 5, 111, [0, 0, 0, 0, 0, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Soigne Charme aux alliés sauf le lanceur');
  });

});
