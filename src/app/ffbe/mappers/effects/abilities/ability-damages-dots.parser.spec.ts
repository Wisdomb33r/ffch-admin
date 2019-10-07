import {AbilityEffectParserFactory} from './ability-effect-parser.factory';
import {Skill} from '../../../model/skill.model';

describe('AbilityDamagesDotsParser', () => {

  it('should parse physical neutral dots', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 139, [1, 100, 0, 1, 3, 1, 1]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'Physical';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts physiques neutres de puissance 100% chaque tour à un adversaire pour 3 tours (ID #1)');
  });

  it('should parse magic elemental dot', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 139, [3, 200, 0, 1, 3, 1, 123]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Fire', 'Earth', 'Light'];
    fakeSkill.attack_type = 'Magic';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts magiques de Feu, Terre, Lumière de puissance 200% chaque tour aux adversaires pour 3 tours (ID #123)');
  });

});
