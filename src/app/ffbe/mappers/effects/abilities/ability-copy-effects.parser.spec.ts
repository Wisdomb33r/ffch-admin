import {AbilityEffectParserFactory} from './ability-effect-parser.factory';
import {HTML_LINE_RETURN} from '../skill-effects.mapper';

describe('AbilityCopyEffectsParser', () => {

  it('should parse effect copy from one enemy to the caster (inspired from "Grand Reversal")', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 1005, [0, 3, 100, "1;2;3;4;39;40;41;42"]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual(`Copie les effets suivants d\'un adversaire au lanceur pour 3 tours:` +
      `${HTML_LINE_RETURN}Bonus d'ATT/DÉF/MAGIE/PSY`);
  });

  it('should parse effect copy from one enemy to the caster for 1 turn (inspired from "Grand Reversal")', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 1005, [0, 1, 100, "1;2;3;4;39;40;41;42"]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual(`Copie les effets suivants d\'un adversaire au lanceur pour 1 tour:` +
      `${HTML_LINE_RETURN}Bonus d'ATT/DÉF/MAGIE/PSY`);
  });

  it('should parse effect copy from the caster to the rest of the party (inspired from "Projected Mirror")', () => {
    // GIVEN
    const effect = JSON.parse('[1, 3, 1005, [1, 4, 100, "1;2;3;4"]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual(`Copie les effets suivants du lanceur aux alliés sauf le lanceur pour 4 tours:` +
      `${HTML_LINE_RETURN}Bonus d'ATT/DÉF/MAGIE/PSY`);
  });


  it('should parse effect copy from one enemy to the party (inspired from "Twist of Fate")', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 1005, [2, 2, 100, "1;2;3;4"]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual(`Copie les effets suivants d\'un adversaire aux alliés pour 2 tours:` +
      `${HTML_LINE_RETURN}Bonus d'ATT/DÉF/MAGIE/PSY`);
  });

  it('should parse copy of elemental resistances and imbues effects ("Elemental Mirror")', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 1005, [0, 5, 100, "23;24;25;26;27;28;29;30;87;88;89;90;91;92;93;94"]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual(`Copie les effets suivants d\'un allié au lanceur pour 5 tours:` +
      `${HTML_LINE_RETURN}Bonus aux rés. élémentaires${HTML_LINE_RETURN}` +
      `Éléments ajoutés aux attaques physiques et hybrides`);
  });

  it('should parse copy of bonus to LB damages ("Critical Mirror")', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 1005, [0,  2,  100,  221]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual(`Copie les effets suivants d\'un allié au lanceur pour 2 tours:` +
      `${HTML_LINE_RETURN}Bonus aux dégâts de la limite`);
  });


});
