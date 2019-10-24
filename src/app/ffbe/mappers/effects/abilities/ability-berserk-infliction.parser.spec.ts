import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityBerserkInflictionParser', () => {

  it('should parse berserk infliction for caster', () => {
    // GIVEN
    const effect = JSON.parse('[1, 3, 68, [3,  200]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Inflige Berserk (+200% ATT) au lanceur pour 3 tours');
  });

  it('should parse berserk infliction with ATK decrease for caster', () => {
    // GIVEN
    const effect = JSON.parse('[1, 3, 68, [3,  -20]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Inflige Berserk (-20% ATT) au lanceur pour 3 tours');
  });

  it('should parse berserk infliction on one ally until they dies', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 68, [-1,  50]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Inflige Berserk (+50% ATT) à un allié pour 9999 tours');
  });

  it('should parse berserk infliction with null damage increase on one ally but caster', () => {
    // GIVEN
    const effect = JSON.parse('[1, 5, 68, [1,  0]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Inflige Berserk (+0% ATT) à un allié sauf le lanceur pour 1 tour');
  });
});
