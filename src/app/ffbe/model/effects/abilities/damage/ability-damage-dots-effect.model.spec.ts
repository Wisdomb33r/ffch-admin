import {Skill} from '../../../skill.model';
import {SkillEffectFactory} from '../../skill-effect.factory';

describe('AbilityDamageDotsEffect', () => {

  it('should parse physical neutral dots', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 139, [1, 100, 0, 1, 3, 1, 1]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = undefined;
    fakeSkill.attack_type = 'Physical';
    // WHEN
    const s = SkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts physiques neutres de puissance 100% chaque tour à un adversaire pour 3 tours (ID #1)');
  });

  it('should parse magic elemental dot', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 139, [3, 200, 0, 1, 3, 1, 123]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Fire', 'Earth', 'Light'];
    fakeSkill.attack_type = 'Magic';
    // WHEN
    const s = SkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts magiques de Feu, Terre, Lumière de puissance 200% chaque tour aux adversaires pour 3 tours (ID #123)');
  });

  it('should parse magic elemental dot with SPR scaling', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 139, [4, 150, 0, 1, 3, 1, 1]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Dark'];
    fakeSkill.attack_type = 'Magic';
    // WHEN
    const s = SkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts magiques de Ténèbres calculés sur la PSY de puissance 150% chaque tour à un adversaire pour 3 tours (ID #1)');
  });
});
