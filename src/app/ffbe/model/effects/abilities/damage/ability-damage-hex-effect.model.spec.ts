import {Skill} from '../../../skill.model';
import {SkillEffectFactory} from '../../skill-effect.factory';

describe('AbilityDamageHexEffect', () => {

  it('should parse hex damages to one enemy', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 1012, [100, 3, 1, 300000, [5, "43;6", "44;7", "45;8", "46;31;32;33;34;35;36;37;38;53;54;61"]]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = null;
    fakeSkill.attack_type = 'None';
    // WHEN
    const s = SkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts fixes neutres de 300000 PV par status négatif à un adversaire pour 3 tours');
  });

  it('should parse hex damages to all enemies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 1012, [100, 4, 1, 50000, [5, "43;6", "44;7", "45;8", "46;31;32;33;34;35;36;37;38;53;54;61"]]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = null;
    fakeSkill.attack_type = 'None';
    // WHEN
    const s = SkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts fixes neutres de 50000 PV par status négatif aux adversaires pour 4 tours');
  });

  it('should parse elemental hex damages to all enemies for 1 turn', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 1012, [100, 1, 1, 50000, [5, "43;6", "44;7", "45;8", "46;31;32;33;34;35;36;37;38;53;54;61"]]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = ['Fire', 'Ice'];
    fakeSkill.attack_type = 'None';
    // WHEN
    const s = SkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts fixes de Feu, Glace de 50000 PV par status négatif aux adversaires pour 1 tour');
  });

});
