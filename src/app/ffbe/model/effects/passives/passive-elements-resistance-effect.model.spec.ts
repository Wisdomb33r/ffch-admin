import {PassiveSkillEffectFactory} from '../passive-skill-effect.factory';
import {ObjetElements} from '../../objet/objet-elements';

describe('PassiveElementsResistanceEffect', () => {
  it('should compute passive element resistances correctly', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 3, [10, 20, 30, 40, 50, 60, 70, 80]]');
    const skillEffect = PassiveSkillEffectFactory.getSkillEffect(effect);

    // WHEN
    const carac = skillEffect.getElementResistances();

    // THEN
    expect(carac).toEqual(new ObjetElements(10, 20, 30, 40, 50, 60, 70, 80));
  });
});
