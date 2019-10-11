import {AbilityEffectParserFactory} from './ability-effect-parser.factory';
import {Skill} from '../../../model/skill.model';

describe('AbilityDamagesPhysicalJumpDelayParser', () => {

  it('should parse dual cast black magic effect 44', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 44, ["none"]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Permet l\'utilisation des sorts de magie noire 2x par tour');
  });

  it('should parse dual cast all magic effect 45', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 45, ["none"]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Permet l\'utilisation des sorts de magie 2x par tour');
  });

  it('should parse dual cast all magic', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 52, [0, 2, 123456]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Permet l\'utilisation des sorts de magie 2x par tour');
  });

  it('should parse triple cast black magic', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 52, [1, 3, 123456]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Permet l\'utilisation des sorts de magie noire 3x par tour');
  });

  it('should parse quad cast white/green magic', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 52, [2, 3, 4, 4, 123456, 123456]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Permet l\'utilisation des sorts de magie blanche et verte 4x par tour');
  });

  it('should parse physical neutral jump damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 52, [0,  0,  1,  1,  250]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'Physical';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts physiques neutres de puissance 250% avec délai de saut de 1 tour à un adversaire');
  });

  it('should parse fixed attack with physical elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 52, [0, 0, 2, 2, 300]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Fire', 'Earth', 'Light'];
    fakeSkill.attack_type = 'None';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Attaque fixe à dégâts physiques de Feu, Terre, Lumière de puissance 300% avec délai de saut de 2 tours à un adversaire');
  });

});
