import {AbilityEffectParserFactory} from './ability-effect-parser.factory';
import {Skill} from '../../../model/skill.model';

describe('AbilityDamagesPhysicalJumpDelayParser', () => {

  it('should parse physical neutral jump damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 52, [0, 0, 1, 1, 250]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'Physical';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts physiques neutres sautés à activation automatique de puissance 250% avec délai de 1 tour à un adversaire');
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
    expect(s).toEqual('Attaque fixe à dégâts physiques de Feu, Terre, Lumière sautés à activation automatique de puissance 300% avec délai de 2 tours à un adversaire');
  });

  it('should parse physical neutral timed jump damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 134, [0,  0,  1,  1,  850]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'Physical';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts physiques neutres sautés à activation manuelle de puissance 850% avec délai de 1 tour à un adversaire');
  });
});
