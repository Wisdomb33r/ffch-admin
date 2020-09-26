import {PassiveSkillEffectFactory} from '../passive-skill-effect.factory';
import {ResistancesElementaires} from '../../resistances-elementaires.model';

describe('PassiveElementsResistanceEffect', () => {
  it('should compute passive element resistances correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 3, [10, 20, 30, 40, 50, 60, 70, 80]]');
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const carac = skillEffect.getElementResistances();

    // THEN
    expect(carac).toEqual(new ResistancesElementaires(10, 20, 30, 40, 50, 60, 70, 80));
  });
});
