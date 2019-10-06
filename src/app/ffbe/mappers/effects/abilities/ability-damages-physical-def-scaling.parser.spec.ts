import {AbilityEffectParserFactory} from './ability-effect-parser.factory';
import {Skill} from '../../../model/skill.model';

describe('AbilityDamagesPhysicalDefScalingParser', () => {

  it('should parse physical neutral damages scaling on DEF', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 102, [100, 99999, 300]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'Physical';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts physiques neutres calculé sur la DÉF de puissance 300% à un adversaire');
  });

  it('should parse magic attack with physical elemental damages scaling on DEF', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 102, [100, 9999, 500]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Ice', 'Lightning', 'Wind'];
    fakeSkill.attack_type = 'Magic';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Attaque magique à dégâts physiques de Glace, Foudre, Vent calculé sur la DÉF de puissance 500% aux adversaires');
  });

});
