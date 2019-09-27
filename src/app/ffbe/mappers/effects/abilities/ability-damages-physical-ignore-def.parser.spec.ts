import {AbilityEffectParserFactory} from './ability-effect-parser.factory';
import {Skill} from '../../../model/skill.model';

describe('AbilityDamagesPhysicalIgnoreDefParser', () => {

  it('should parse physical neutral damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 21, [0, 0, 400, -30]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'Physical';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts physiques neutres de puissance 400% (ignore 30% DÉF, 571% total) à un adversaire (ignore les couvertures)');
  });

  it('should parse fixed attack with physical elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 21, [0, 0, 500, -50]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Fire', 'Earth', 'Light'];
    fakeSkill.attack_type = 'None';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Attaque fixe à dégâts physiques de feu, terre, lumière de puissance 500% (ignore 50% DÉF, 1000% total) aux adversaires (ignore les couvertures)');
  });

});
