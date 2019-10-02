import {AbilityEffectParserFactory} from './ability-effect-parser.factory';
import {Skill} from '../../../model/skill.model';

describe('AbilityDamagesFixedParser', () => {

  it('should parse fixed neutral damages to caster', () => {
    // GIVEN
    const effect = JSON.parse('[1, 3, 41, [1234]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'None';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts fixes neutres de 1234 PV au lanceur');
  });

  it('should parse magic attack with physical elemental damages scaling on DEF', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 41, [98765]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Ice', 'Lightning', 'Wind'];
    fakeSkill.attack_type = 'Magic';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Attaque magique à dégâts fixes de glace, foudre, vent de 98765 PV aux adversaires');
  });

});
