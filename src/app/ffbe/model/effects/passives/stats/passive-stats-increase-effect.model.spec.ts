import {PassiveStatsIncreaseEffect} from './passive-stats-increase-effect.model';
import {Caracteristiques} from '../../../caracteristiques.model';
import {PassiveSkillEffectFactory} from '../../passive-skill-effect.factory';

describe('PassiveStatsIncreaseEffect', () => {
  it('should compute passive increases to Caracteristiques correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 1, [0,  20,  0,  0,  0,  20,  0]]');
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const carac = skillEffect.getBaseIncreasesPercent();

    // THEN
    expect(carac).toEqual(new Caracteristiques(0, 20, 0, 20, 0, 0));
  });
});
