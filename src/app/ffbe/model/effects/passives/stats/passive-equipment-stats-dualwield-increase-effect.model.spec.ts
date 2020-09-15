import {PassiveSkillEffectFactory} from '../../passive-skill-effect.factory';
import {Caracteristiques} from '../../../caracteristiques.model';

describe('PassiveEquipmentStatsDualwieldIncreaseEffect', () => {
  it('should compute passive increases to ATT when dual-wielding correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 69, [1,  10]]');
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const carac = skillEffect.getDualwieldIncreasesPercent();

    // THEN
    expect(carac).toEqual(new Caracteristiques(0, 0, 10, 0, 0, 0));
  });

  it('should compute passive increases to DÉF when dual-wielding correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 69, [2,  100,  0]]');
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const carac = skillEffect.getDualwieldIncreasesPercent();

    // THEN
    expect(carac).toEqual(new Caracteristiques(0, 0, 0, 100, 0, 0));
  });

  it('should compute passive increases to MAG when dual-wielding correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 69, [3,  30]]');
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const carac = skillEffect.getDualwieldIncreasesPercent();

    // THEN
    expect(carac).toEqual(new Caracteristiques(0, 0, 0, 0, 30, 0));
  });

  it('should compute passive increases to PSY when dual-wielding correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 69, [4,  50]]');
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const carac = skillEffect.getDualwieldIncreasesPercent();

    // THEN
    expect(carac).toEqual(new Caracteristiques(0, 0, 0, 0, 0, 50));
  });
});
