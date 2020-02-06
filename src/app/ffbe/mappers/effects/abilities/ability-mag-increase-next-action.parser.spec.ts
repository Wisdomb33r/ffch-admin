import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityMagIncreaseNextAction', () => {
  it('should parse mag increase for next action', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 90, [100, 100, 0]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+100% MAG pour la prochaine action du lanceur');
  });

  it('should parse mag cumulative increase for next action', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 90, [10, 100, 0]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+10% MAG pour la prochaine action du lanceur (cumulable, +100% max)');
  });
});
