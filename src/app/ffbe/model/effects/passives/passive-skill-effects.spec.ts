import {PassiveSkillEffectFactory} from '../passive-skill-effect.factory';
import {HTML_LINE_RETURN} from '../../../mappers/effects/skill-effects.mapper';

describe('PassiveSkillEffect', () => {
  const passiveEffectParserTestMappings = [
    {effect: '[0, 3, 1, [20, 10, 30, 10, 20, 10, 0]]', parsed: '+30% MAG, +20% PV/ATT et +10% PM/DÉF/PSY'},
    {effect: '[0, 3, 1, [0, 0, 0, 0, 0, 0, 30]]', parsed: '+30% de coups critiques des attaques normales'},
    {
      effect: '[0, 3, 1, [10, 10, 0, 0, 0, 0, 30]]',
      parsed: '+10% ATT/DÉF' + HTML_LINE_RETURN + '+30% de coups critiques des attaques normales'
    },
    {
      effect: '[0, 3, 2, [50, 40, 60, 50, 50, 50, 40, 20]]',
      parsed: '+60% de rés. Sommeil, +50% de rés. Poison, Silence, Paralysie et Confusion, +40% de rés. Cécité et Maladie, +20% de rés. Pétrification'
    },
    {effect: '[0, 3, 2, [20, 20, 20, 20, 20, 20, 20, 20]]', parsed: '+20% de rés. aux altérations'},
    {
      effect: '[0, 3, 3, [50, 40, 60, 50, 50, 50, 40, 20]]',
      parsed: '+60% de rés. Foudre, +50% de rés. Feu, Eau, Vent, Terre, +40% de rés. Glace, Lumière, +20% de rés. Ténèbres'
    },
    {effect: '[0, 3, 3, [20, 20, 20, 20, 20, 20, 20, 20]]', parsed: '+20% de rés. aux éléments'},
    {effect: '[0, 3, 3, [30, 30, 0, 0, 0, 0, 0]]', parsed: '+30% de rés. Feu, Glace'},
    {effect: '[0, 3, 3, [10, 0, 0, 10, 10, 10, 0, 0, 0]]', parsed: '+10% de rés. Feu, Eau, Vent, Terre'},
    {effect: '[0, 3, 5, [11]]', parsed: 'Permet d\'équiper les <a href="ffexvius_objects.php?categid=33">Harpes</a>'},
    {effect: '[0, 3, 5, [666]]', parsed: 'Permet d\'équiper les UNKNOWN'},
    {
      effect: '[0, 3, 6, [11, 10, 20, 10, 30, 20, 30]]',
      parsed: '+30% PM/PSY, +20% PV/DÉF et +10% ATT/MAG si l\'unité porte une <a href="ffexvius_objects.php?categid=33">harpe</a>'
    },
    {
      effect: '[1, 3, 6, [4,  50,  0,  0,  0]]',
      parsed: '+50% ATT si l\'unité porte un <a href="ffexvius_objects.php?categid=28">katana</a>'
    },
    {
      effect: '[1, 2, 8, [1, 100, 40, 60, 50]]',
      parsed: '50% de chance de protéger un allié féminin des attaques physiques avec mitigation de 40%-60%'
    },
    {effect: '[0, 3, 9, [100]]', parsed: '+100% d\'efficacité des objets de soin en combat'},
    {
      effect: '[0, 3, 11, [[4,  6], 50, 0]]',
      parsed: '+50% de dégâts physiques contre les démons' + HTML_LINE_RETURN + '+50% de dégâts physiques contre les machines'
    },
    {effect: '[0, 3, 11, [1, 50, 50]]', parsed: '+50% de dégâts physiques et magiques contre les bêtes'},
    {
      effect: '[0, 3, 11, [5, 50, 100]]',
      parsed: '+50% de dégâts physiques contre les humains' + HTML_LINE_RETURN + '+100% de dégâts magiques contre les humains'
    },
    {
      effect: '[0, 3, 11, [[4, 5], [25, 50], 0]]',
      parsed: '+25% de dégâts physiques contre les démons' + HTML_LINE_RETURN + '+50% de dégâts physiques contre les humains'
    },
    {
      effect: '[0, 3, 12, [50, 200, 4]]',
      parsed: '50% de chance de contrer les dégâts physiques par une attaque normale de puissance 200% (max 4 fois par tour)'
    },
    {
      effect: '[1, 3, 12, [30,  0]]',
      parsed: '30% de chance de contrer les dégâts physiques par une attaque normale'
    },
    {
      effect: '[1, 3, 13, [25,  25,  0]]',
      parsed: '+25% à l\'ATT de l\'équipement si l\'unité porte une seule arme à une main (DH)'
        + HTML_LINE_RETURN + '+25% précision si l\'unité porte une seule arme à une main (DH)'
    },
    {
      effect: '[0, 3, 14, [4, 5, 6]]',
      parsed: 'Permet d\'équiper deux <a href="ffexvius_objects.php?categid=28">Katanas</a>, <a href="ffexvius_objects.php?categid=17">Bâtons</a>, <a href="ffexvius_objects.php?categid=2">Sceptres</a>'
    },
    {effect: '[0, 3, 14, ["none"]]', parsed: 'Permet d\'équiper deux armes'},
    {effect: '[0, 3, 16, [100, 0]]', parsed: '+100% de chance de réussir à voler un objet'},
    {effect: '[0, 3, 17, [20]]', parsed: '+20% aux dégâts des sauts'},
    {effect: '[0, 3, 21, [20]]', parsed: '+20% INV'},
    {effect: '[0, 3, 22, [20]]', parsed: '+20% d\'esquive physique'},
    {effect: '[0, 3, 24, [20]]', parsed: '+20% de chance d\'être ciblé'},
    {effect: '[0, 3, 25, [30]]', parsed: '-30% de chance d\'être ciblé'},
    {effect: '[1, 3, 29, [3,  5,  0,  0,  3]]', parsed: '+5 PV tous les 3 pas en exploration'},
    {effect: '[0, 3, 29, [0,  0,  1,  2,  1]]', parsed: '+2 PM chaque pas en exploration'},
    {effect: '[0, 3, 29, [8, 20, 5, 4, 6]]', parsed: '+20 PV et +4 PM tous les 6 pas en exploration'},
    {effect: '[0, 3, 31, [50]]', parsed: '+50% à la vitesse de la jauge de limite'},
    {effect: '[0, 3, 33, [100]]', parsed: '+1 cristal de limite chaque tour'},
    {effect: '[0, 3, 33, [500]]', parsed: '+5 cristaux de limite chaque tour'},
    {effect: '[0, 3, 37, [500]]', parsed: '+500% de gils reçus en combat'},
    {
      effect: '[0, 3, 41, [50, 0, 0]]',
      parsed: '50% de chance de contrer les dégâts magiques par une attaque normale'
    },
    {
      effect: '[1, 3, 41, [30,  100]]',
      parsed: '30% de chance de contrer les dégâts magiques par une attaque normale'
    },
    {effect: '[0, 3, 42, [0, 0, 0, 1, 0, 0, 1, 0]]', parsed: 'Absorbe les dégâts d\'élément Eau ou Lumière'},
    {effect: '[0, 3, 43, [-20]]', parsed: '-20% de chance de combat en exploration'},
    {effect: '[0, 3, 45, [50]]', parsed: '+50% d\'expérience reçue en combat'},
    {effect: '[0, 3, 46, [100, 100]]', parsed: 'Permet de voler 100% des gils en plus des objets'},
    {effect: '[0, 3, 46, [50, 100]]', parsed: 'Permet de voler 50% à 100% des gils en plus des objets'},
    {effect: '[0, 3, 47, [30, 0]]', parsed: '+30% de chance d\'obtenir un butin normal'},
    {effect: '[0, 3, 47, [0, 80]]', parsed: '+80% de chance de recevoir un butin rare'},
    {
      effect: '[0, 3, 47, [50, 100]]', parsed: '+50% de chance d\'obtenir un butin normal'
        + HTML_LINE_RETURN + '+100% de chance de recevoir un butin rare'
    },
    {effect: '[0, 3, 54, [-1, 20]]', parsed: '+20% d\'esquive magique (effet passif non cumulable)'},
    {effect: '[0, 3, 55, [0, 0, 0, 0, 50, 50]]', parsed: '+50% de rés. à Stop et Charme'},
    {
      effect: '[0, 3, 55, [20, 30, 20, 30, 20, 100]]',
      parsed: '+30% de rés. aux baisses de DÉF/PSY, +20% de rés. aux baisses de ATT/MAG'
        + HTML_LINE_RETURN + '+20% de rés. à Stop' + HTML_LINE_RETURN + '+100% de rés. à Charme'
    },
    {effect: '[0, 3, 55, [0,  0,  0,  0,  100]]', parsed: '+100% de rés. à Stop'},
    {
      effect: '[1, 2, 59, [1, 100, 40, 60, 50]]',
      parsed: '50% de chance de protéger un allié féminin des attaques magiques avec mitigation de 40%-60%'
    },
    {effect: '[0, 3, 61, ["none"]]', parsed: 'Permet l\'invocation des chimères associées aux alliés'},
    {
      effect: '[0, 3, 63, [10, 10, 10, 10, 10, 10, 0]]',
      parsed: '+10% aux caractéristiques obtenues par la chimère'
    },
    {
      effect: '[0, 3, 63, [10, 10, 10, 10, 10, 10, 5]]',
      parsed: '+10% aux caractéristiques obtenues par la chimère <a href="ffexvius_espers.php?esperid=6">Diabolos</a>'
    },
    {
      effect: '[0, 3, 63, [20, 20, 20, 30, 30, 30, 555]]',
      parsed: '+30% PV/PM/PSY, +20% ATT/DÉF/MAG obtenues par la chimère UNKNOWN esper'
    },
    {
      effect: '[0, 3, 64, [50, 5]]',
      parsed: '+50% de dégâts lors de l\'invocation de <a href="ffexvius_espers.php?esperid=6">Diabolos</a>'
    },
    {
      effect: '[0, 3, 64, [100, [1,  2,  3,  4,  5,  6,  7,  8,  9,  10,  11,  12,  13,  14,  15,  16,  17,  18,  19]]]',
      parsed: '+100% de dégâts lors de l\'invocation d\'une chimère'
    },
    {
      effect: '[0, 3, 64, [30,  0]]',
      parsed: '+30% de dégâts lors de l\'invocation d\'une chimère<br />+30% aux dégâts de chimère'
    },
    {
      effect: '[0, 3, 64, [30,  [5, 7, 13]]]',
      parsed: '+30% de dégâts lors de l\'invocation de <a href="ffexvius_espers.php?esperid=6">Diabolos</a>, <a href="ffexvius_espers.php?esperid=5">Ramuh</a> et <a href="ffexvius_espers.php?esperid=16">Alexandre</a>'
    },
    {effect: '[0, 3, 68, [50]]', parsed: '+50% aux dégâts de la limite'},
    {effect: '[0, 3, 69, [2, 50]]', parsed: '+50% à la DÉF de l\'équipement si l\'unité porte deux armes (TDW)'},
    {
      effect: '[0, 3, 70, [25,  0,  2]]',
      parsed: '+25% à la MAG de l\'équipement si l\'unité porte une seule arme (TDH)'
    },
    {effect: '[0, 3, 72, [123456]]', parsed: 'Améliore la limite de l\'unité'},
    {
      effect: '[0, 3, 75, [4, 5, 50, 50]]',
      parsed: '+50% de dégâts physiques et magiques contre les humains si l\'unité porte un <a href="ffexvius_objects.php?categid=28">katana</a>'
    },
    {
      effect: '[0, 3, 75, [[8,  9,  15], 10, 100, 100]]',
      parsed: '+100% de dégâts physiques et magiques contre les pierres si l\'unité porte une <a href="ffexvius_objects.php?categid=29">hache</a>, un <a href="ffexvius_objects.php?categid=13">marteau</a> ou une <a href="ffexvius_objects.php?categid=26">masse</a>'
    },
    {
      effect: '[0, 3, 76, [4, 0, 0, 0, 10, 10, 0, 20, 20]]',
      parsed: '+20% de rés. Lumière, Ténèbres, +10% de rés. Eau, Vent si l\'unité porte un <a href="ffexvius_objects.php?categid=28">katana</a>'
    },
    {
      effect: '[0, 3, 76, [[1,  2,  3], 50, 0, 0, 0, 0, 0, 0, 0]]',
      parsed: '+50% de rés. Feu si l\'unité porte une <a href="ffexvius_objects.php?categid=16">dague</a>, une <a href="ffexvius_objects.php?categid=1">épée</a> ou une <a href="ffexvius_objects.php?categid=27">épée longue</a>'
    },
    {effect: '[0, 3, 77, [10, 1, 0]]', parsed: '-10% de PM consommés'},
    {effect: '[0, 3, 77, [30,  1,  4]]', parsed: '-30% de PM consommés'},
    {
      effect: '[0, 3, 80, [123456, 0, 15, 0, 0]]',
      parsed: 'Améliore la limite de l\'unité quand les PV passent sous 15%'
    },
    {
      effect: '[0, 3, 80, [123456, 0, 20, 0, 1]]',
      parsed: 'Améliore la limite de l\'unité pour 1 tour quand les PV passent sous 20%'
    },
    {
      effect: '[0, 3, 80, [123456, 0, 40, 0, 3]]',
      parsed: 'Améliore la limite de l\'unité pour 3 tours quand les PV passent sous 40%'
    },
    {
      effect: '[0,3,81,["n\'importe quoi"]]',
      parsed: '+200% au coefficient multiplicateur maximal de la chaîne de combo si l\'unité porte deux armes'
    },
    {effect: '[0, 3, 82, [10,  1]]', parsed: 'Absorbe 10% des dégâts infligés par les attaques de type physique'},
    {effect: '[0,3,84,[75]]', parsed: '+75% au multiplicateur de départ des chaînes de combos physiques'},
    {effect: '[0,3,85,[100]]', parsed: '+100% au multiplicateur de départ des chaînes de combos magiques'},
    {effect: '[0,3,89,[0,0,0,0,2000,0]]', parsed: '+2000 PV'},
    {effect: '[0,3,89,[100,100,0,0,2000,0]]', parsed: '+2000 PV, +100 ATT/DÉF'},
    {effect: '[0, 3, 89, [200,  0,  0,  0,  0]]', parsed: '+200 ATT'},
    {effect: '[0,3,95,[2,70]]', parsed: '+70% de dégâts magiques sur les cibles en état de choc'},
    {effect: '[0,3,98,[0,50,0,1]]', parsed: '+50% au coefficient multiplicateur maximal de la chaîne de combo'},
    {
      effect: '[0, 3, 99, [3, 200, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]]',
      parsed: '+200% MAG de l\'équipement si l\'unité porte une seule arme avec ou sans bouclier'
    },
    {
      effect: '[0, 3, 99, [2, 50, [8,  16]]]',
      parsed: '+50% DÉF de l\'équipement si l\'unité porte une seule arme de type <a href="ffexvius_objects.php?categid=29">hache</a> ou <a href="ffexvius_objects.php?categid=18">griffe</a> avec ou sans bouclier'
    },
    {
      effect: '[0, 3, 10003, [10, 10, 20, 20, 10, 20]]',
      parsed: '+20% ATT/MAG/PSY de l\'équipement si l\'unité porte une seule arme à une main (DH)'
        + HTML_LINE_RETURN + '+10% PV/PM/DÉF de l\'équipement si l\'unité porte une seule arme à une main (DH)'
    },
    {
      effect: '[1, 3, 10003, [0, 0, 100, 0, 50, 0, 1]]',
      parsed: '+100% ATT de l\'équipement si l\'unité porte une seule arme (TDH)'
        + HTML_LINE_RETURN + '+50% DÉF de l\'équipement si l\'unité porte une seule arme (TDH)'
    },
    {
      effect: '[0, 3, 10004, [2, 10, 10, 20, 10, 10, 20]]',
      parsed: '+20% ATT/PSY, +10% PV/PM/DÉF/MAG si l\'unité porte une arme d\'élément Glace'
    },
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
