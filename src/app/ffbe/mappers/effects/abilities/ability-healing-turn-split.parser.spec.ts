import {AbilityEffectParserFactory} from './ability-effect-parser.factory';
import {Skill} from '../../../model/skill.model';

describe('AbilityHealingTurnSplitParser', () => {

  it('should parse healing split over turns without mod', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 8, [0, 1, 1000, 5]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Soigne 1000 PV au lanceur sur 5 tours');
  });

  it('should parse healing split over turns with mod', () => {
    // GIVEN
    const effect = JSON.parse('[1, 3, 8, [150, 1, 300, 3]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Soigne 300 PV + 0.75x la PSY + 0.15x la MAG du lanceur au lanceur sur 3 tours');
  });

});
