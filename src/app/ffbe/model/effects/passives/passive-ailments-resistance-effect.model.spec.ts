import {PassiveSkillEffectFactory} from '../passive-skill-effect.factory';
import {ResistancesAlterations} from '../../resistances-alterations.model';

describe('PassiveAilmentsResistanceEffect', () => {
  it('should compute passive ailment resistances correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 2, [10, 20, 30, 40, 50, 60, 70, 80]]');
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const resistances = skillEffect.getAilmentResistances();

    // THEN
    expect(resistances).toEqual(new ResistancesAlterations(10, 20, 30, 40, 50, 60, 70, 80));
  });
});
