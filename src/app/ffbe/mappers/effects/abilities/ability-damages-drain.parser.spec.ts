import {AbilityEffectParserFactory} from './ability-effect-parser.factory';
import {Skill} from '../../../model/skill.model';

describe('AbilityDamagesDrainParser', () => {

  it('should parse physical neutral damages with MP drain', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 10, [20, 30, 100]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'Physical';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts physiques neutres sur les PM de puissance 30% avec absorption de 20% des dégâts infligés à un adversaire');
  });

  it('should parse hybrid elemental damages with MP drain', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 10, [50, 120, 100]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Fire', 'Earth', 'Light'];
    fakeSkill.attack_type = 'Hybrid';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts hybrides de feu, terre, lumière sur les PM de puissance 120% avec absorption de 50% des dégâts infligés aux adversaires');
  });

  it('should parse physical neutral damages with HP drain', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 25, [20, 30, 100]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'Physical';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts physiques neutres de puissance 30% avec absorption de 20% des dégâts infligés à un adversaire');
  });

  it('should parse hybrid elemental damages with HP drain', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 25, [50, 120, 100]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Fire', 'Earth', 'Light'];
    fakeSkill.attack_type = 'Hybrid';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts hybrides de feu, terre, lumière de puissance 120% avec absorption de 50% des dégâts infligés aux adversaires');
  });

});