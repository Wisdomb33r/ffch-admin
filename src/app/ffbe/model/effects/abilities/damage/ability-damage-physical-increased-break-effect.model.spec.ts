import {AbilitySkillEffectFactory} from '../../ability-skill-effect.factory';
import {Skill} from '../../../skill.model';

describe('AbilityDamagePhysicalIncreasedBreakEffect', () => {

  it('should parse damages with bonus BREAK provided by a single weapon type', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 159, [4,  400,  1,  100,  0,  1]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = null;
    fakeSkill.attack_type = 'Physical';

    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts physiques neutres de puissance 100% à un adversaire avec un bonus BREAK de 400% si l\'unité porte un <a href="ffexvius_objects.php?categid=28">katana</a>');
  });

});

