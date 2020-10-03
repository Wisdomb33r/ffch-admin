import {Skill} from './skill.model';
import {Caracteristiques} from './caracteristiques.model';
import {ResistancesElementaires} from './resistances-elementaires.model';
import {ResistancesAlterations} from './resistances-alterations.model';
import {Tueurs} from './tueurs.model';

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
    },
        "40140": {
        "name": "Seed Cannon",
        "icon": "ability_10.png",
        "compendium_id": 268,
        "rarity": 6,
        "cost": {"MP": 40},
        "magic_type": "Blue",
        "is_sealable": false,
        "is_reflectable": false,
        "in_exploration": false,
        "attack_count": [1],
        "attack_damage": [[100]],
        "attack_frames": [[50]],
        "effect_frames": [[40,  40]],
        "move_type": 0,
        "effect_type": "Default",
        "attack_type": "Magic",
        "element_inflict": null,
        "effects": ["Magic damage (4.95x, MAG) to one enemy"],
        "effects_raw": [[1, 1, 15, [0,  0,  0,  0,  0,  495,  0]]],
        "requirements": [["SWITCH", 18519013]]
    },
    "20300": {
        "name": "Blizzaja",
        "icon": "ability_22.png",
        "compendium_id": 129,
        "rarity": 7,
        "cost": {"MP": 28},
        "magic_type": "Black",
        "is_sealable": true,
        "is_reflectable": true,
        "in_exploration": false,
        "attack_count": [1],
        "attack_damage": [[100]],
        "attack_frames": [[240]],
        "effect_frames": [[40]],
        "move_type": 0,
        "effect_type": "Default",
        "attack_type": "Magic",
        "element_inflict": ["Ice"],
        "effects": ["Magic ice damage (2x, MAG) with consecutive damage increase (max. 4 times, +1x MAG each, 6x total) to all enemies"],
        "effects_raw": [[2, 1, 72, [0,  0,  100,  100,  100,  5]]],
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
    },
    "100090": {
        "name": "ATK +30%",
        "icon": "ability_77.png",
        "compendium_id": 183,
        "rarity": 5,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": ["Increase ATK by 30%"],
        "effects_raw": [[1, 3, 1, [30,  0,  0,  0,  0,  0,  0]]],
        "requirements": null,
        "unit_restriction": null
    },
    "227160": {
        "name": "Glory of Ares",
        "icon": "ability_77.png",
        "compendium_id": 3057,
        "rarity": 9,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": [
            "Increase LB gauge by 2 per turn",
            "Increase equipment ATK by 50% when armed with two weapons",
            "Replace LB with Kingdom's Order (900000087):\\n\\tPhysical damage (7.05x * 2 = 14.1x, ATK) to all enemies (ignore cover)\\n\\tReduce resistance to Lightning, Wind and Light by 50% for 3 turns to all enemies\\n\\tReduce ATK, DEF, MAG and SPR by 74% for 3 turns to all enemies\\n\\tGain Greased Lightning (501980), Quickbolt Blade (501970) and Swiftwind Blade (501960) for 3 turns"
        ],
        "effects_raw": [[0, 3, 33, [200]], [0, 3, 69, [1,  50]], [0, 3, 72, [900000087]]],
        "requirements": [["EQUIP", 504213800], ["EQUIP", 303004500]],
        "unit_restriction": null
    },
    "234232": {
        "name": "Will to Change the Future",
        "icon": "ability_41.png",
        "compendium_id": 8243,
        "rarity": 8,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": [
            "Increase DEF and MP by 20%",
            "Increase the damage of Aeroga Rain (234216), Blasting Arrow (234210), Drilling Arrow (234211), Giant Drop (Amanojaku) (234214), Hallowed Arrow (234212), Head Twister (Pulse Knight) (234220), Holy Rain (234218), Snort (Typhon) (234224) and Stonga Rain (234217) by (8.5x)",
            "Replace LB with Ultima Arrow (900000353) for 2 turns if HP is below 21%:\\n\\tMagic damage (18x * 2 = 36x, MAG) to all enemies (ignore reflect)\\n\\tReduce resistance to Wind, Earth and Light by 120% for 3 turns to all enemies\\n\\tFill esper gauge by 10\\n\\tIncrease damage of Aeroga Rain (234216), Blasting Arrow (234210), Drilling Arrow (234211), Giant Drop (Amanojaku) (234214), Hallowed Arrow (234212), Head Twister (Pulse Knight) (234220), Holy Rain (234218), Snort (Typhon) (234224) and Stonga Rain (234217) by 1500% for 4 turns"
        ],
        "effects_raw": [[0, 3, 1, [0,  20,  0,  0,  0,  20,  0]], [0, 3, 73, [[234210,  234211,  234212,  234214,  234216,  234217,  234218,  234220,  234224], 0, 0, 850]], [0, 3, 80, [900000353,  99999,  21,  0,  2]]],
        "requirements": null,
        "unit_restriction": null
    },
    "707785": {
        "name": "Kingdom's Hero",
        "icon": "ability_91.png",
        "compendium_id": 3682,
        "rarity": 8,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": [
            "Increase DEF, SPR, HP and MP by 20%",
            "Increase LB gauge by 2 per turn",
            "Increase the limit burst gauge fill rate by 50%",
            "Increase equipment ATK by 10% when armed with two weapons"
        ],
        "effects_raw": [[0, 3, 1, [0,  20,  0,  20,  20,  20,  0]], [0, 3, 33, [200]], [0, 3, 31, [50]], [0, 3, 69, [1,  10]]],
        "requirements": null,
        "unit_restriction": null
    },
    "707786": {
        "name": "Kingdom's Hero",
        "icon": "ability_91.png",
        "compendium_id": 3682,
        "rarity": 8,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": [
            "Increase DEF, SPR, HP and MP by 20%",
            "Increase LB gauge by 2 per turn",
            "Increase the limit burst gauge fill rate by 50%",
            "Increase equipment ATK by 60% when armed with two weapons",
            "Replace LB with Darkness Purging Blades of Azure Crimson (900000330):\\n\\tPhysical damage (15.2x, ATK) to all enemies\\n\\tReduce resistance to Fire and Ice by 76% for 3 turns to all enemies\\n\\tIncrease damage of Octostrike Blade skills  [(228081) / +1 (707783) / +2 (707784)] by 1400% for 2 turns"
        ],
        "effects_raw": [[0, 3, 1, [0,  20,  0,  20,  20,  20,  0]], [0, 3, 33, [200]], [0, 3, 31, [50]], [0, 3, 69, [1,  60]], [0, 3, 72, [900000330]]],
        "requirements": null,
        "unit_restriction": null
    },
        "950144": {
        "name": "Trace of Crimson Rain",
        "icon": "ability_77.png",
        "compendium_id": 353,
        "rarity": 9,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": ["Gain Trace of Crimson Rain (950146) at the start of the turn if Aldore King Rain is alive"],
        "effects_raw": [[0, 3, 10002, [100023205,  3,  950146,  0]]],
        "requirements": null,
        "unit_restriction": null
    },
    "950145": {
        "name": "Trace of Crimson Rain I",
        "icon": "ability_77.png",
        "compendium_id": 353,
        "rarity": 9,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": [
            "Gain Trace of Crimson Rain (950146) at the start of the turn if Aldore King Rain is alive",
            "Increase DEF, SPR and MP by 10%"
        ],
        "effects_raw": [[0, 3, 10002, [100023205,  3,  950146,  0]], [0, 3, 1, [0,  10,  0,  10,  0,  10,  0]]],
        "requirements": null,
        "unit_restriction": null
    },
    "800352": {
        "name": "Trace of Crimson Rain II",
        "icon": "ability_77.png",
        "compendium_id": 353,
        "rarity": 9,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": [
            "Gain Trace of Crimson Rain (950146) at the start of the turn if Aldore King Rain is alive",
            "Increase DEF, SPR and MP by 20%",
            "Replace LB with Extreme Nova+ (950000012):\\n\\tPhysical damage (22.1x, ATK) to all enemies"
        ],
        "effects_raw": [[0, 3, 10002, [100023205,  3,  950146,  0]], [0, 3, 1, [0,  20,  0,  20,  0,  20,  0]], [0, 3, 72, [950000012]]],
        "requirements": null,
        "unit_restriction": null
    },
    "230020": {
        "name": "YoRHa No. 2 Type B",
        "icon": "ability_76.png",
        "compendium_id": 5057,
        "rarity": 9,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": [
            "Increase ATK and DEF by 30%",
            "Increase equipment ATK by 100% when armed with a single weapon",
            "Increase Accuracy by 25% when armed with a single weapon",
            "Recover MP (7%) per turn",
            "Replace LB with Ho229 Type-B (900000320):\\n\\tPhysical damage (11.1x * 2 = 22.2x, ATK) to all enemies (ignore cover)\\n\\tReduce ATK, DEF, MAG and SPR by 74% for 3 turns to all enemies\\n\\tReduce damage taken from physical attacks taken by 20% to caster for 5 turns"
        ],
        "effects_raw": [[0, 3, 1, [30,  30,  0,  0,  0,  0,  0]], [0, 3, 13, [100,  25,  2]], [0, 3, 32, [7]], [0, 3, 72, [900000320]]],
        "requirements": [["EQUIP", 304001900], ["EQUIP", 504230010]],
        "unit_restriction": null
    },
    "914071": {
        "name": "YoRHa No. 2 Type B",
        "icon": "ability_76.png",
        "compendium_id": 5057,
        "rarity": 9,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": [
            "Increase ATK and DEF by 50%",
            "Increase equipment ATK by 100% when armed with a single weapon",
            "Increase Accuracy by 25% when armed with a single weapon",
            "Recover MP (10%) per turn",
            "Increase LB damage by 30%",
            "Replace LB with Ho229 Type-B (900000320):\\n\\tPhysical damage (11.1x * 2 = 22.2x, ATK) to all enemies (ignore cover)\\n\\tReduce ATK, DEF, MAG and SPR by 74% for 3 turns to all enemies\\n\\tReduce damage taken from physical attacks taken by 20% to caster for 5 turns"
        ],
        "effects_raw": [[0, 3, 1, [50,  50,  0,  0,  0,  0,  0]], [0, 3, 13, [100,  25,  2]], [0, 3, 32, [10]], [0, 3, 68, [30]], [0, 3, 72, [900000320]]],
        "requirements": [["EQUIP", 304001900], ["EQUIP", 504230010]],
        "unit_restriction": null
    },
    "914072": {
        "name": "YoRHa No. 2 Type B",
        "icon": "ability_76.png",
        "compendium_id": 5057,
        "rarity": 9,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": [
            "Increase ATK and DEF by 50%",
            "Increase equipment ATK by 100% when armed with a single weapon",
            "Increase Accuracy by 25% when armed with a single weapon",
            "Recover MP (10%) per turn",
            "Increase LB damage by 100%",
            "Replace LB with Ho229 Type-B (950000023):\\n\\tPhysical damage (15.2x * 2 = 30.4x, ATK) to all enemies (ignore cover)\\n\\tReduce ATK, DEF, MAG and SPR by 74% for 3 turns to all enemies\\n\\tReduce damage taken from physical attacks taken by 20% to caster for 5 turns"
        ],
        "effects_raw": [[0, 3, 1, [50,  50,  0,  0,  0,  0,  0]], [0, 3, 13, [100,  25,  2]], [0, 3, 32, [10]], [0, 3, 68, [100]], [0, 3, 72, [950000023]]],
        "requirements": [["EQUIP", 304001900], ["EQUIP", 504230010]],
        "unit_restriction": null
    },
    "230650": {
        "name": "Traveler's Progression",
        "icon": "ability_72.png",
        "compendium_id": 5529,
        "rarity": 8,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": [
            "Increase LB gauge by 2 per turn",
            "Increase equipment ATK by 50% when armed with two weapons"
        ],
        "effects_raw": [[0, 3, 33, [200]], [0, 3, 69, [1,  50,  0]]],
        "requirements": null,
        "unit_restriction": null
    },
    "231562": {
        "name": "Twin Swords Mastery",
        "icon": "ability_72.png",
        "compendium_id": 6189,
        "rarity": 9,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": [
            "Increase ATK by 50% when equipped with a Sword",
            "Increase equipment ATK by 100% when armed with two weapons"
        ],
        "effects_raw": [[0, 3, 6, [2,  50,  0,  0,  0,  0,  0,  0]], [0, 3, 69, [1,  100,  0]]],
        "requirements": null,
        "unit_restriction": null
    },
    "911268": {
        "name": "Aloha Spirit",
        "icon": "ability_77.png",
        "compendium_id": 85102,
        "rarity": 7,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": [
            "Increase equipment ATK by 25% when armed with two weapons",
            "25% chance of evading physical attacks"
        ],
        "effects_raw": [[0, 3, 69, [1,  25]], [0, 3, 22, [25]]],
        "requirements": null,
        "unit_restriction": null
    },
    "912847": {
        "name": "Big Kahuna",
        "icon": "ability_72.png",
        "compendium_id": 86417,
        "rarity": 9,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": ["Increase equipment ATK by 25% when armed with two weapons"],
        "effects_raw": [[0, 3, 69, [1,  25]]],
        "requirements": null,
        "unit_restriction": [401005305, 100011705, 401000305, 401000704, 100000202]
    },
    "702240": {
        "name": "Hero of Legend",
        "icon": "ability_77.png",
        "compendium_id": 396,
        "rarity": 8,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": [
            "Increase ATK by 70% and DEF and SPR by 35% when equipped with a Sword",
            "Increase equipment ATK (100%) and DEF and SPR (50%) when armed with a single one-handed weapon"
        ],
        "effects_raw": [[0, 3, 6, [2,  70,  35,  0,  35]], [1, 3, 10003, [0,  0,  100,  0,  50,  50]]],
        "requirements": null,
        "unit_restriction": null
    },
    "236037": {
        "name": "Entrusted Broadsword",
        "icon": "ability_76.png",
        "compendium_id": 9738,
        "rarity": 8,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": [
            "Increase ATK, SPR and MP by 20%",
            "Increase equipment ATK by 100% when armed with a single weapon",
            "Increase Accuracy by 25% when armed with a single weapon"
        ],
        "effects_raw": [[0, 3, 1, [20,  0,  0,  20,  0,  20,  0]], [0, 3, 13, [100,  25,  2]]],
        "requirements": null,
        "unit_restriction": null
    },
    "101360": {
        "name": "Doublehand",
        "icon": "ability_76.png",
        "compendium_id": 55,
        "rarity": 8,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": [
            "Increase equipment ATK by 50% when armed with a single one-handed weapon",
            "Increase Accuracy by 25% when armed with a single one-handed weapon"
        ],
        "effects_raw": [[1, 3, 13, [50,  25,  0]]],
        "requirements": null,
        "unit_restriction": null
    },
    "911627": {
        "name": "Fencer's Poise",
        "icon": "ability_76.png",
        "compendium_id": 85425,
        "rarity": 9,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": [
            "Increase equipment ATK by 50% when armed with a single weapon",
            "Increase Accuracy by 25% when armed with a single weapon",
            "Increase equipment MAG by 50% when armed with a single weapon"
        ],
        "effects_raw": [[0, 3, 13, [50,  25,  2]], [0, 3, 70, [50,  0,  2]]],
        "requirements": null,
        "unit_restriction": null
    },
    "228512": {
        "name": "Mother of Hess",
        "icon": "ability_77.png",
        "compendium_id": 3964,
        "rarity": 8,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": [
            "Increase MP by 30%",
            "Increase resistance to Wind, Earth and Dark by 30%",
            "Increase LB gauge by 2 per turn"
        ],
        "effects_raw": [[0, 3, 1, [0,  0,  0,  0,  0,  30,  0]], [0, 3, 3, [0,  0,  0,  0,  30,  30,  0,  30]], [0, 3, 33, [200]]],
        "requirements": null,
        "unit_restriction": null
    },
    "226886": {
        "name": "Memories of the Wind",
        "icon": "ability_9.png",
        "compendium_id": 2885,
        "rarity": 6,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": ["Increase resistance to Fire, Water, Wind and Earth by 30%"],
        "effects_raw": [[0, 3, 3, [30,  0,  0,  30,  30,  30,  0,  0]]],
        "requirements": null,
        "unit_restriction": null
    },
    "227937": {
        "name": "Nyx's Kukri",
        "icon": "ability_9.png",
        "compendium_id": 3589,
        "rarity": 9,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": ["Increase resistance to all elements by 20%"],
        "effects_raw": [[0, 3, 3, [20,  20,  20,  20,  20,  20,  20,  20]]],
        "requirements": null,
        "unit_restriction": null
    },
    "232511": {
        "name": "Exceptional Ingenuity",
        "icon": "ability_91.png",
        "compendium_id": 6894,
        "rarity": 9,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": [
            "Increase MP by 30%",
            "Increase resistance to Paralyze and Confusion by 100%",
            "Increase LB gauge by 3 per turn",
            "Increase resistance to all elements by 30%"
        ],
        "effects_raw": [[0, 3, 1, [0,  0,  0,  0,  0,  30,  0]], [0, 3, 2, [0,  0,  0,  0,  100,  100,  0,  0]], [0, 3, 33, [300]], [0, 3, 3, [30,  30,  30,  30,  30,  30,  30,  30]]],
        "requirements": null,
        "unit_restriction": null
    },
    "911899": {
        "name": "Well-Fed",
        "icon": "ability_77.png",
        "compendium_id": 85665,
        "rarity": 9,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": [
            "Recover MP (5%) per turn",
            "Increase LB gauge by 2 per turn",
            "Increase resistance to all status effects by 100%"
        ],
        "effects_raw": [[0, 3, 32, [5]], [0, 3, 33, [200]], [0, 3, 2, [100,  100,  100,  100,  100,  100,  100,  100]]],
        "requirements": null,
        "unit_restriction": null
    },
    "100160": {
        "name": "SPR +10%",
        "icon": "ability_77.png",
        "compendium_id": 13,
        "rarity": 1,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": ["Increase SPR by 10%"],
        "effects_raw": [[1, 3, 1, [0,  0,  0,  10,  0,  0,  0]]],
        "requirements": null,
        "unit_restriction": null
    },
    "228182": {
        "name": "Null Death",
        "icon": "ability_1.png",
        "compendium_id": 3740,
        "rarity": 8,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": ["No effect"],
        "effects_raw": [[0, 3, 2, [0,  0,  0,  0,  0,  0,  0,  0]]],
        "requirements": null,
        "unit_restriction": null
    },
    "213190": {
        "name": "Dragon's Wisdom",
        "icon": "ability_79.png",
        "compendium_id": 1378,
        "rarity": 4,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": [
            "Increase physical damage against Beasts by 15%",
            "Increase physical damage against Dragons by 15%"
        ],
        "effects_raw": [[1, 3, 11, [1,  15,  0]], [1, 3, 11, [7,  15,  0]]],
        "requirements": null,
        "unit_restriction": null
    },
    "230563": {
        "name": "Overcoming Death",
        "icon": "ability_79.png",
        "compendium_id": 5450,
        "rarity": 9,
        "unique": false,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": [
            "Increase MAG by 60%",
            "Increase magic damage against Humans by 50%",
            "Increase magic damage against Insects by 50%",
            "Increase magic damage against Plants by 50%"
        ],
        "effects_raw": [[0, 3, 1, [0,  0,  60,  0,  0,  0,  0]], [0, 3, 11, [5,  0,  50]], [0, 3, 11, [9,  0,  50]], [0, 3, 11, [11,  0,  50]]],
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
    "232639": {
        "name": "Mystic Cross",
        "icon": "ability_25.png",
        "compendium_id": 6994,
        "rarity": 8,
        "cost": {"MP": 70},
        "attack_count": [7, 1],
        "attack_damage": [[14,  14,  14,  14,  14,  14,  16], [100]],
        "attack_frames": [[42,  62,  82,  102,  122,  142,  162], [182]],
        "effect_frames": [[76,  40,  40]],
        "move_type": 4,
        "motion_type": 2,
        "effect_type": "Default",
        "attack_type": "Magic",
        "element_inflict": ["Wind"],
        "effects": [
            "Magic wind damage (4x, MAG) to all enemies",
            "Magic wind damage (12x, MAG) with consecutive damage increase (max. 6 times, +5x MAG each, 42x total) to all enemies"
        ],
        "effects_raw": [[2, 1, 15, [0,  0,  0,  0,  0,  400,  0]], [2, 1, 72, [0,  0,  700,  500,  500,  7]]],
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
    },
    "512170": {
        "name": "True Fire Achilles",
        "icon": "ability_39.png",
        "compendium_id": 10982,
        "rarity": 8,
        "cost": {"MP": 66},
        "attack_count": [1],
        "attack_damage": [[100]],
        "attack_frames": [[40]],
        "effect_frames": [[6,  6,  6,  6,  6]],
        "move_type": 4,
        "motion_type": 2,
        "effect_type": "Default",
        "attack_type": "Physical",
        "element_inflict": null,
        "effects": [
            "Reduce resistance to Fire by 130% for 3 turns to one enemy",
            "Physical damage (22x, ATK) to one enemy",
            "Gain True Fire Achilles (512170) for 2 turns"
        ],
        "effects_raw": [[1, 1, 33, [-130,  0,  0,  0,  0,  0,  0,  0,  1,  3]], [1, 1, 1, [0,  0,  0,  0,  0,  0,  2200,  0]], [0, 3, 100, [2,  512170,  99999,  3,  1,  5]]],
        "requirements": null,
        "unit_restriction": null
    },
   "512175": {
        "name": "Jade Parry",
        "icon": "ability_105.png",
        "compendium_id": 9043,
        "rarity": 9,
        "cost": {"MP": 120},
        "attack_count": [0],
        "attack_damage": [[]],
        "attack_frames": [[]],
        "effect_frames": [[40,  40]],
        "move_type": 4,
        "motion_type": 2,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": [
            "Dodge 1 physical attacks for one turn to all allies",
            "Use Jade Parry (512176) next turn on all allies",
            "Use Jade Parry (512176) after a 2 turn delay on all allies",
            "Use Jade Parry (512176) after a 3 turn delay on all allies"
        ],
        "effects_raw": [[2, 2, 54, [1,  1,  0]], [2, 2, 132, [512176,  1,  1,  100,  0,  2]], [2, 2, 132, [512176,  1,  2,  100,  0,  3]], [2, 2, 132, [512176,  1,  3,  100,  0,  4]]],
        "requirements": null,
        "unit_restriction": null
    },
    "512176": {
        "name": "Jade Parry",
        "icon": "ability_97.png",
        "compendium_id": 9043,
        "rarity": 9,
        "cost": {},
        "attack_count": [0],
        "attack_damage": [[]],
        "attack_frames": [[]],
        "effect_frames": [[0,  0]],
        "move_type": 4,
        "motion_type": 2,
        "effect_type": "Default",
        "attack_type": "None",
        "element_inflict": null,
        "effects": ["Dodge 1 physical attacks for one turn to all allies"],
        "effects_raw": [[2, 2, 54, [1,  1,  0]]],
        "requirements": null,
        "unit_restriction": null
    },
    "912221": {
        "name": "Tempest Spellblade",
        "icon": "ability_9.png",
        "compendium_id": 3373,
        "rarity": 8,
        "cost": {"MP": 90},
        "attack_count": [30],
        "attack_damage": [[3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4]],
        "attack_frames": [[42,  46,  50,  54,  58,  62,  66,  70,  74,  78,  82,  86,  90,  94,  98,  102,  106,  110,  114,  118,  122,  126,  130,  134,  138,  142,  146,  150,  154,  158]],
        "effect_frames": [[40,  40,  40]],
        "move_type": 4,
        "motion_type": 2,
        "effect_type": "Default",
        "attack_type": "Hybrid",
        "element_inflict": [
            "Lightning",
            "Wind"
        ],
        "effects": ["Hybrid lightning and wind damage (13x, ATK & MAG) to all enemies"],
        "effects_raw": [[2, 1, 40, [0,  0,  0,  0,  0,  0,  0,  0,  1300,  1300]]],
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
    "912791": {
        "name": "Vixen's Fire - Seventh Tail",
        "icon": "global_ability_10014.png",
        "compendium_id": 86361,
        "rarity": 9,
        "cost": {},
        "attack_count": [1, 9],
        "attack_damage": [[100], [1,  1,  1,  1,  1,  1,  1,  1,  92]],
        "attack_frames": [[0], [42,  48,  54,  60,  66,  72,  78,  84,  90]],
        "effect_frames": [[0,  0,  0,  0], [42,  48,  54,  60,  66,  72,  78,  84,  90]],
        "move_type": 4,
        "motion_type": 2,
        "effect_type": "Default",
        "attack_type": "Magic",
        "element_inflict": null,
        "effects": [
            "Increase MAG by 280% for one turn to caster (can not be removed)",
            "Magic damage (17x * 2 = 34x, MAG) to all enemies (ignore reflect)",
            "Use Vixen's Fire - Eighth Tail (912792) next turn on caster"
        ],
        "effects_raw": [[0, 3, 3, [0,  0,  280,  0,  1,  1,  1]], [2, 1, 70, [0,  0,  1700,  50]], [0, 3, 132, [912792,  1,  1,  100,  1,  912785]]],
        "requirements": null,
        "unit_restriction": null
    },
    "912792": {
        "name": "Vixen's Fire - Eighth Tail",
        "icon": "global_ability_10014.png",
        "compendium_id": 86362,
        "rarity": 9,
        "cost": {},
        "attack_count": [1, 9],
        "attack_damage": [[100], [1,  1,  1,  1,  1,  1,  1,  1,  92]],
        "attack_frames": [[0], [42,  48,  54,  60,  66,  72,  78,  84,  90]],
        "effect_frames": [[0,  0,  0,  0], [42,  48,  54,  60,  66,  72,  78,  84,  90]],
        "move_type": 4,
        "motion_type": 2,
        "effect_type": "Default",
        "attack_type": "Magic",
        "element_inflict": null,
        "effects": [
            "Increase MAG by 290% for one turn to caster (can not be removed)",
            "Magic damage (18x * 2 = 36x, MAG) to all enemies (ignore reflect)",
            "Use Vixen's Fire - Ninth Tail (912793) next turn on caster"
        ],
        "effects_raw": [[0, 3, 3, [0,  0,  290,  0,  1,  1,  1]], [2, 1, 70, [0,  0,  1800,  50]], [0, 3, 132, [912793,  1,  1,  100,  1,  912785]]],
        "requirements": null,
        "unit_restriction": null
    },
    "912793": {
        "name": "Vixen's Fire - Ninth Tail",
        "icon": "global_ability_10014.png",
        "compendium_id": 86363,
        "rarity": 9,
        "cost": {},
        "attack_count": [1, 9],
        "attack_damage": [[100], [1,  1,  1,  1,  1,  1,  1,  1,  92]],
        "attack_frames": [[0], [42,  48,  54,  60,  66,  72,  78,  84,  90]],
        "effect_frames": [[0,  0,  0,  0], [42,  48,  54,  60,  66,  72,  78,  84,  90]],
        "move_type": 4,
        "motion_type": 2,
        "effect_type": "Default",
        "attack_type": "Magic",
        "element_inflict": null,
        "effects": [
            "Increase MAG by 300% for 3 turns to caster (can not be removed)",
            "Magic damage (20x * 2 = 40x, MAG) to all enemies (ignore reflect)"
        ],
        "effects_raw": [[0, 3, 3, [0,  0,  300,  0,  3,  1,  1]], [2, 1, 70, [0,  0,  2000,  50]]],
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
    ],
    "40140": [
        "Seed Cannon",
        "種子大砲",
        "씨앗 대포",
        "Graine-obus",
        "Kernspucken",
        "Cañón de semillas"
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
    "510754": [
        "Saviour of Erdrea",
        "羅德賽塔西亞的救世主",
        "로토제타시아의 구세주",
        "Sauveur d'Elréa",
        "Retter von Erdria",
        "Salvador de Erdrea"
    ],
    "512170": [
        "True Fire Achilles",
        "真·火之要害",
        "진·불의 아킬레스",
        "Point faible + : Feu",
        "Wahrer Feuer-Achilles",
        "Aquiles de fuego verdadero",
        "Achilles Api Sejati"
    ],
    "512175": [
        "Jade Parry",
        "翡翠格擋",
        "제이다이트 페리",
        "Parade de jade",
        "Jade-Parade",
        "Parada de jaspe"
    ],
    "512176": [
        "Jade Parry",
        "翡翠格擋",
        "제이다이트 페리",
        "Parade de jade",
        "Jade-Parade",
        "Parada de jaspe"
    ],
    "912221": [
        "Tempest Spellblade",
        "風雷魔劍舞",
        "풍뢰의 마검무",
        "Magilame des tempêtes",
        "Sturmschwertmagie",
        "Esgrimago tempestuoso"
    ],
    "912380": [
        "Triple Whip",
        "T鞭打",
        "T채찍",
        "Fouet triple",
        "Dreifachpeitsche",
        "Látigo triple"
    ],
    "912791": [
        "Vixen's Fire - Seventh Tail",
        "狐火 - 七尾",
        "여우불·칠미",
        "Renard de feu - Septième queue",
        "Fähenfeuer - Siebter Schweif",
        "Fuego vulpino - Séptima cola"
    ],
    "912792": [
        "Vixen's Fire - Eighth Tail",
        "狐火 - 八尾",
        "여우불·팔미",
        "Renard de feu - Huitième queue",
        "Fähenfeuer - Achter Schweif",
        "Fuego vulpino - Octava cola"
    ],
    "912793": [
        "Vixen's Fire - Ninth Tail",
        "狐火 - 九尾",
        "여우불·구미",
        "Renard de feu - Dernière queue",
        "Fähenfeuer - Letzter Schweif",
        "Fuego vulpino - Novena cola"
    ],
    "912882": [
        "Siphon Lance",
        "攝魔長槍",
        "흡수의 창",
        "Lance siphon",
        "Soglanze",
        "Lanza sifón"
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
    ],
    "40140": [
        "Damage one enemy",
        "攻擊1名敵人",
        "적 1명에게 피해",
        "Inflige des dégâts à un ennemi",
        "Fügt einem Gegner Schaden zu.",
        "Daña a un enemigo"
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
    "509624": [
        "Deal partial unmitigated damage to one enemy three times",
        "對1名敵人發動3次發動無視部分防禦的攻擊",
        "적 1명에게 3회 일부 방어 무시 피해",
        "Inflige des dégâts en partie fixes à un ennemi à 3 reprises",
        "Fügt einem Gegner dreimal teilweise direkten Schaden zu.",
        "Daño que ignora parcialmente la DEF de un enemigo 3 veces"
    ],
    "510754": [
        "Enable threepeat performance for one turn at the beginning of battle or after being revived, and gradually boost damage of certain abilities after two turns",
        "戰鬥開始時和從無法戰鬥狀態中復活的1回合內可使用「3回行動」+2回合後持續提高特定能力的傷害",
        "전투 시작 시 및 전투불능 상태에서 회복했을 때 1턴 동안 '3회 행동' 사용 가능+2턴 후 특정 어빌리티의 피해량 서서히 상승",
        "Permet d'utiliser Performance triple pendant un tour au début du combat ou après avoir été ranimé, et augmente progressivement les dégâts de certaines aptitudes après 2 tours",
        "Ermöglicht bei Kampfbeginn oder nach Wiederbelebung Dreifachvorstellung für eine Runde und erhöht nach zwei Runden allmählich den Schaden bestimmter Fertigkeiten.",
        "Aprende Ración triple durante un turno al inicio del combate o tras ser revivido, y aumenta poco a poco el daño de determinadas habilidades tras 2 turnos"
    ],
    "512170": [
        "Reduce fire resistance and damage one enemy, and enable true fire achilles for two turns",
        "降低1名敵人的火屬性耐性+發動攻擊+2回合內可使用「真·火之要害」",
        "적 1명의 불속성 저항력 감소+피해+2턴 동안 '진·불의 아킬레스' 사용 가능",
        "Réduit la résistance au feu d'un ennemi et lui inflige des dégâts, et permet d'utiliser Point faible + : Feu pendant 2 tours",
        "Verringert die Feuerresistenz eines Gegners, fügt ihm Schaden zu und ermöglicht 2 Runden lang Wahrer Feuer-Achilles.",
        "Reduce la resistencia al fuego, daña a un enemigo y aprende Aquiles de fuego verdadero durante 2 turnos",
        "Mengurangi resistansi api dan memberikan damage pada satu musuh, serta memungkinkan penggunaan Achilles Api Sejati selama 2 giliran"
    ],
    "512175": [
        "(One use every 4 turns) Enable all allies to evade some physical attacks one time, and then recast for three consecutive turns",
        "【每4回合可使用1次】賦予全體隊員閃避1次部分物理攻擊的效果+3回合內連續發動",
        "[4턴에 1회 사용 가능] 아군 전체에 일부 물리 공격 1회 회피 효과 부여+3턴 연속 재사용",
        "(Une fois tous les 4 tours) Permet à tous les alliés d'esquiver une fois certaines attaques physiques, puis relance l'aptitude pendant les 3 tours suivants",
        "(Einmal in 4 Runden) Ermöglicht es allen Verbündeten, einigen physischen Angriffen einmal auszuweichen, und wiederholt diesen Effekt in den nächsten drei Runden.",
        "(Un uso cada 4 turnos) Todos los aliados pueden evadir algunos ataques físicos una vez, y el efecto se vuelve a aplicar durante 3 turnos consecutivos"
    ],
    "512176": [
        "(One use every 4 turns) Enable all allies to evade some physical attacks one time, and then recast for three consecutive turns",
        "【每4回合可使用1次】賦予全體隊員閃避1次部分物理攻擊的效果+3回合內連續發動",
        "[4턴에 1회 사용 가능] 아군 전체에 일부 물리 공격 1회 회피 효과 부여+3턴 연속 재사용",
        "(Une fois tous les 4 tours) Permet à tous les alliés d'esquiver une fois certaines attaques physiques, puis relance l'aptitude pendant les 3 tours suivants",
        "(Einmal in 4 Runden) Ermöglicht es allen Verbündeten, einigen physischen Angriffen einmal auszuweichen, und wiederholt diesen Effekt in den nächsten drei Runden.",
        "(Un uso cada 4 turnos) Todos los aliados pueden evadir algunos ataques físicos una vez, y el efecto se vuelve a aplicar durante 3 turnos consecutivos"
    ],
    "912221": [
        "Deal lightning and wind damage to all enemies",
        "對全體敵人發動雷風屬性攻擊",
        "적 전체에 번개와 바람속성 피해",
        "Inflige des dégâts de foudre et de vent à tous les ennemis",
        "Fügt allen Gegnern Blitz- und Windschaden zu.",
        "Daño de rayo y viento a todos los enemigos"
    ],
    "912380": [
        "Enable specific abilities to be used three times in one turn (Activate one time each regardless of equipment conditions)",
        "1回合內可以使用3次特定能力（無視裝備狀態，只會各發動1次）",
        "1턴 동안 특정 어빌리티 3회 사용 가능(장비 상태와 관계 없이 1회씩 발동)",
        "Permet d'utiliser des aptitudes spécifiques trois fois en un tour (s'active une seule fois, quel que soit l'équipement)",
        "Ermöglicht gewissen Fertigkeiten dreimalige Anwendung in einer Runde (Aktiviere je ein Mal, unabhängig von Ausrüstungssituation).",
        "Aprende determinadas habilidades que se pueden usar 3 veces en un mismo turno (se activa una vez cada una sin importar las condiciones del equipo)"
    ],
    "912791": [
        "Boost MAG for caster, deal partial unmitigated magic damage to all enemies, enable consecrated rites, and cast vixen's fire - eighth tail next turn",
        "提高自身的魔力+對全體敵人發動無視部分魔法防禦的攻擊+可使用「奉獻的祭式」+下一回合發動「狐火 - 八尾」",
        "자신의 마력 상승+적 전체에 일부 마법 방어 무시 피해+'봉헌의 제식' 사용 가능+다음 턴에 '여우불·팔미' 효과 부여",
        "Augmente la MAGIE du lanceur, inflige des dégâts magiques en partie fixes à tous les ennemis, permet d'utiliser Rites consacrés, et lance Renard de feu - Huitième queue au tour suivant",
        "Erhöht MAG des Benutzers, fügt allen Gegnern teilweise direkten mag. Schaden zu, ermöglicht Geweihter Ritus und zaubert Fähenfeuer - Achter Schweif in der nächsten Runde.",
        "Aumenta la MAG del usuario, inflige daño mágico que ignora parcialmente la DEF de todos los enemigos, aprende Ritos consagrados y lanza Fuego vulpino - Octava cola al turno siguiente"
    ],
    "912792": [
        "Boost MAG for caster, deal partial unmitigated magic damage to all enemies, enable consecrated rites, and cast vixen's fire - ninth tail next turn",
        "提高自身的魔力+對全體敵人發動無視部分魔法防禦的攻擊+可使用「奉獻的祭式」+下一回合發動「狐火 - 九尾」",
        "자신의 마력 상승+적 전체에 일부 마법 방어 무시 피해+'봉헌의 제식' 사용 가능+다음 턴에 '여우불·구미' 효과 부여",
        "Augmente la MAGIE du lanceur, inflige des dégâts magiques en partie fixes à tous les ennemis, permet d'utiliser Rites consacrés, et lance Renard de feu - Dernière queue au tour suivant",
        "Erhöht MAG des Benutzers, fügt allen Gegnern teilweise direkten mag. Schaden zu, ermöglicht Geweihter Ritus und zaubert Fähenfeuer - Letzter Schweif in der nächsten Runde.",
        "Aumenta la MAG del usuario, inflige daño mágico que ignora parcialmente la DEF de todos los enemigos, aprende Ritos consagrados y lanza Fuego vulpino - Novena cola al turno siguiente"
    ],
    "912793": [
        "Boost MAG for caster, deal partial unmitigated magic damage to all enemies, and enable consecrated rites",
        "提高自身的魔力+對全體敵人發動無視部分魔法防禦的攻擊+可使用「奉獻的祭式」",
        "자신의 마력 상승+적 전체에 일부 마법 방어 무시 피해+'봉헌의 제식' 사용 가능",
        "Augmente la MAGIE du lanceur, inflige des dégâts magiques en partie fixes à tous les ennemis, et permet d'utiliser Rites consacrés",
        "Erhöht MAG des Benutzers, fügt allen Gegnern teilweise direkten mag. Schaden zu und ermöglicht Geweihter Ritus.",
        "Aumenta la MAG del usuario, inflige daño mágico que ignora parcialmente la DEF de todos los enemigos y aprende Ritos consagrados"
    ],
    "912882": [
        "Damage and drain HP from one enemy and restore own MP",
        "攻擊1名敵人+吸收HP+恢復自身的MP",
        "적 1명에게 피해+HP 흡수+자신의 MP 회복",
        "Inflige des dégâts et aspire les PV d'un ennemi et restaure les PM du lanceur",
        "Fügt einem Gegner Schaden zu, stiehlt dessen LP und regeneriert MP des Benutzers.",
        "Daña a un enemigo, absorbe su VIT, y recupera PM propios"
    ]
  }`;

describe('Skill', () => {
  it('should not consider effect as damaging for HP percent damages to caster', () => {
    // GIVEN
    const skill: Skill = new Skill();
    skill.active = true;
    const effect = JSON.parse('[0, 3, 9, [90, 90, 100]]');
    // WHEN
    const result = skill.isEffectWithDamage(effect);
    // THEN
    expect(result).toBe(false);
  });

  it('should consider effect as damaging for HP percent damages to enemies', () => {
    // GIVEN
    const skill: Skill = new Skill();
    skill.active = true;
    const effect = JSON.parse('[2, 1, 9, [90, 90, 100]]');
    // WHEN
    const result = skill.isEffectWithDamage(effect);
    // THEN
    expect(result).toBe(true);
  });

  it('should not consider effect as damaging for fixed damages to caster', () => {
    // GIVEN
    const skill: Skill = new Skill();
    skill.active = true;
    const effect = JSON.parse('[0, 3, 41, [300, 0]]');
    // WHEN
    const result = skill.isEffectWithDamage(effect);
    // THEN
    expect(result).toBe(false);
  });

  it('should consider effect as damaging for fixed damages to enemies', () => {
    // GIVEN
    const skill: Skill = new Skill();
    skill.active = true;
    const effect = JSON.parse('[2, 1, 41, [300, 0]]');
    // WHEN
    const result = skill.isEffectWithDamage(effect);
    // THEN
    expect(result).toBe(true);
  });

  it('should calculate total power for multiple damaging effects', () => {
    // GIVEN
    const skill: Skill = Skill.produce(JSON.parse(`{
      "name": "Fake Skill",
      "active": true,
      "attack_type": "Physical",
      "effects_raw": [[1, 1, 21, [0,  0,  25,  -50]], [1, 1, 25, [20,  80,  100]], [2, 1, 1, [0,  0,  0,  0,  0,  0,  1000,  0]]]
    }`));
    // WHEN
    const result = skill.calculateSkillPower();
    // THEN
    expect(result).toBe(1130);
  });

  it('should calculate total power for multiple non-damaging effects', () => {
    // GIVEN
    const skill: Skill = Skill.produce(JSON.parse(`{
      "name": "Fake Skill",
      "active": true,
      "attack_type": "Physical",
      "effects_raw": [[0, 3, 100, [2,  512170,  99999,  3,  1,  5]], [0, 3, 132, [510756,  0,  5,  100,  0,  510756]], [0, 3, 111, [1,  1,  1,  1,  0,  0]]]
    }`));
    // WHEN
    const result = skill.calculateSkillPower();
    // THEN
    expect(result).toBeNull();
  });

  it('should compute passive increases to Caracteristiques correctly', () => {
    // GIVEN
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);

    const plainSkill: Skill = skills['707786'];
    plainSkill.gumi_id = 707786;
    const skill = Skill.produce(plainSkill);

    // WHEN
    const carac = skill.calculateBaseIncreasesPercent();

    // THEN
    expect(carac).toEqual(new Caracteristiques(20, 20, 0, 20, 0, 20));
  });

  it('should classify skills without equipment requirements correctly', () => {
    // GIVEN
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);

    const plainSkill: Skill = skills['707785'];
    plainSkill.gumi_id = 707785;
    const skill = Skill.produce(plainSkill);

    // WHEN
    const isTrustAbility = skill.hasEquipmentRequirements();

    // THEN
    expect(isTrustAbility).toBeFalse();
  });

  it('should classify skills with equipment requirement correctly', () => {
    // GIVEN
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);

    const plainSkill: Skill = skills['230020'];
    plainSkill.gumi_id = 230020;
    const skill = Skill.produce(plainSkill);

    // WHEN
    const isTrustAbility = skill.hasEquipmentRequirements();

    // THEN
    expect(isTrustAbility).toBeTrue();
  });

  it('should compute passive increases to DualWield Caracteristiques correctly', () => {
    // GIVEN
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);

    const plainSkill: Skill = skills['227160'];
    plainSkill.gumi_id = 227160;
    const skill = Skill.produce(plainSkill);

    // WHEN
    const carac = skill.calculateDualwieldIncreasesPercent();

    // THEN
    expect(carac).toEqual(new Caracteristiques(0, 0, 50, 0, 0, 0));
  });

  it('should classify skills without unit restriction correctly', () => {
    // GIVEN
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);

    const plainSkill: Skill = skills['911268'];
    plainSkill.gumi_id = 911268;
    const skill = Skill.produce(plainSkill);

    // WHEN
    const hasUnitRestriction = skill.hasUnitRestriction();

    // THEN
    expect(hasUnitRestriction).toBeFalse();
  });

  it('should classify skills with unit restriction correctly', () => {
    // GIVEN
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);

    const plainSkill: Skill = skills['912847'];
    plainSkill.gumi_id = 912847;
    const skill = Skill.produce(plainSkill);

    // WHEN
    const hasUnitRestriction = skill.hasUnitRestriction();

    // THEN
    expect(hasUnitRestriction).toBeTrue();
  });

  it('should compute passive increases to DoubleHand Caracteristiques correctly', () => {
    // GIVEN
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);

    const plainSkill: Skill = skills['702240'];
    plainSkill.gumi_id = 702240;
    const skill = Skill.produce(plainSkill);

    // WHEN
    const carac = skill.calculateDoublehandIncreasesPercent();

    // THEN
    expect(carac).toEqual(new Caracteristiques(0, 0, 100, 50, 0, 50));
  });

  it('should compute passive increases to TrueDoubleHand Caracteristiques correctly', () => {
    // GIVEN
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);

    const plainSkill: Skill = skills['914072'];
    plainSkill.gumi_id = 914072;
    const skill = Skill.produce(plainSkill);

    // WHEN
    const carac = skill.calculateTrueDoubleHandIncreasesPercent();

    // THEN
    expect(carac).toEqual(new Caracteristiques(0, 0, 100, 0, 0, 0));
  });

  it('should compute total mod increase for physical damages with ignore def effect', () => {
    // GIVEN
    const fakeSkill: Skill = new Skill();
    fakeSkill.active = true;
    fakeSkill.attack_type = 'Physical';
    fakeSkill.effects_raw = JSON.parse('[[2, 1, 21, [0, 0, 1650, -50]]]');

    // WHEN
    const modIncrease = fakeSkill.calculateTotalModIncrease(150);

    // THEN
    expect(modIncrease).toEqual(300);
  });

  it('should compute total mod increase for magic damages with ignore spr effect', () => {
    // GIVEN
    const fakeSkill: Skill = new Skill();
    fakeSkill.active = true;
    fakeSkill.attack_type = 'Magic';
    fakeSkill.effects_raw = JSON.parse('[[2, 1, 70, [0, 0, 2500, 50]]]');

    // WHEN
    const modIncrease = fakeSkill.calculateTotalModIncrease(600);

    // THEN
    expect(modIncrease).toEqual(1200);
  });

  it('should compute total mod increase for death or physical damages effect', () => {
    // GIVEN
    const fakeSkill: Skill = new Skill();
    fakeSkill.active = true;
    fakeSkill.attack_type = 'Physical';
    fakeSkill.effects_raw = JSON.parse('[[1, 1, 112, [180, 50, 100]]]');

    // WHEN
    const modIncrease = fakeSkill.calculateTotalModIncrease(200);

    // THEN
    expect(modIncrease).toEqual(200);
  });

  it('should compute total mod increase for death or physical damages effect with ignore DEF', () => {
    // GIVEN
    const fakeSkill: Skill = new Skill();
    fakeSkill.active = true;
    fakeSkill.attack_type = 'Physical';
    fakeSkill.effects_raw = JSON.parse('[[1, 1, 112, [180, 50, 100, -50]]]');

    // WHEN
    const modIncrease = fakeSkill.calculateTotalModIncrease(200);

    // THEN
    expect(modIncrease).toEqual(400);
  });

  it('should compute total mod increase for death or magical damages effect', () => {
    // GIVEN
    const fakeSkill: Skill = new Skill();
    fakeSkill.active = true;
    fakeSkill.attack_type = 'Magic';
    fakeSkill.effects_raw = JSON.parse('[[2, 1, 113, [1500, 90, 100]]]');

    // WHEN
    const modIncrease = fakeSkill.calculateTotalModIncrease(200);

    // THEN
    expect(modIncrease).toEqual(200);
  });

  it('should compute total mod increase for death or magical damages effect with ignore SPR', () => {
    // GIVEN
    const fakeSkill: Skill = new Skill();
    fakeSkill.active = true;
    fakeSkill.attack_type = 'Magic';
    fakeSkill.effects_raw = JSON.parse('[[2, 1, 113, [1500, 90, 100, 50]]]');

    // WHEN
    const modIncrease = fakeSkill.calculateTotalModIncrease(200);

    // THEN
    expect(modIncrease).toEqual(400);
  });

  it('should compute passive increases to element resistances correctly', () => {
    // GIVEN
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);

    const plainSkill: Skill = skills['228512'];
    plainSkill.gumi_id = 228512;
    const skill = Skill.produce(plainSkill);

    // WHEN
    const carac = skill.calculateElementResistances();

    // THEN
    expect(carac).toEqual(new ResistancesElementaires(0, 0, 0, 0, 30, 30, 0, 30));
  });

  it('should compute passive increases ailment resistances correctly', () => {
    // GIVEN
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);

    const plainSkill: Skill = skills['232511'];
    plainSkill.gumi_id = 232511;
    const skill = Skill.produce(plainSkill);

    // WHEN
    const carac = skill.calculeAilmentResistances();

    // THEN
    expect(carac).toEqual(new ResistancesAlterations(0, 0, 0, 0, 100, 100, 0, 0));
  });

  it('should compute passive physical killers correctly', () => {
    // GIVEN
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);

    const plainSkill: Skill = skills['213190'];
    plainSkill.gumi_id = 213190;
    const skill = Skill.produce(plainSkill);

    // WHEN
    const killers = skill.calculatePhysicalKillers();

    // THEN
    expect(killers).toEqual(new Tueurs(15, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 0));
  });

  it('should compute passive magical killers correctly', () => {
    // GIVEN
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);

    const plainSkill: Skill = skills['230563'];
    plainSkill.gumi_id = 230563;
    const skill = Skill.produce(plainSkill);

    // WHEN
    const killers = skill.calculateMagicalKillers();

    // THEN
    expect(killers).toEqual(new Tueurs(0, 0, 0, 0, 50, 0, 0, 0, 50, 0, 50, 0));
  });
});

