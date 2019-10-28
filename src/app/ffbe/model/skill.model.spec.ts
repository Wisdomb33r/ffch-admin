import {Skill} from './skill.model';

export const MAGIC_SKILLS_TEST_DATA =
  `{
    "10010": {
        "name": "Libra",
        "icon": "ability_2.png",
        "compendium_id": 1,
        "rarity": 1,
        "cost": {"MP": 1},
        "magic_type": "White",
        "is_sealable": true,
        "is_reflectable": false,
        "in_exploration": false,
        "attack_count": [1],
        "attack_damage": [[100]],
        "attack_frames": [[130]],
        "effect_frames": [[40]],
        "move_type": 0,
        "effect_type": "Default",
        "attack_type": "Magic",
        "element_inflict": null,
        "effects": ["Allows you to view info on an enemy"],
        "effects_raw": [[1, 1, 47, [134]]],
        "requirements": null
    },
    "10020": {
        "name": "Cure",
        "icon": "ability_4.png",
        "compendium_id": 2,
        "rarity": 1,
        "cost": {"MP": 3},
        "magic_type": "White",
        "is_sealable": true,
        "is_reflectable": true,
        "in_exploration": true,
        "attack_count": [1],
        "attack_damage": [[100]],
        "attack_frames": [[90]],
        "effect_frames": [[40,  40]],
        "move_type": 0,
        "effect_type": "Default",
        "attack_type": "Magic",
        "element_inflict": null,
        "effects": ["Restore 150 (+3x, Heal) HP to target"],
        "effects_raw": [[1, 6, 2, [0,  0,  150,  300,  100]]],
        "requirements": null
    },
    "10030": {
        "name": "Blindna",
        "icon": "ability_3.png",
        "compendium_id": 3,
        "rarity": 1,
        "cost": {"MP": 3},
        "magic_type": "White",
        "is_sealable": true,
        "is_reflectable": true,
        "in_exploration": true,
        "attack_count": [1],
        "attack_damage": [[100]],
        "attack_frames": [[120]],
        "effect_frames": [[40]],
        "move_type": 0,
        "effect_type": "Default",
        "attack_type": "Magic",
        "element_inflict": null,
        "effects": ["Cure Blind for one ally"],
        "effects_raw": [[1, 2, 5, [2,  0,  0,  0,  0,  0,  0,  0]]],
        "requirements": null
    },
    "20430": {
        "name": "Meteor",
        "icon": "ability_29.png",
        "compendium_id": 142,
        "rarity": 8,
        "cost": {"MP": 50},
        "magic_type": "Black",
        "is_sealable": false,
        "is_reflectable": false,
        "in_exploration": false,
        "attack_count": [1],
        "attack_damage": [[100]],
        "attack_frames": [[350]],
        "effect_frames": [[40,  40]],
        "move_type": 0,
        "effect_type": "Default",
        "attack_type": "Magic",
        "element_inflict": null,
        "effects": ["Magic damage (2.5x * 1.33 = 3.33x, MAG) to all enemies (ignore reflect)"],
        "effects_raw": [[2, 1, 70, [0,  0,  250,  25]]],
        "requirements": null
    }
  }`;

export const PASSIVE_SKILLS_TEST_DATA =
  `{
    "100010": {
        "name": "HP +10%",
        "icon": "ability_77.png",
        "compendium_id": 1,
        "rarity": 1,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": ["Increase HP by 10%"],
        "effects_raw": [[1, 3, 1, [0,  0,  0,  0,  10,  0,  0]]],
        "requirements": null,
        "unit_restriction": null
    },
    "100020": {
        "name": "HP +20%",
        "icon": "ability_77.png",
        "compendium_id": 2,
        "rarity": 3,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": ["Increase HP by 20%"],
        "effects_raw": [[1, 3, 1, [0,  0,  0,  0,  20,  0,  0]]],
        "requirements": null,
        "unit_restriction": null
    },
    "100021": {
        "name": "HP +20%",
        "icon": "ability_77.png",
        "compendium_id": 2,
        "rarity": 3,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": ["Increase HP by 20%"],
        "effects_raw": [[1, 3, 1, [0,  0,  0,  0,  20,  0,  0]]],
        "requirements": null,
        "unit_restriction": null
    }
  }`;

export const ABILITY_SKILLS_TEST_DATA =
  `{
    "200190": {
        "name": "Bless",
        "icon": "ability_92.png",
        "compendium_id": 79,
        "rarity": 4,
        "cost": {"MP": 20},
        "attack_count": [1],
        "attack_damage": [[100]],
        "attack_frames": [[120]],
        "effect_frames": [[40,  40]],
        "move_type": 4,
        "motion_type": 2,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": ["Restore 10 (+0.1x, Heal) MP split over 3 turns to all allies"],
        "effects_raw": [[2, 2, 30, [10,  1,  10,  3]]],
        "requirements": null,
        "unit_restriction": null
    },
    "200200": {
        "name": "Kick",
        "icon": "ability_51.png",
        "compendium_id": 80,
        "rarity": 3,
        "cost": {"MP": 9},
        "attack_count": [3],
        "attack_damage": [[33,  33,  34]],
        "attack_frames": [[2,  5,  8]],
        "effect_frames": [[0,  3,  6]],
        "move_type": 6,
        "motion_type": 5,
        "effect_type": "Default",
        "attack_type": "Physical",
        "element_inflict": null,
        "effects": ["Physical damage (1.1x, ATK) to all enemies"],
        "effects_raw": [[2, 1, 1, [0,  0,  0,  0,  0,  0,  110,  0]]],
        "requirements": null,
        "unit_restriction": null
    },
    "200270": {
        "name": "Lance",
        "icon": "ability_6.png",
        "compendium_id": 87,
        "rarity": 3,
        "cost": {"MP": 10},
        "attack_count": [1, 1],
        "attack_damage": [[100], [100]],
        "attack_frames": [[120], [120]],
        "effect_frames": [[40,  40,  60]],
        "move_type": 4,
        "motion_type": 2,
        "effect_type": "Drain HP",
        "attack_type": "Physical",
        "element_inflict": null,
        "effects": [
            "Physical damage (0.8x, ATK) as HP drain (20%) to one enemy",
            "Physical damage (0.3x, ATK) as MP drain (10%) to one enemy"
        ],
        "effects_raw": [[1, 1, 25, [20,  80,  100]], [1, 1, 10, [10,  30,  100]]],
        "requirements": null,
        "unit_restriction": null
        },
    "202340": {
        "name": "Rapid Fire",
        "icon": "ability_61.png",
        "compendium_id": 281,
        "rarity": 6,
        "cost": {"MP": 16},
        "attack_count": [0],
        "attack_damage": [[]],
        "attack_frames": [[]],
        "effect_frames": [[]],
        "move_type": 1,
        "motion_type": 1,
        "effect_type": "Default",
        "attack_type": "Physical",
        "element_inflict": null,
        "effects": ["1-6 physical attacks (1x each, 3.5x avg, ATK) to one random enemy"],
        "effects_raw": [[3, 1, 42, [0,  0,  1,  6,  100,  0]]],
        "requirements": null,
        "unit_restriction": null
    },
    "509024": {
        "name": "Twin Meteor",
        "icon": "ability_105.png",
        "compendium_id": 4644,
        "rarity": 9,
        "cost": {"MP": 145},
        "attack_count": [60],
        "attack_damage": [[1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2]],
        "attack_frames": [[141,  147,  153,  159,  165,  171,  177,  183,  189,  195,  201,  207,  213,  219,  225,  231,  237,  243,  249,  255,  261,  267,  273,  279,  285,  291,  297,  303,  309,  315,  321,  327,  333,  339,  345,  351,  357,  363,  369,  375,  381,  387,  393,  399,  405,  411,  417,  423,  429,  435,  441,  447,  453,  459,  465,  471,  477,  483,  489,  495]],
        "effect_frames": [[40,  40,  200,  200]],
        "move_type": 4,
        "motion_type": 8,
        "effect_type": "Default",
        "attack_type": "Magic",
        "element_inflict": ["Light"],
        "effects": ["Magic light damage (18x * 2 = 36x, MAG) to all enemies (ignore reflect)"],
        "effects_raw": [[2, 1, 70, [0,  0,  1800,  50]]],
        "requirements": null,
        "unit_restriction": null
    },
    "509624": {
        "name": "Brave Blade (FFV)",
        "icon": "ability_54.png",
        "compendium_id": 10707,
        "rarity": 9,
        "cost": {"MP": 99},
        "attack_count": [4, 3, 1],
        "attack_damage": [[25,  25,  25,  25], [30,  30,  40], [100]],
        "attack_frames": [[70,  76,  82,  88], [94,  100,  106], [112]],
        "effect_frames": [[40,  40,  40]],
        "move_type": 4,
        "motion_type": 2,
        "effect_type": "Default",
        "attack_type": "Physical",
        "element_inflict": null,
        "effects": [
            "Physical damage (0.25x * 2 = 0.5x, ATK) to one enemy (ignore cover)",
            "Physical damage (0.5x * 2 = 1x, ATK) to one enemy (ignore cover)",
            "Physical damage (5x * 2 = 10x, ATK) to one enemy (ignore cover)"
        ],
        "effects_raw": [[1, 1, 21, [0,  0,  25,  -50]], [1, 1, 21, [0,  0,  50,  -50]], [1, 1, 21, [0,  0,  500,  -50]]],
        "requirements": null,
        "unit_restriction": null
    },
    "912882": {
        "name": "Siphon Lance",
        "icon": "ability_6.png",
        "compendium_id": 86444,
        "rarity": 5,
        "cost": {"MP": 10},
        "attack_count": [7, 7, 1],
        "attack_damage": [[12,  12,  12,  12,  13,  19,  20], [12,  12,  12,  12,  13,  19,  20], [100]],
        "attack_frames": [[40,  50,  60,  70,  80,  90,  100], [35,  45,  55,  65,  75,  85,  95], [0]],
        "effect_frames": [[39,  48,  57,  66,  75,  84,  93], [35,  44,  53,  62,  71,  80,  89]],
        "move_type": 4,
        "motion_type": 5,
        "effect_type": "Default",
        "attack_type": "Physical",
        "element_inflict": null,
        "effects": [
            "Physical damage (3x, ATK) to one enemy",
            "Physical damage (0.8x, ATK) as HP drain (50%) to one enemy",
            "Restore 160 MP to caster"
        ],
        "effects_raw": [[1, 1, 1, [0,  0,  0,  0,  0,  0,  300]], [1, 1, 25, [50,  80,  100]], [0, 3, 17, [160]]],
        "requirements": null,
        "unit_restriction": null
    },
    "229425": {
        "name": "Get Serious",
        "icon": "ability_105.png",
        "compendium_id": 4620,
        "rarity": 9,
        "cost": {"MP": 100},
        "attack_count": [1],
        "attack_damage": [[100]],
        "attack_frames": [[100]],
        "effect_frames": [[40,  70,  40]],
        "move_type": 4,
        "motion_type": 2,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": [
            "Unlock Get Serious (509014) on turn 1 [8 turns CD]"
        ],
        "effects_raw": [[0, 3, 130, [509014, 1, [7,  7], 0]]],
        "requirements": null,
        "unit_restriction": null
    },
    "509014": {
        "name": "Get Serious",
        "icon": "ability_105.png",
        "compendium_id": 4620,
        "rarity": 9,
        "cost": {"MP": 100},
        "attack_count": [1],
        "attack_damage": [[100]],
        "attack_frames": [[100]],
        "effect_frames": [[40,  70,  40]],
        "move_type": 4,
        "motion_type": 2,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": [
            "Increase ATK by 250% for 6 turns to caster",
            "Remove ATK, DEF, MAG and SPR debuff from caster",
            "Increase break resistance to ATK, DEF, MAG and SPR by 100% for 6 turns to caster",
            "Gain 3 uses of Baaad Breath (509010), Bad Breath (229418), Brutal Whip (229426), First-Aid Malboro (229413), Get Serious (229425), Ground Whip (229420), Malboro Support (229428), Malboro Tentacle (229414), Smash (229412), Toxic Whip (229427) and Wild Whip (229419) for 4 turns"
        ],
        "effects_raw": [[0, 3, 3, [250,  0,  0,  0,  6,  1,  0]], [0, 3, 111, [1,  1,  1,  1,  0,  0]], [0, 3, 89, [100,  100,  100,  100,  0,  0,  6,  1]], [0, 3, 98, [3, 912380, -1, [229412,  229413,  229414,  229418,  229419,  229420,  229425,  229426,  229427,  229428,  509010], 5, 1, 1, 0]]],
        "requirements": null,
        "unit_restriction": null
    },
    "912380": {
        "name": "Triple Whip",
        "icon": "ability_8.png",
        "compendium_id": 86060,
        "rarity": 9,
        "cost": {},
        "attack_count": [0],
        "attack_damage": [[]],
        "attack_frames": [[]],
        "effect_frames": [[]],
        "move_type": 4,
        "motion_type": 3,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": ["Gain 3 uses of Baaad Breath (509010), Bad Breath (229418), Brutal Whip (229426), First-Aid Malboro (229413), Get Serious (229425), Ground Whip (229420), Malboro Support (229428), Malboro Tentacle (229414), Smash (229412), Toxic Whip (229427) and Wild Whip (229419) for one turn"],
        "effects_raw": [[0, 3, 53, [3, 229421, -1, [229412,  229413,  229414,  229418,  229419,  229420,  229425,  229426,  229427,  229428,  509010], 1]]],
        "requirements": null,
        "unit_restriction": null
    },
    "510754": {
        "name": "Saviour of Erdrea",
        "icon": "ability_77.png",
        "compendium_id": 7355,
        "rarity": 9,
        "cost": {},
        "attack_count": [0],
        "attack_damage": [[]],
        "attack_frames": [[]],
        "effect_frames": [[]],
        "move_type": 4,
        "motion_type": 2,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": [
            "Gain 3 uses of Dragon Slash (DQ XI S) (233100), Falcon Slash (233106), Flame Slash (DQ XI S) (233102), Flame Smash (233104), Flamesplitter (233110), Gigagash (233111), Gigaslash (233109), Gigasmash (233103), Miracle Slash (233101), Quadraslash (510750), The Luminary Awakens (233108), Unbridled Blade (233105) and Yggdragon's Blessing (233112) for one turn",
            "Use Saviour of Erdrea (510755) after a 2 turn delay on caster",
            "Use Saviour of Erdrea (510756) after a 5 turn delay on caster"
        ],
        "effects_raw": [[0, 3, 98, [3, 912380, -1, [233100,  233101,  233102,  233103,  233104,  233105,  233106,  233108,  233109,  233110,  233111,  233112,  510750], 1, 1, 1, 0, 1, -1]], [0, 3, 132, [510755,  0,  2,  100,  0,  510755]], [0, 3, 132, [510756,  0,  5,  100,  0,  510756]]],
        "requirements": null,
        "unit_restriction": null
    }
  }`;

export const MAGIC_SKILLS_NAMES_TEST_DATA =
  `{
    "10010": [
        "Libra",
        "窺伺探測",
        "라이브라",
        "Acuité",
        "Analyse",
        "Libra"
    ],
    "10020": [
        "Cure",
        "療傷",
        "케알",
        "Soin",
        "Vita",
        "Cura"
    ],
    "10030": [
        "Blindna",
        "復明",
        "블라나",
        "Vision",
        "Lux",
        "Luz"
    ],
    "20430": [
        "Meteor",
        "隕石",
        "메테오",
        "Météore",
        "Meteo",
        "Meteo"
    ]
  }`;

export const ABILITY_SKILLS_NAMES_TEST_DATA =
  `{
    "100010": [
        "HP +10%",
        "HP+10%",
        "HP+10%",
        "PV +10%",
        "LP + 10 %",
        "VIT +10%"
    ],
    "100020": [
        "HP +20%",
        "HP+20%",
        "HP+20%",
        "PV +20%",
        "LP + 20 %",
        "VIT +20%"
    ],
    "100021": [
        "HP +20%",
        "HP+20%",
        "HP+20%",
        "PV +20%",
        "LP +20%",
        "VIT +20%"
    ],
    "200190": [
        "Bless",
        "精神波",
        "정신파",
        "Bénédiction",
        "Segen",
        "Bendición"
    ],
    "200200": [
        "Kick",
        "踢擊",
        "발차기",
        "Coup de pied",
        "Tritt",
        "Puntapié"
    ],
    "200270": [
        "Lance",
        "龍劍",
        "용권",
        "Transpercer",
        "Lanze",
        "Alma de dragón"
    ],
    "202340": [
        "Rapid Fire",
        "連續射擊",
        "속사포",
        "Tir rapide",
        "Schnellfeuer",
        "Tiro rápido"
    ],
        "509024": [
        "Twin Meteor",
        "W隕石",
        "W메테오",
        "Météore X",
        "Doppelmeteo",
        "Meteo dual"
    ],
    "509624": [
        "Brave Blade (FFV)",
        "勇者利劍(FFV)",
        "브레이브 블레이드(FFV)",
        "Lame des braves (FFV)",
        "Mutklinge (FFV)",
        "Hoja valiente (FFV)"
    ],
    "912882": [
        "Siphon Lance",
        "攝魔長槍",
        "흡수의 창",
        "Lance siphon",
        "Soglanze",
        "Lanza sifón"
    ],
    "229425": [
        "Get Serious",
        "認真",
        "진심",
        "Fini de jouer",
        "Ernst machen",
        "Pongámonos serios"
    ],
    "509014": [
        "Get Serious",
        "認真",
        "진심",
        "Fini de jouer",
        "Ernst machen",
        "Látigo venenoso"
    ],
    "912380": [
        "Triple Whip",
        "T鞭打",
        "T채찍",
        "Fouet triple",
        "Dreifachpeitsche",
        "Látigo triple"
    ],
    "510754": [
        "Saviour of Erdrea",
        "羅德賽塔西亞的救世主",
        "로토제타시아의 구세주",
        "Sauveur d'Elréa",
        "Retter von Erdria",
        "Salvador de Erdrea"
    ]
  }`;

export const MAGIC_SKILLS_SHORTDESCRIPTIONS_TEST_DATA =
  `{
    "10010": [
        "View info on one enemy",
        "查看1名敵人的情報",
        "적 1명의 정보 확인",
        "Obtient des infos sur un ennemi",
        "Info über Gegner",
        "Mira la información de un enemigo"
    ],
    "10020": [
        "Restore HP for one ally",
        "恢復1名隊員的HP",
        "아군 1명의 HP 회복",
        "Soigne un allié",
        "Heilt LP, ein Verb.",
        "Recupera VIT de un aliado"
    ],
    "10030": [
        "Cure blind for one ally",
        "治療1名隊員的失明狀態",
        "아군 1명의 암흑 회복",
        "Guérit un allié de cécité",
        "Heilt „Blind“, ein Verb.",
        "Cura la ceguera de un aliado"
    ],
    "20430": [
        "Deal partial unmitigated magic damage to all enemies",
        "對全體敵人發動無視部分魔法防禦的攻擊",
        "적 전체에 일부 마법 방어 무시 피해",
        "Dégâts magiques en partie fixes sur tous les ennemis",
        "Teilweise direkter Magieschaden, alle Ziele",
        "Daño mágico que ignora parcialmente la DEF de todos los enemigos"
    ],
    "509024": [
        "(One use every 7 turns) Deal partial unmitigated light magic damage to all enemies",
        "【每7回合可使用1次】對全體敵人發動光屬性無視部份魔法防禦的攻擊",
        "[7턴에 1회 사용 가능] 적 전체에 빛속성 일부 마법 방어 무시 피해",
        "(Une fois tous les 7 tours) Inflige des dégâts magiques de lumière en partie fixes à tous les ennemis",
        "(Einmal in 7 Runden) Fügt allen Gegnern teilweise direkten magischen Lichtschaden zu.",
        "(Un uso cada 7 turnos) Daño mágico de luz que ignora parcialmente la DEF de todos los enemigos"
    ]
  }`;

export const ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA =
  `{
    "100010": [
        "Boost HP by 10%",
        "提高10%HP",
        "HP 10% 상승",
        "Augmente les PV de 10 %",
        "Erhöht LP um 10 %",
        "Aumenta la VIT un 10%"
    ],
    "100020": [
        "Boost HP by 20%",
        "提高20%HP",
        "HP 20% 상승",
        "Augmente les PV de 20 %",
        "Erhöht LP um 20 %",
        "Aumenta la VIT un 20%"
    ],
    "100021": [
        "Boost HP by 20%",
        "提高20%HP",
        "HP 20% 상승",
        "Augmente les PV de 20 %",
        "Erhöht LP um 20 %",
        "Aumenta la VIT un 20%"
    ],
    "200190": [
        "Gradually restore MP for all allies",
        "持續恢復全體隊員的MP",
        "아군 전체의 MP 서서히 회복",
        "Rend petit à petit des PM à tous les alliés",
        "Füllt allmählich MP bei allen Verb.",
        "Recupera PM de todos los aliados poco a poco"
    ],
    "200200": [
        "Damage all enemies",
        "攻擊全體敵人",
        "적 전체에 피해",
        "Dégâts sur tous les ennemis",
        "Fügt allen Gegnern Schaden zu",
        "Daña a todos los enemigos"
    ],
    "200270": [
        "Drain HP and MP from one enemy",
        "吸收1名敵人的HP和MP",
        "적 1명의 HP와 MP 흡수",
        "Aspire les PV et PM d'un ennemi",
        "Stiehlt MP und LP, ein Ziel",
        "Absorbe VIT y PM de un enemigo"
    ],
    "202340": [
        "Randomly damage single enemies one to six times",
        "隨機攻擊敵人1~6次",
        "적에게 무작위로 1~6회 피해",
        "Dégâts sur un ennemi au hasard, de 1 à 6 fois",
        "Verursacht 1-6 Mal Schaden bei zufällig gewählten Gegnern.",
        "Daño al azar de una a 6 veces a todos los enemigos"
    ],
    "509624": [
        "Deal partial unmitigated damage to one enemy three times",
        "對1名敵人發動3次發動無視部分防禦的攻擊",
        "적 1명에게 3회 일부 방어 무시 피해",
        "Inflige des dégâts en partie fixes à un ennemi à 3 reprises",
        "Fügt einem Gegner dreimal teilweise direkten Schaden zu.",
        "Daño que ignora parcialmente la DEF de un enemigo 3 veces"
    ],
    "912882": [
        "Damage and drain HP from one enemy and restore own MP",
        "攻擊1名敵人+吸收HP+恢復自身的MP",
        "적 1명에게 피해+HP 흡수+자신의 MP 회복",
        "Inflige des dégâts et aspire les PV d'un ennemi et restaure les PM du lanceur",
        "Fügt einem Gegner Schaden zu, stiehlt dessen LP und regeneriert MP des Benutzers.",
        "Daña a un enemigo, absorbe su VIT, y recupera PM propios"
    ],
    "229425": [
        "(One use every 8 turns) Boost ATK, and remove and boost resistance to ATK, DEF, MAG, and SPR reductions for self and enable triple whip for four turns",
        "【每8回合可使用1次】提高自身攻擊+解除降低攻擊防禦魔力精神的效果+提高降低攻擊防禦魔力精神的耐性+4回合內可使用「T鞭打」",
        "[8턴에 1회 사용 가능] 자신의 공격력 상승+공격력, 방어력, 마력, 정신력 감소 효과 해제 및 감소 저항력 상승+4턴 동안 'T채찍' 사용 가능",
        "(Une fois tous les 8 tours) Augmente l'ATT, dissipe les réductions de l'ATT, la DEF, la MAGIE et la PSY, augmente la résistance du lanceur à ces réductions, et permet d'utiliser Fouet triple pendant 4 tours",
        "(Einmal in 8 Runden) Erhöht ANG, entfernt und erhöht dann Resistenz gegen ANG-, ABW-, MAG- und PSY-Verringerungen für Benutzer + ermöglicht 4 Runden lang Dreifachpeitsche.",
        "(Un uso cada 8 turnos) Aumenta el ATQ, elimina las reducciones de ATQ, DEF, MAG y ESP, aumenta la resistencia propia a los mismos, y aprende Látigo triple durante 4 turnos"
    ],
    "509014": [
        "(One use every 8 turns) Boost ATK, and remove and boost resistance to ATK, DEF, MAG, and SPR reductions for self and enable triple whip for four turns",
        "【每8回合可使用1次】提高自身攻擊+解除降低攻擊防禦魔力精神的效果+提高降低攻擊防禦魔力精神的耐性+4回合內可使用「T鞭打」",
        "[8턴에 1회 사용 가능] 자신의 공격력 상승+공격력, 방어력, 마력, 정신력 감소 효과 해제 및 감소 저항력 상승+4턴 동안 'T채찍' 사용 가능",
        "(Une fois tous les 8 tours) Augmente l'ATT du lanceur, dissipe les réductions de son ATT, sa DEF, sa MAGIE et sa PSY, augmente sa résistance ces réductions, et permet d'utiliser Fouet triple pendant 4 tours",
        "(Einmal in 8 Runden) Erhöht ANG, entfernt und erhöht dann Resistenz gegen ANG-, ABW-, MAG- und PSY-Verringerungen für Benutzer + ermöglicht 4 Runen lang Dreifachpeitsche.",
        "(Un uso cada 8 turnos) Aumenta el ATQ, elimina las reducciones de ATQ, DEF, MAG y ESP, aumenta la resistencia propia a los mismos, y aprende Látigo triple durante 4 turnos"
    ],
    "912380": [
        "Enable specific abilities to be used three times in one turn (Activate one time each regardless of equipment conditions)",
        "1回合內可以使用3次特定能力（無視裝備狀態，只會各發動1次）",
        "1턴 동안 특정 어빌리티 3회 사용 가능(장비 상태와 관계 없이 1회씩 발동)",
        "Permet d'utiliser des aptitudes spécifiques trois fois en un tour (s'active une seule fois, quel que soit l'équipement)",
        "Ermöglicht gewissen Fertigkeiten dreimalige Anwendung in einer Runde (Aktiviere je ein Mal, unabhängig von Ausrüstungssituation).",
        "Aprende determinadas habilidades que se pueden usar 3 veces en un mismo turno (se activa una vez cada una sin importar las condiciones del equipo)"
    ],
    "510754": [
        "Enable threepeat performance for one turn at the beginning of battle or after being revived, and gradually boost damage of certain abilities after two turns",
        "戰鬥開始時和從無法戰鬥狀態中復活的1回合內可使用「3回行動」+2回合後持續提高特定能力的傷害",
        "전투 시작 시 및 전투불능 상태에서 회복했을 때 1턴 동안 '3회 행동' 사용 가능+2턴 후 특정 어빌리티의 피해량 서서히 상승",
        "Permet d'utiliser Performance triple pendant un tour au début du combat ou après avoir été ranimé, et augmente progressivement les dégâts de certaines aptitudes après 2 tours",
        "Ermöglicht bei Kampfbeginn oder nach Wiederbelebung Dreifachvorstellung für eine Runde und erhöht nach zwei Runden allmählich den Schaden bestimmter Fertigkeiten.",
        "Aprende Ración triple durante un turno al inicio del combate o tras ser revivido, y aumenta poco a poco el daño de determinadas habilidades tras 2 turnos"
    ]
  }`;

describe('Skill', () => {
  it('should not be considered damaging if having fixed damages to caster', () => {
    // GIVEN
    const skill: Skill = new Skill();
    skill.active = true;
    const effect = JSON.parse('[0, 3, 41, [300, 0]]');
    // WHEN
    const result = skill.isEffectWithDamage(effect);
    // THEN
    expect(result).toBe(false);
  });

  it('should be considered damaging if having fixed damages to enemies', () => {
    // GIVEN
    const skill: Skill = new Skill();
    skill.active = true;
    const effect = JSON.parse('[2, 1, 41, [300, 0]]');
    // WHEN
    const result = skill.isEffectWithDamage(effect);
    // THEN
    expect(result).toBe(true);
  });
});
