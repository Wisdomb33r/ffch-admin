import {HTML_LINE_RETURN} from '../../../mappers/effects/skill-effects.mapper';
import {AbilitySkillEffectFactory} from '../ability-skill-effect.factory';

describe('AbilityDebuffsResistanceParser', () => {

  it('should parse resistance to all debuffs for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 89, [100, 100, 100, 100, 100, 100, 4,  1]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+100% de rés. aux baisses de ATT/DÉF/MAG/PSY au lanceur pour 4 tours'
      + HTML_LINE_RETURN + '+100% de rés. à Stop et Charme au lanceur pour 4 tours');
  });

  it('should parse resistance to Stop for allies except caster', () => {
    // GIVEN
    const effect = JSON.parse('[2, 5, 89, [0, 0, 0, 0, 100, 0, -1, 1]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+100% de rés. à Stop aux alliés sauf le lanceur pour 9999 tours');
  });

  it('should parse resistance to Stop for allies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 89, [0, 0, 0, 0, 0, 100, 9999, 1]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual('+100% de rés. à Charme aux alliés pour 9999 tours');
  });

});
