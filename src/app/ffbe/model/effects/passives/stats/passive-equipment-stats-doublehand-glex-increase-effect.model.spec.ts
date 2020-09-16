import {PassiveSkillEffectFactory} from '../../passive-skill-effect.factory';
import {Caracteristiques} from '../../../caracteristiques.model';

describe('PassiveEquipmentStatsDoublehandGlexIncreaseEffect', () => {
  it('should compute passive increases to stats when wielding a single one-handed weapon correctly', () => {
    // GIVEN
    const effect = JSON.parse('[1, 3, 10003, [0,  0,  100,  0,  50,  50]]');
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const carac = skillEffect.getDoublehandIncreasesPercent();

    // THEN
    expect(carac).toEqual(new Caracteristiques(0, 0, 100, 50, 0, 50));
  });

  it('should compute passive increases to stats when wielding a single weapon correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 10003, [0,  0,  60,  0,  0,  10,  1]]');
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const carac = skillEffect.getTrueDoublehandIncreasesPercent();

    // THEN
    expect(carac).toEqual(new Caracteristiques(0, 0, 60, 0, 0, 10));
  });
});
