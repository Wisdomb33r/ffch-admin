import {AbilityEffectParserFactory} from './ability-effect-parser.factory';
import {Skill} from '../../../model/skill.model';

describe('AbilityHealingParser', () => {

  it('should parse healing without mod', () => {
    // GIVEN
    const effect = JSON.parse('[1, 5, 2, [0, 0, 300, 0, 100]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Soigne 300 PV à un allié sauf le lanceur');
  });

  it('should parse healing with mod', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 2, [0, 0, 300, 120, 100]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Soigne 300 PV + 0.6x la PSY + 0.12x la MAG du lanceur aux alliés');
  });

});
