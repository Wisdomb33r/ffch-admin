import {AbilityEffectParserFactory} from './ability-effect-parser.factory';
import {Skill} from '../../../model/skill.model';

describe('AbilityDamagesMagicIgnoreSprParser', () => {

  it('should parse magic neutral damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 70, [0, 0, 400, 30]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'Magic';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts magiques neutres de puissance 400% (ignore 30% PSY, 571% total) à un adversaire (ignore les reflets)');
  });

  it('should parse fixed attack with magical elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 70, [0, 0, 500, 50]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Fire', 'Earth', 'Light'];
    fakeSkill.attack_type = 'None';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Attaque fixe à dégâts magiques de feu, terre, lumière de puissance 500% (ignore 50% PSY, 1000% total) aux adversaires (ignore les reflets)');
  });

});
