import {AbilitySkillEffectFactory} from '../ability-skill-effect.factory';

describe('AbilityWeaponTypeWielderDamageIncreaseEffect', () => {

  it('should parse rod wielder damage increase to all enemies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 163, [6, 35, 35, 1, 3, 1]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+35% de dégâts reçus des unités qui portent des Sceptres par les adversaires pour 3 tours');
  });

  it('should parse unknown weapon type damage increase to all enemies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 163, [666, 22, 22, 1, 1, 1]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+22% de dégâts reçus des unités qui portent des UNKNOWN WEAPON TYPE par les adversaires pour 1 tour');
  });


});
