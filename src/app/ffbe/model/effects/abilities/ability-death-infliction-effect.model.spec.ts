import {AbilityEffectParserFactory} from '../../../mappers/effects/abilities/ability-effect-parser.factory';
import {AbilitySkillEffectFactory} from '../ability-skill-effect.factory';

describe('AbilityDeathInflictionParser', () => {

  it('should parse death infliction for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 35, [100,  1,  1]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('Inflige Mort (100%) au lanceur (ignore la rés. à Mort)');
  });

  it('should parse death infliction for all enemies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 35, [30]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('Inflige Mort (30%) aux adversaires');
  });

  it('should parse death infliction for random enemy', () => {
    // GIVEN
    const effect = JSON.parse('[3, 1, 35, [30, 1, 0]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('Inflige Mort (30%) à un adversaire au hasard');
  });

});
