import {AbilitySkillEffectFactory} from '../ability-skill-effect.factory';

describe('AbilityCoversEffect', () => {

  it('should parse magical cover for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 96, [1,  0,  50,  70,  80,  100,  5,  1,  2]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('80% de chance pour le lanceur de protéger les alliés des dégâts magiques avec mitigation de 50% à 70% des dégâts reçus pour 5 tours');
  });

  it('should parse physical cover for ally', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 96, [1,  0,  30,  30,  100,  100,  3,  1,  1]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('100% de chance pour un allié de protéger les alliés des dégâts physiques avec mitigation de 30% des dégâts reçus pour 3 tours');
  });

  it('should parse physical and magical cover', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 96, [1,  0,  50,  50,  100,  100,  2,  1,  0]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('100% de chance pour le lanceur de protéger les alliés des dégâts physiques et magiques avec mitigation de 50% des dégâts reçus pour 2 tours');
  });
});
