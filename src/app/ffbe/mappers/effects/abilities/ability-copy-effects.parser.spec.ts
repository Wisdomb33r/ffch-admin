import {AbilityEffectParserFactory} from './ability-effect-parser.factory';
import {HTML_LINE_RETURN} from '../skill-effects.mapper';

describe('AbilityCopyEffectsParser', () => {

  it('should parse effect copy from one enemy to the caster ("Grand Reversal")', () => {
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

  it('should parse effect copy from one ally to the rest of the party ("Projected Mirror")', () => {
    // GIVEN
    const effect = JSON.parse('[1, 3, 1005, [1, 4, 100, "1;2;3;4;12;13;14;15;16;17;18;19;20;21;22;23;24;25;26;27;28;29;30;39;40;41;42;47;63;64;65;66;67;68;69;70;71;72;73;74;75;76;77;78;79;80;81;82;83;84;85;86;87;88;89;90;91;92;93;94;95;96;97;98;99;100"]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual(`Copie les effets suivants du lanceur aux alliés sauf le lanceur pour 4 tours:` +
      `${HTML_LINE_RETURN}Bonus d'ATT/DÉF/MAGIE/PSY`);
  });


  it('should parse effect copy from one enemy to the party ("Twist of Fate")', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 1005, [2, 2, 100, "1;2;3;4;9;12;13;14;15;16;17;18;19;20;21;22;23;24;25;26;27;28;29;30;39;40;41;42;47;56;60;62;63;64;65;66;67;68;69;70;71;72;73;74;75;76;77;78;79;80;81;82;83;84;85;86;87;88;89;90;91;92;93;94;95;96;97;98;99;100;101"]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual(`Copie les effets suivants d\'un adversaire aux alliés pour 2 tours:` +
      `${HTML_LINE_RETURN}Bonus d'ATT/DÉF/MAGIE/PSY`);
  });


});
