import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityCoversParser', () => {

  it('should parse magical cover for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 96, [1,  0,  50,  70,  80,  100,  5,  1,  2]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('80% de chance de protéger les alliés des dégâts magiques avec mitigation de 50% à 70% des dégâts reçus pour 5 tours');
  });

  it('should parse physical cover for ally', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 96, [1,  0,  30,  30,  100,  100,  3,  1,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('100% de chance pour un allié de protéger les alliés des dégâts physiques avec mitigation de 30% des dégâts reçus pour 3 tours');
  });

});
