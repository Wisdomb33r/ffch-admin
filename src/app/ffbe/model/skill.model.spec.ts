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
    ]
  }`;
