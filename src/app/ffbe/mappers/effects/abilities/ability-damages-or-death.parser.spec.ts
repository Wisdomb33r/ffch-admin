import {AbilityEffectParserFactory} from './ability-effect-parser.factory';
import {Skill} from '../../../model/skill.model';

describe('AbilityDamagesOrDeathParser', () => {

  it('should parse death or physical neutral damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 112, [400, 40, 80]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'Physical';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Inflige Mort (40%) ou 80% de chance d\'infliger des dégâts physiques neutres (400%) à un adversaire');
  });

  it('should parse death or physical elements damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 112, [400, 40, 100, -50]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Fire'];
    fakeSkill.attack_type = 'Physical';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Inflige Mort (40%) ou des dégâts physiques de Feu (400%, ignore 50% DÉF, 800% total) à un adversaire');
  });

});
