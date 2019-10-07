import {AbilityMitigationsParser} from './ability-mitigations.parser';
import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityMitigationsParser', () =>{
  it('should parse damage mitigation for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 101, [30,  3,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% de mitigation générale au lanceur pour 3 tours');
  });

  it('should parse damage mitigation for one ally except caster', () => {
    // GIVEN
    const effect = JSON.parse('[1, 5, 101, [70,  1,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+70% de mitigation générale à un allié sauf le lanceur pour 1 tour');
  });

  it('should parse physical damage mitigation for one ally', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 18, [30,  3,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% de mitigation physique à un allié pour 3 tours');
  });

  it('should parse magical damage mitigation for all allies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 19, [25,  3,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+25% de mitigation magique aux alliés pour 3 tours');
  });
});
