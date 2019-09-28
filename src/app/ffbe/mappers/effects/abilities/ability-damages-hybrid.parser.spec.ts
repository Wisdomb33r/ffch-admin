import {AbilityEffectParserFactory} from './ability-effect-parser.factory';
import {Skill} from '../../../model/skill.model';

describe('AbilityDamagesHybridParser', () => {

  it('should parse hybrid neutral damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 40, [0, 0, 0, 0, 0, 0, 0, 0, 300, 300]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'Hybrid';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts hybrides neutres de puissance 600% à un adversaire');
  });

  it('should parse fixed attack with hybrid elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 40, [0, 0, 0, 0, 0, 0, 0, 50, 400, 400]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Fire', 'Earth', 'Light'];
    fakeSkill.attack_type = 'None';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Attaque fixe à dégâts hybrides de feu, terre, lumière de puissance 800% aux adversaires (+50% précision)');
  });

  it('should parse physical attack with hybrid elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 40, [0, 0, 0, 0, 0, 0, 0, 0, 250, 250]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Ice', 'Lightning', 'Wind'];
    fakeSkill.attack_type = 'Physical';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Attaque physique à dégâts hybrides de glace, foudre, vent de puissance 500% à un adversaire');
  });

  it('should parse magic attack with hybrid elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 40, [0, 0, 0, 0, 0, 0, 0, 0, 100, 100]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Water'];
    fakeSkill.attack_type = 'Magic';
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Attaque magique à dégâts hybrides de eau de puissance 200% aux adversaires');
  });

  it('should parse unknown attack with hybrid elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 40, [0, 0, 0, 0, 0, 0, 0, 0, 100, 100]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Dark'];
    fakeSkill.attack_type = undefined;
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Attaque UNKNOWN à dégâts hybrides de ténèbres de puissance 200% à un adversaire');
  });

});