import {Skill} from '../../../skill.model';
import {SkillEffectFactory} from '../../skill-effect.factory';

describe('AbilityDamageMagicEffect', () => {

  it('should parse magic neutral damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 15, [0, 0, 0, 0, 0, 300]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'Magic';
    // WHEN
    const s = SkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
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
    const s = SkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Attaque fixe à dégâts magiques de Feu, Terre, Lumière de puissance 400% aux adversaires');
  });

  it('should parse physical attack with magic elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 15, [0, 0, 0, 0, 0, 500]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Ice', 'Lightning', 'Wind'];
    fakeSkill.attack_type = 'Physical';
    // WHEN
    const s = SkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Attaque physique à dégâts magiques de Glace, Foudre, Vent de puissance 500% à un adversaire');
  });

  it('should parse hybrid attack with magic elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 15, [0, 0, 0, 0, 0, 200]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Water'];
    fakeSkill.attack_type = 'Hybrid';
    // WHEN
    const s = SkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Attaque hybride à dégâts magiques d\'Eau de puissance 200% aux adversaires');
  });

  it('should parse unknown attack with magic elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 15, [0, 0, 0, 0, 0, 200]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Dark'];
    fakeSkill.attack_type = undefined;
    // WHEN
    const s = SkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Attaque UNKNOWN à dégâts magiques de Ténèbres de puissance 200% à un adversaire');
  });

});
