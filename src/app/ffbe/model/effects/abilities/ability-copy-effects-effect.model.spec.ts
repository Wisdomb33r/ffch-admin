import {HTML_LINE_RETURN} from '../../../mappers/effects/skill-effects.mapper';
import {AbilitySkillEffectFactory} from '../ability-skill-effect.factory';

describe('AbilityCopyEffectsEffect', () => {

  it('should parse effect copy from one enemy to the caster (inspired from "Grand Reversal")',
    () => {
      // GIVEN
      const effect = JSON.parse('[1, 1, 1005, [0, 3, 100, "1;2;3;4;39;40;41;42"]]');
      // WHEN
      const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
      // THEN
      expect(s).toEqual(`Copie les effets suivants d\'un adversaire au lanceur pour 3 tours:` +
        `${HTML_LINE_RETURN} • Bonus d'ATT/DÉF/MAGIE/PSY`);
    });

  it('should parse effect copy from one enemy to the caster for 1 turn (inspired from "Grand Reversal")',
    () => {
      // GIVEN
      const effect = JSON.parse('[1, 1, 1005, [0, 1, 100, "1;2;3;4;39;40;41;42"]]');
      // WHEN
      const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
      // THEN
      expect(s).toEqual(`Copie les effets suivants d\'un adversaire au lanceur pour 1 tour:` +
        `${HTML_LINE_RETURN} • Bonus d'ATT/DÉF/MAGIE/PSY`);
    });

  it('should parse effect copy from the caster to the rest of the party (inspired from "Projected Mirror")',
    () => {
      // GIVEN
      const effect = JSON.parse('[1, 3, 1005, [1, 4, 100, "1;2;3;4"]]');
      // WHEN
      const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
      // THEN
      expect(s).toEqual(`Copie les effets suivants du lanceur aux alliés sauf le lanceur pour 4 tours:` +
        `${HTML_LINE_RETURN} • Bonus d'ATT/DÉF/MAGIE/PSY`);
    });

  it('should parse effect copy from one enemy to the party (inspired from "Twist of Fate")', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 1005, [2, 2, 100, "1;2;3;4"]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual(`Copie les effets suivants d\'un adversaire aux alliés pour 2 tours:` +
      `${HTML_LINE_RETURN} • Bonus d'ATT/DÉF/MAGIE/PSY`);
  });

  it('should parse copy of magic damage resistance (inspired from "Twist of Fate")', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 1005, [2, 2, 100, "9"]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual(`Copie les effets suivants d\'un adversaire aux alliés pour 2 tours:` +
      `${HTML_LINE_RETURN} • Rés. aux dégâts magiques`);
  });


  it('should parse copy of status ailments resistance (inspired from "Survival Mirror")', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 1005, [0, 3, 100, "12;13;14;15;16;17;18;19"]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual(`Copie les effets suivants d\'un allié au lanceur pour 3 tours:` +
      `${HTML_LINE_RETURN} • Rés. aux altérations`);
  });


  it('should parse copy of HP and MP regen', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 1005, [0, 3, 100, "20;22"]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual(`Copie les effets suivants d\'un adversaire au lanceur pour 3 tours:` +
      `${HTML_LINE_RETURN} • Régénération de PV par tour${HTML_LINE_RETURN} • Régénération de PM par tour`);
  });

  it('should parse copy of Auto-Revive (inspired from "Survival Mirror")', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 1005, [0, 3, 100, "21"]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual(`Copie les effets suivants d\'un allié au lanceur pour 3 tours:` +
      `${HTML_LINE_RETURN} • Auréole`);
  });

  it('should parse copy of elemental resistances and imbues effects ("Elemental Mirror")', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 1005, [0, 5, 100, "23;24;25;26;27;28;29;30;87;88;89;90;91;92;93;94"]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual(`Copie les effets suivants d\'un allié au lanceur pour 5 tours:` +
      `${HTML_LINE_RETURN} • Bonus aux rés. élémentaires${HTML_LINE_RETURN}` +
      ` • Éléments ajoutés aux attaques physiques et hybrides`);
  });

  it('should parse copy of LB jauge fill rate (inspired from "Survival Mirror")', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 1005, [0, 3, 100, "47"]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual(`Copie les effets suivants d\'un allié au lanceur pour 3 tours:` +
      `${HTML_LINE_RETURN} • Bonus à la vitesse de la jauge de limite`);
  });

  it('should parse copy of physical dodge (inspired from "Twist of Fate")', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 1005, [2, 2, 100, "56"]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual(`Copie les effets suivants d\'un adversaire aux alliés pour 2 tours:` +
      `${HTML_LINE_RETURN} • Esquive d\'attaques physiques`);
  });

  it('should parse copy of physical mitigation (inspired from "Twist of Fate")', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 1005, [2, 2, 100, "57"]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual(`Copie les effets suivants d\'un adversaire aux alliés pour 2 tours:` +
      `${HTML_LINE_RETURN} • Mitigation physique`);
  });

  it('should parse copy of physical mitigation (inspired from "Twist of Fate")', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 1005, [2, 2, 100, "58"]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual(`Copie les effets suivants d\'un adversaire aux alliés pour 2 tours:` +
      `${HTML_LINE_RETURN} • Mitigation magique`);
  });

  it('should parse copy of magic reflects (inspired from "Twist of Fate")', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 1005, [2, 2, 100, "60"]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual(`Copie les effets suivants d\'un adversaire aux alliés pour 2 tours:` +
      `${HTML_LINE_RETURN} • Renvoi des magies`);
  });

  it('should parse copy of damage boosts (inspired from "Twist of Fate")', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 1005, [2, 2, 100, "62"]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual(`Copie les effets suivants d\'un adversaire aux alliés pour 2 tours:` +
      `${HTML_LINE_RETURN} • Bonus aux dégâts`);
  });

  it('should parse copy of physical and magical killers ("Critical Mirror")', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 1005, [0, 5, 100, ' +
      '"63;64;65;66;67;68;69;70;71;72;73;74;75;76;77;78;79;80;81;82;83;84;85;86;1;2;3;4;39;40;41;42"]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual(`Copie les effets suivants d\'un allié au lanceur pour 5 tours:` +
      `${HTML_LINE_RETURN} • Bonus d'ATT/DÉF/MAGIE/PSY${HTML_LINE_RETURN} • Tueurs physiques` +
      `${HTML_LINE_RETURN} • Tueurs magiques`);
  });

  it('should parse copy of stats breaks, stop and charm (inspired from "Survival Mirror")', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 1005, [0, 3, 100, "95;96;97;98;99;100"]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual(`Copie les effets suivants d\'un allié au lanceur pour 3 tours:` +
      `${HTML_LINE_RETURN} • Rés. aux baisses de caractéristiques, à Stop et à Charme`);
  });

  it('should parse copy of Berserk resistance (inspired from "Twist of Fate")', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 1005, [2, 2, 100, "101"]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual(`Copie les effets suivants d\'un adversaire aux alliés pour 2 tours:` +
      `${HTML_LINE_RETURN} • Rés. à Berserk`);
  });

  it('should parse copy of bonus to LB damages ("Critical Mirror")', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 1005, [0,  2,  100,  221]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual(`Copie les effets suivants d\'un allié au lanceur pour 2 tours:` +
      `${HTML_LINE_RETURN} • Bonus aux dégâts de la limite`);
  });

  it('should indicate which effects could not be parsed after wording the successful ones', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 1005, [0, 5, 100, "23;24;25;26;27;-101;28;29;30;87;88;-45;89;90;91;-21;92;93;94"]]');
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(undefined);
    // THEN
    expect(s).toEqual(`Copie les effets suivants d\'un allié au lanceur pour 5 tours:` +
      `${HTML_LINE_RETURN} • Bonus aux rés. élémentaires${HTML_LINE_RETURN}` +
      ` • Éléments ajoutés aux attaques physiques et hybrides${HTML_LINE_RETURN}` +
      `Effet AbilityCopyEffectsParser inconnu: Eléments inconnus: -101, -45, -21`);
  });

});
