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

  it('should parse damages with bonus BREAK provided by several weapon types', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 159, [[2,  7], [400,  400], 1, 100, 0, 1]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = null;
    fakeSkill.attack_type = 'Physical';

    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts physiques neutres de puissance 100% à un adversaire avec un bonus BREAK de 400% si l\'unité porte une <a href="ffexvius_objects.php?categid=1">épée</a> ou un <a href="ffexvius_objects.php?categid=6">arc</a>');
  });

  it('should parse damages with distinct bonus BREAK provided by several weapon types', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 159, [[2,  3,  7,  11,  12], [400,  600,  400,  600,  600], 1, 100, 0, 1]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = null;
    fakeSkill.attack_type = 'Physical';

    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Dégâts physiques neutres de puissance 100% à un adversaire' +
      ' avec un bonus BREAK de 600% si l\'unité porte une <a href="ffexvius_objects.php?categid=27">épée longue</a>, une <a href="ffexvius_objects.php?categid=33">harpe</a> ou un <a href="ffexvius_objects.php?categid=34">fouet</a>' +
      ' et avec un bonus BREAK de 400% si l\'unité porte une <a href="ffexvius_objects.php?categid=1">épée</a> ou un <a href="ffexvius_objects.php?categid=6">arc</a>');
  });

  it('should return the correct damages power', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 159, [4,  400,  1,  150,  0,  1]]');
    const fakeSkill: Skill = new Skill();
    fakeSkill.element_inflict = null;
    fakeSkill.attack_type = 'Physical';

    // WHEN
    const power = AbilitySkillEffectFactory.getSkillEffect(effect).getDamagesPower();

    // THEN
    expect(power).toEqual(150);
  });
});

