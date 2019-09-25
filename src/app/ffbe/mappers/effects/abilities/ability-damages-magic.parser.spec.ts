import {AbilityEffectParserFactory} from './ability-effect-parser.factory';
import {Skill} from '../../../model/skill.model';

describe('AbilityDamagesMagicParser', () => {

  it('should parse magic neutral damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 15, [0, 0, 0, 0, 0, 300]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'Magic';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts magiques neutres de puissance 300% à un adversaire');
  });

  it('should parse fixed attack with magic elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 15, [0, 0, 0, 0, 0, 400]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Fire', 'Earth', 'Light'];
    fakeSkill.attack_type = 'None';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Attaque fixe à dégâts magiques de feu, terre, lumière de puissance 400% aux adversaires');
  });

  it('should parse physical attack with magic elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 15, [0, 0, 0, 0, 0, 500]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Ice', 'Lightning', 'Wind'];
    fakeSkill.attack_type = 'Physical';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Attaque physique à dégâts magiques de glace, foudre, vent de puissance 500% à un adversaire');
  });

  it('should parse hybrid attack with magic elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 15, [0, 0, 0, 0, 0, 200]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Water'];
    fakeSkill.attack_type = 'Hybrid';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Attaque hybride à dégâts magiques de eau de puissance 200% aux adversaires');
  });

  it('should parse unknown attack with magic elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 15, [0, 0, 0, 0, 0, 200]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Dark'];
    fakeSkill.attack_type = undefined;
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Attaque UNKNOWN à dégâts magiques de ténèbres de puissance 200% à un adversaire');
  });

});
