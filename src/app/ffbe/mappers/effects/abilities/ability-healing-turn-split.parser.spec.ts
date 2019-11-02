import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityHealingTurnSplitParser', () => {

  it('should parse HP healing split over turns without mod', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 8, [0, 1, 1000, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Soigne 1000 PV au lanceur sur 5 tours');
  });

  it('should parse HP healing every turn', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 8, [0, 1, 1000, -1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Soigne 1000 PV au lanceur chaque tour');
  });

  it('should parse HP healing split over turns with mod', () => {
    // GIVEN
    const effect = JSON.parse('[1, 3, 8, [150, 1, 300, 3]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Soigne 300 PV + 0.75x la PSY + 0.15x la MAG du lanceur au lanceur sur 3 tours');
  });

  it('should parse MP healing split over turns with mod', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 30, [20, 1, 60, 4]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Soigne 60 PM + 0.1x la PSY + 0.02x la MAG du lanceur à un allié sur 4 tours');
  });

  it('should parse HP healing split over turns while singing', () => {
    // GIVEN
    const effect = JSON.parse('[2, 5, 56, [120, 1, 140, 2]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Soigne 140 PV + 0.6x la PSY + 0.12x la MAG du lanceur aux alliés sauf le lanceur sur 2 tours en chantant');
  });

  it('should parse PM healing split over turns while singing', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 57, [20, 1, 60, 4]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Soigne 60 PM + 0.1x la PSY + 0.02x la MAG du lanceur aux alliés sur 4 tours en chantant');
  });

});
