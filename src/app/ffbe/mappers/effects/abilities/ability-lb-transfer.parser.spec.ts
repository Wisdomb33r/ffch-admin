import {AbilityLbSpeedIncreaseParser} from './ability-lb-speed-increase.parser';
import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityLbTransferParser', () => {
  it('should parse LB transfer', () => {
    // GIVEN
    const effect = JSON.parse('[1, 3, 31, ["none"]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Transfère la jauge de LB du lanceur à un autre allié');
  });

});
