import {PassiveSkillEffectFactory} from '../passive-skill-effect.factory';
import {HTML_LINE_RETURN} from '../../../mappers/effects/skill-effects.mapper';

describe('PassiveEffectParser', () => {
  const passiveEffectParserTestMappings = [
    {effect: '[0, 3, 1, [20, 10, 30, 10, 20, 10, 0]]', parsed: '+30% MAG, +20% PV/ATT et +10% PM/DÉF/PSY'},
    {effect: '[0, 3, 1, [0, 0, 0, 0, 0, 0, 30]]', parsed: '+30% de coups critiques des attaques normales'},
    {
      effect: '[0, 3, 1, [10, 10, 0, 0, 0, 0, 30]]',
      parsed: '+10% ATT/DÉF' + HTML_LINE_RETURN + '+30% de coups critiques des attaques normales'
    },
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
