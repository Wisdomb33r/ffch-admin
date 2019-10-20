import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityBarriersParser', () => {

  it('should parse HP barrier for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 127, [3000,  3,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+3000 PV en barrière au lanceur pour 3 tours');
  });

  it('should parse HP barrier for one ally', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 127, [1000,  4,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+1000 PV en barrière à un allié pour 4 tours');
  });

  it('should parse HP barrier for all allies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 127, [2000,  1,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+2000 PV en barrière aux alliés pour 1 tour');
  });

});
