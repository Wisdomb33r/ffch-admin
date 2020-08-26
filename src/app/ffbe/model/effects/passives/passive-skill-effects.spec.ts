import {PassiveSkillEffectFactory} from '../passive-skill-effect.factory';

describe('PassiveEffectParser', () => {
  const passiveEffectParserTestMappings = [
    {effect: '[0,3,89,[0,0,0,0,2000,0]]', parsed: '+2000 PV'},
    {effect: '[0,3,89,[100,100,0,0,2000,0]]', parsed: '+2000 PV, +100 ATT/DÉF'},
  ];

  passiveEffectParserTestMappings.forEach(testParams => {
    it('should parse effect for input ' + testParams.effect, () => {
      // GIVEN
      const effect = JSON.parse(testParams.effect);
      // WHEN
      const s = PassiveSkillEffectFactory.getSkillEffect(effect).wordEffect(null);
      // THEN
      expect(s).toEqual(testParams.parsed);
    });
  });
});
