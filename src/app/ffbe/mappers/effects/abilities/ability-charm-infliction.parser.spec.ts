import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityCharmInflictionParser', () => {
  it('should parse Charm infliction on caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 60, [2, 100, "MST_ABILITY_PARAM_MSG_912522"]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Inflige Charme (100%) au lanceur pour 2 tours');
  });

  it('should parse Charm infliction on the rest of the party', () => {
    // GIVEN
    const effect = JSON.parse('[2, 5, 60, [3, 20, "MST_ABILITY_PARAM_MSG_208140"]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Inflige Charme (20%) aux alliés sauf le lanceur pour 3 tours');
  });

  it('should parse Charm infliction on one enemy', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 60, [1, 25, "MST_ABILITY_PARAM_MSG_910426"]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Inflige Charme (25%) à un adversaire pour 1 tour');
  });

  it('should parse Charm infliction on all enemies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 60, [3, 30, "縺ｧ繧後・縺｣窶ｦ窶ｦ"]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Inflige Charme (30%) aux adversaires pour 3 tours');
  });



});
