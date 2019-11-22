import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityDispelsParser', () => {
  it('should parse all dispels', () => {
    // GIVEN
    const effect = JSON.parse('[2, 4, 59, ["none"]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Dissipe les bonus et malus des alliés et adversaires');
  });

  it('should parse buffs dispels', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 59, [1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Dissipe les bonus d\'un adversaire');
  });

  it('should parse debuffs dispels', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 59, [2]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Dissipe les malus des alliés');
  });
});
