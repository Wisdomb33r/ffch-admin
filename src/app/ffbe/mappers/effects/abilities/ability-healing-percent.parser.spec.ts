import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityHealingPercentParser', () => {

  it('should parse HP healing percent', () => {
    // GIVEN
    const effect = JSON.parse('[4, 4, 26, [70, 70, 100]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Soigne 70% PV UNKNOWN target');
  });

  it('should parse healing percent when both HP and MP null', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 26, [30, 40, 100]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Soigne UNKNOWN % PV à un adversaire');
  });

  it('should parse healing percent', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 64, [70, 30]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Soigne 70% PV et 30% PM à un adversaire');
  });

  it('should parse healing percent when both HP and MP null', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 64, [0, 0]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Soigne UNKNOWN soins à un adversaire');
  });

});
