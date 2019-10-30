import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityNormalAttackModifierIncreaseParser', () => {
  it('should parse normal attack modifier increase for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 20, [30, 90, 0]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% de puissance (cumulable, max +90%) à la prochaine attaque normale du lanceur');
  });

  it('should parse normal attack modifier increase with damage taken increase for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 20, [100, 1000, 20]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+100% de puissance (cumulable, max +1000%) à la prochaine attaque normale du lanceur (+20% de dégâts encaissés par le lanceur durant l\'effet)');
  });
});
