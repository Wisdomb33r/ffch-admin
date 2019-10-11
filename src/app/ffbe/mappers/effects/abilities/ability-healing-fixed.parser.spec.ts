import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityHealingFixedParser', () => {

  it('should parse healing fixed to group', () => {
    // GIVEN
    const effect = JSON.parse('[2, 6, 16, [70]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Soigne 70 PV au groupe d\'une cible');
  });

  it('should parse healing fixed to target', () => {
    // GIVEN
    const effect = JSON.parse('[1, 6, 17, [70]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Soigne 70 PM à une cible');
  });

  it('should parse healing fixed to random ally', () => {
    // GIVEN
    const effect = JSON.parse('[3, 2, 65, [700, 70]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Soigne 700 PV et 70 PM à un allié au hasard');
  });

});
