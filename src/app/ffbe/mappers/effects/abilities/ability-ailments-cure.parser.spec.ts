import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityAilmentsCureParser', () => {

  it('should parse ailments cure for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 5, [3, 8, 9, 0, 0, 0, 0, 0]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Soigne Sommeil, Pétrification et UNKNOWN ailment au lanceur');
  });

  it('should parse all ailments cure for all allies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 5, [1, 2, 3, 4, 5, 6, 7, 8]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Soigne toutes les altérations aux alliés');
  });

  it('should parse no ailments cure for all allies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 5, [0, 0, 0, 0, 0, 0, 0, 0]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Soigne UNKNOWN ailments aux alliés');
  });

});
