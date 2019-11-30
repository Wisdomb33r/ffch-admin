import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityCountersToCasterParser', () => {

  it('should parse counters based on ATK with no limit per turn', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 119, [50,  1,  100,  1,  0]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('50% de chance pour le lanceur de contrer les dégâts physiques par une attaque de puissance 100% pour 1 tour');
  });

  it('should parse counters with SPR scaling', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 119, [100,  4,  700,  3,  1,  5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('100% de chance pour le lanceur de contrer les dégâts physiques par une attaque de puissance 700% calculée sur la PSY pour 3 tours (max 5 par tour)');
  });

});
