import {AbilityEffectParserFactory} from './ability-effect-parser.factory';
import {Skill} from '../../../model/skill.model';

describe('AbilityDamagesPhysicalCriticalHitParser', () => {

  it('should parse critical physical neutral damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 43, [0, 0, 500, 0]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'Physical';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts physiques critiques neutres de puissance 500% à un adversaire');
  });

  it('should parse magical attack with physical critical elemental damages and chance to miss', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 43, [0, 0, 500, 25]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Ice', 'Lightning', 'Wind'];
    fakeSkill.attack_type = 'Magic';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Attaque magique à dégâts physiques critiques de glace, foudre, vent de puissance 500% à un adversaire (-25% précision)');
  });

});
