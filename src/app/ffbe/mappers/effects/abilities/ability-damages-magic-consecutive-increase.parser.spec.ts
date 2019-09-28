import {AbilityEffectParserFactory} from './ability-effect-parser.factory';
import {Skill} from '../../../model/skill.model';

describe('AbilityDamagesMagicConsecutiveIncreaseParser', () => {

  it('should parse magic neutral damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 72, [0, 0, 300, 250, 250, 5]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'Magic';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts magiques neutres de puissance 550% (+250% par utilisation successive, 4x, max 1550%) à un adversaire');
  });

  it('should parse fixed attack with magic elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 72, [0, 0, 400, 400, 400, 6]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Fire', 'Earth', 'Light'];
    fakeSkill.attack_type = 'None';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Attaque fixe à dégâts magiques de feu, terre, lumière de puissance 800% (+400% par utilisation successive, 5x, max 2800%) aux adversaires');
  });

});