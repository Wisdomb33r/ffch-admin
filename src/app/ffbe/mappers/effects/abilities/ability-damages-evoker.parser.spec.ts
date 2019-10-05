import {AbilityEffectParserFactory} from './ability-effect-parser.factory';
import {Skill} from '../../../model/skill.model';

describe('AbilityDamagesEvokerParser', () => {

  it('should parse evoker neutral damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 124, [0, 0, 0, 0, 0, 0, 0, 1000, 1000, [40, 60]]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'None';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Attaque fixe à dégâts d\'invocateur neutres de puissance 1000% (40% MAG, 60% PSY) à un adversaire');
  });

  it('should parse evoker elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 124, [0, 0, 0, 0, 0, 0, 0, 0, 4000, [0, 100]]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Fire', 'Earth', 'Light'];
    fakeSkill.attack_type = 'Magic';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Attaque UNKNOWN à dégâts d\'invocateur de feu, terre, lumière de puissance 2000% (0% MAG, 100% PSY) aux adversaires');
  });

});
