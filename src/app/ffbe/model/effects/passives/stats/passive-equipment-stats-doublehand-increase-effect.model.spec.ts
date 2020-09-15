import {PassiveSkillEffectFactory} from '../../passive-skill-effect.factory';
import {Caracteristiques} from '../../../caracteristiques.model';

describe('PassiveEquipmentStatsDoublehandIncreaseEffect', () => {
  it('should compute passive increases to ATT when wielding a single one-handed weapon correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 13, [100,  25,  0]]');
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const carac = skillEffect.getDoublehandIncreasesPercent();

    // THEN
    expect(carac).toEqual(new Caracteristiques(0, 0, 100, 0, 0, 0));
  });

  it('should compute passive increases to MAG when wielding a single one-handed weapon correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 70, [50,  0,  0]]');
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const carac = skillEffect.getDoublehandIncreasesPercent();

    // THEN
    expect(carac).toEqual(new Caracteristiques(0, 0, 0, 0, 50, 0));
  });

  it('should compute passive increases to ATT when wielding a single weapon correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 13, [30,  25,  2]]');
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const carac = skillEffect.getTrueDoublehandIncreasesPercent();

    // THEN
    expect(carac).toEqual(new Caracteristiques(0, 0, 30, 0, 0, 0));

  });

  it('should compute passive increases to MAG when wielding a single weapon correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 70, [25,  0,  2]]');
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const carac = skillEffect.getTrueDoublehandIncreasesPercent();

    // THEN
    expect(carac).toEqual(new Caracteristiques(0, 0, 0, 0, 25, 0));
  });
});
