import {AbilityEffectParserFactory} from './ability-effect-parser.factory';
import {Skill} from '../../../model/skill.model';

describe('AbilityMagicReflectParser', () => {

  it('should parse magic reflect to caster', () => {
    // GIVEN
    const effect = JSON.parse('[1, 3, 86, [100, 1, 4]]');
    const skill: Skill = new Skill();
    skill.isActivatedByPassiveSkill = false;
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, skill);
    // THEN
    expect(s).toEqual('Active le renvoi de 1 sort de magie sur le lanceur pour 4 tours');
  });

  it('should parse magic reflect to caster due to activated by passive skill', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 86, [100, 3, 1]]');
    const skill: Skill = new Skill();
    skill.isActivatedByPassiveSkill = true;
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, skill);
    // THEN
    expect(s).toEqual('Active le renvoi de 3 sorts de magie sur le lanceur pour 1 tour');
  });

  it('should parse magic reflect without num limit nor turns limit', () => {
    // GIVEN
    const effect = JSON.parse('[3, 2, 86, [100, -1, -1]]');
    const skill: Skill = new Skill();
    skill.isActivatedByPassiveSkill = false;
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, skill);
    // THEN
    expect(s).toEqual('Active le renvoi des sorts de magie sur un allié au hasard');
  });

});
