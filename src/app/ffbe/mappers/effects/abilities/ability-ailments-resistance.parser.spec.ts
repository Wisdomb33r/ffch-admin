import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityAilmentsResistanceParser', () => {

  it('should parse resistance to all status ailments for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 7, [100,  100,  100,  100,  100,  100,  100,  100,  1,  3]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+100% de rés. aux altérations au lanceur pour 3 tours');
  });

  it('should parse resistance to all status ailments for 1 turn for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 7, [50,  50,  50,  50,  50,  50,  50,  50,  1,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+50% de rés. aux altérations au lanceur pour 1 tour');
  });

  it('should parse resistance to status ailments for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 7, [0,  0,  0,  0,  100,  0,  50,  100,  1,  4]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+100% de rés. Paralysie, Pétrification, +50% de rés. Maladie au lanceur pour 4 tours');
  });

  it('should parse resistance to all status ailments for one ally', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 7, [100,  100,  100,  100,  100,  100,  100,  100,  1,  3]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+100% de rés. aux altérations à un allié pour 3 tours');
  });

  it('should parse resistance to status ailments for all allies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 7, [50,  50,  50,  50,  50,  0,  0,  0,  1,  5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+50% de rés. Poison, Cécité, Sommeil, Silence, Paralysie aux alliés pour 5 tours');
  });

});
