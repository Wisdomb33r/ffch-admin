import {Skill} from '../../../skill.model';
import {AbilitySkillEffectFactory} from '../../ability-skill-effect.factory';

describe('AbilityDamageOrDeathEffect', () => {

  it('should parse death or physical neutral damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 112, [400, 40, 80]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'Physical';
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Inflige Mort (40%) ou Dégâts physiques neutres de puissance 400% à un adversaire');
  });

  it('should parse death or physical elements damages', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 112, [400, 40, 100, -50]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Fire'];
    fakeSkill.attack_type = 'Physical';
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Inflige Mort (40%) ou Dégâts physiques de Feu de puissance 400% (ignore 50% DÉF, 800% total) à un adversaire');
  });

  it('should parse death or physical attack with magic damages', () => {
    // GIVEN
    const effect = JSON.parse('[3, 1, 113, [200, 90, 180, 0]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Fire'];
    fakeSkill.attack_type = 'Physical';
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Inflige Mort (90%) ou Attaque physique à dégâts magiques de Feu de puissance 200% à un adversaire au hasard');
  });

});
