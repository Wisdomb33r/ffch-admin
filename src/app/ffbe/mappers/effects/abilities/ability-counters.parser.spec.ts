import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityCountersParser', () => {

  it('should parse counters to allies but caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 123, [50,  1,  150,  5,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('50% de chance pour le lanceur de contrer les dégâts physiques encaissés par les autres alliés par une attaque de puissance 150% pour 5 tours (max 1 par tour)');
  });

  it('should parse counters to allies but caster with SPR scaling and no limit per turn', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 123, [100,  4,  1000,  1,  1,  0]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('100% de chance pour le lanceur de contrer les dégâts physiques encaissés par les autres alliés par une attaque de puissance 1000% calculée sur la PSY pour 1 tour');
  });

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
