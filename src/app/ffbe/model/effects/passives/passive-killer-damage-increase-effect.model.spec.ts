import {PassiveSkillEffectFactory} from '../passive-skill-effect.factory';
import {Tueurs} from '../../tueurs.model';

describe('PassiveKillerDamageIncreaseEffect', () => {
  it('should compute passive physical killers with distinct values correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 11, [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120], 0]]');
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const killers = skillEffect.getPhysicalKillers();

    // THEN
    expect(killers).toEqual(new Tueurs(10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120));
  });

  it('should compute passive physical killers with identical values correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 11, [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 35, 0]]');
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const killers = skillEffect.getPhysicalKillers();

    // THEN
    expect(killers).toEqual(new Tueurs(35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35));
  });

  it('should compute passive magical killers with distinct values correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 11, [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 0, [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]]]');
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const killers = skillEffect.getMagicalKillers();

    // THEN
    expect(killers).toEqual(new Tueurs(10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120));
  });

  it('should compute passive magical killers with identical values correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 11, [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 0, 35]]');
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const killers = skillEffect.getMagicalKillers();

    // THEN
    expect(killers).toEqual(new Tueurs(35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35));
  });
});
