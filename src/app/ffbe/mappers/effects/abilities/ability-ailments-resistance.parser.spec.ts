import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityEffectParser', () => {

  it('should parse resistance to all status ailments for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 7, [100,  100,  100,  100,  100,  100,  100,  100,  1,  3]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+100% aux résistances aux altérations d\'état du lanceur pour 3 tours');
  });

  it('should parse resistance to status ailments for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 7, [0,  0,  0,  0,  100,  0,  50,  100,  1,  4]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+100% à la résistance Paralysie/Pétrification, +50% à la résistance Maladie du lanceur pour 4 tours');
  });

  it('should parse resistance to status ailments for all allies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 7, [50,  50,  50,  50,  50,  0,  0,  0,  1,  5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+50% à la résistance Poison/Cécité/Sommeil/Silence/Paralysie des alliés pour 5 tours');
  });

});
