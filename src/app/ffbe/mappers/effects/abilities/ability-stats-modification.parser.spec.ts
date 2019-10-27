import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityStatsModificationParser', () => {

  it('should parse stats increase for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 3, [20, 10, 30, 10, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% MAG, +20% ATT, +10% DÉF/PSY au lanceur pour 5 tours');
  });

  it('should parse stats increase with whole-fight duration for caster (skill 911834)', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 3, [0,  0,  20,  20,  -1,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+20% MAG/PSY au lanceur pour 9999 tours');
  });

  it('should parse non-dispellable stats increase for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 3, [30, 0, 30, 0, 3, 1, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% ATT/MAG au lanceur pour 3 tours (bonus non-dissipable)');
  });

  it('should parse stats increase for an ally', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 3, [20, 10, 30, 10, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% MAG, +20% ATT, +10% DÉF/PSY à un allié pour 5 tours');
  });


  it('should parse stats increase for the party', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 3, [20, 10, 30, 10, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% MAG, +20% ATT, +10% DÉF/PSY aux alliés pour 5 tours');
  });

  it('should parse stats increase for the rest of the party', () => {
    // GIVEN
    const effect = JSON.parse('[2, 5, 3, [20, 10, 30, 10, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% MAG, +20% ATT, +10% DÉF/PSY aux alliés sauf le lanceur pour 5 tours');
  });

  it('should parse stats breaks for one enemy', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 24, [-20, 0, -30, 0, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('-30% MAG, -20% ATT à un adversaire pour 5 tours');
  });

  it('should parse null stats breaks for one enemy', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 3, [0,  0,  0,  0,  0,  0]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('');
  });

  it('should parse stats breaks for all enemies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 24, [-20, 0, -30, 0, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('-30% MAG, -20% ATT aux adversaires pour 5 tours');
  });

  it('should parse stats increase for all allies while singing', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 58, [30,  40,  10,  20,  3,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+40% DÉF, +30% ATT, +20% PSY, +10% MAG aux alliés pour 3 tours en chantant');
  });

  it('should parse singing-only effect', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 58, [0,  0,  0,  0,  4,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Chante pour 4 tours');
  });

  it('should parse stats decrease for this turn for one enemy (skill 227804)', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 24, [0,  -50,  0,  0,  0,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('-50% DÉF à un adversaire pour ce tour');
  });

  it('should parse stats decrease for all enemies with positive coefficient and effect ID 24 (skill 912864)', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 24, [0,  60,  0,  60,  1,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('-60% DÉF/PSY aux adversaires pour 1 tour');
  });


});
