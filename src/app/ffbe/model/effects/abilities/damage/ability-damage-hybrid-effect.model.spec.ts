import {Skill} from '../../../skill.model';
import {SkillEffectFactory} from '../../skill-effect.factory';

describe('AbilityDamageHybridEffect', () => {

  it('should parse hybrid neutral damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 40, [0, 0, 0, 0, 0, 0, 0, 0, 300, 300]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'Hybrid';
    // WHEN
    const s = SkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts hybrides neutres de puissance 300% à un adversaire');
  });

  it('should parse fixed attack with hybrid elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 40, [0, 0, 0, 0, 0, 0, 0, 50, 400, 400]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Dark'];
    fakeSkill.attack_type = 'None';
    // WHEN
    const s = SkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Attaque fixe à dégâts hybrides de Ténèbres de puissance 400% aux adversaires (+50% précision)');
  });

  it('should parse physical attack with hybrid elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 40, [0, 0, 0, 0, 0, 0, 0, 0, 250, 250]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Ice', 'Lightning', 'Wind'];
    fakeSkill.attack_type = 'Physical';
    // WHEN
    const s = SkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Attaque physique à dégâts hybrides de Glace, Foudre, Vent de puissance 250% à un adversaire');
  });

  it('should parse magic attack with hybrid elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 40, [0, 0, 0, 0, 0, 0, 0, 0, 100, 100]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Water'];
    fakeSkill.attack_type = 'Magic';
    // WHEN
    const s = SkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Attaque magique à dégâts hybrides d\'Eau de puissance 100% aux adversaires');
  });

  it('should parse unknown attack with hybrid elemental damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 40, [0, 0, 0, 0, 0, 0, 0, 0, 100, 100]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Dark'];
    fakeSkill.attack_type = undefined;
    // WHEN
    const s = SkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Attaque UNKNOWN à dégâts hybrides de Ténèbres de puissance 100% à un adversaire');
  });

  it('should error for asymetrical hybrid damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 40, [0, 0, 0, 0, 0, 0, 0, 0, 100, 200]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Dark'];
    fakeSkill.attack_type = undefined;
    // WHEN
    const s = SkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Effet AbilityDamageHybridEffect: Dégâts hybrides asymétriques non prévus');
  });

});
