import {AbilityEffectParserFactory} from './ability-effect-parser.factory';
import {Skill} from '../../../model/skill.model';

describe('AbilityDamagesMagicSprScalingParser', () => {

  it('should parse magic neutral damages scaling on SPR', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 103, [100, 99999, 300]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'Magic';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts magiques neutres calculé sur la PSY de puissance 300% à un adversaire');
  });

  it('should parse physical attack with magic elemental damages scaling on SPR', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 103, [100, 9999, 500]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Ice', 'Lightning', 'Wind'];
    fakeSkill.attack_type = 'Physical';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Attaque physique à dégâts magiques de glace, foudre, vent calculé sur la PSY de puissance 500% aux adversaires');
  });

});
