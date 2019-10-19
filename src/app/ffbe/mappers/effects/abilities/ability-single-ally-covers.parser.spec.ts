import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilitySingleAllyCoversParser', () => {

  it('should parse general single-ally cover for caster', () => {
    // GIVEN
    const effect = JSON.parse('[1, 5, 118, [50,  50,  100,  3,  1,  0]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('100% de chance pour le lanceur de protéger un allié sauf le lanceur des dégâts physiques et magiques avec mitigation de 50% des dégâts reçus pour 3 tours');
  });

});
