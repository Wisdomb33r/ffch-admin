import {Skill} from '../../../model/skill.model';
import {AbilityDamagesPhysicalEffect} from '../../../model/effects/abilities/ability-damages-physical-effect.model';

describe('AbilityDamagesPhysicalParser', () => {

  it('should parse physical neutral damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 1, [0, 0, 0, 0, 0, 300, 400]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'Physical';
    // WHEN
    const s = new AbilityDamagesPhysicalEffect(effect[0], effect[1], effect[2], effect[3]).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts physiques neutres de puissance 700% à un adversaire');
  });

  it('should parse fixed attack with physical elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 1, [0, 0, 0, 0, 0, 0, 400, 0]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Fire', 'Earth', 'Light'];
    fakeSkill.attack_type = 'None';
    // WHEN
    const s = new AbilityDamagesPhysicalEffect(effect[0], effect[1], effect[2], effect[3]).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Attaque fixe à dégâts physiques de Feu, Terre, Lumière de puissance 400% aux adversaires');
  });

  it('should parse magical attack with physical elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 1, [0, 0, 0, 0, 0, 0, 500, 0]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Ice', 'Lightning', 'Wind'];
    fakeSkill.attack_type = 'Magic';
    // WHEN
    const s = new AbilityDamagesPhysicalEffect(effect[0], effect[1], effect[2], effect[3]).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Attaque magique à dégâts physiques de Glace, Foudre, Vent de puissance 500% à un adversaire');
  });

  it('should parse hybrid attack with physical elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 1, [0, 0, 0, 0, 0, 200, 500, 0]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Water'];
    fakeSkill.attack_type = 'Hybrid';
    // WHEN
    const s = new AbilityDamagesPhysicalEffect(effect[0], effect[1], effect[2], effect[3]).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Attaque hybride à dégâts physiques d\'Eau de puissance 700% aux adversaires');
  });

  it('should parse unknown attack with physical elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 1, [0, 0, 0, 0, 0, 200, 500, 0]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Dark'];
    fakeSkill.attack_type = undefined;
    // WHEN
    const s = new AbilityDamagesPhysicalEffect(effect[0], effect[1], effect[2], effect[3]).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Attaque UNKNOWN à dégâts physiques de Ténèbres de puissance 700% à un adversaire');
  });

});
