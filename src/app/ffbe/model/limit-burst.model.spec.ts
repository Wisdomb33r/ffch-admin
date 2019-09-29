export const LIMIT_BURST_TEST_DATA =
  `{
    "100000102": {
        "name": "Flame Sword",
        "cost": 0,
        "attack_count": [2],
        "attack_damage": [[20,  80]],
        "attack_frames": [[3,  59]],
        "effect_frames": [[0]],
        "move_type": 1,
        "damage_type": "Physical",
        "element_inflict": ["Fire"],
        "min_level": ["Physical fire damage (1.8x, ATK) to one enemy"],
        "max_level": ["Physical fire damage (2x, ATK) to one enemy"],
        "levels": [
          [8, [[1, 1, 1, [0,  0,  0,  0,  0,  0,  180,  0]]]],
          [8, [[1, 1, 1, [0,  0,  0,  0,  0,  0,  185,  0]]]],
          [8, [[1, 1, 1, [0,  0,  0,  0,  0,  0,  190,  0]]]],
          [8, [[1, 1, 1, [0,  0,  0,  0,  0,  0,  195,  0]]]],
          [8, [[1, 1, 1, [0,  0,  0,  0,  0,  0,  200,  0]]]]
        ]
    },
    "100000103": {
        "name": "Crimson Slash",
        "cost": 0,
        "attack_count": [2],
        "attack_damage": [[20,  80]],
        "attack_frames": [[3,  59]],
        "effect_frames": [[0]],
        "move_type": 1,
        "damage_type": "Physical",
        "element_inflict": ["Fire"],
        "min_level": ["Physical fire damage (2x, ATK) to one enemy"],
        "max_level": ["Physical fire damage (2.45x, ATK) to one enemy"],
        "levels": [
          [10, [[1, 1, 1, [0,  0,  0,  0,  0,  0,  200,  0]]]],
          [10, [[1, 1, 1, [0,  0,  0,  0,  0,  0,  205,  0]]]],
          [10, [[1, 1, 1, [0,  0,  0,  0,  0,  0,  210,  0]]]],
          [10, [[1, 1, 1, [0,  0,  0,  0,  0,  0,  215,  0]]]],
          [10, [[1, 1, 1, [0,  0,  0,  0,  0,  0,  220,  0]]]],
          [10, [[1, 1, 1, [0,  0,  0,  0,  0,  0,  225,  0]]]],
          [10, [[1, 1, 1, [0,  0,  0,  0,  0,  0,  230,  0]]]],
          [10, [[1, 1, 1, [0,  0,  0,  0,  0,  0,  235,  0]]]],
          [10, [[1, 1, 1, [0,  0,  0,  0,  0,  0,  240,  0]]]],
          [10, [[1, 1, 1, [0,  0,  0,  0,  0,  0,  245,  0]]]]
        ]
    }
  }`;

export const LIMIT_BURST_NAMES_TEST_DATA =
  `{
    "100000102": [
        "Flame Sword",
        "火焰劍",
        "불꽃검",
        "Pyrolame",
        "Flammenschwert",
        "Espada ígnea"
    ],
    "100000103": [
        "Crimson Slash",
        "深紅斬擊",
        "진홍빛 참격",
        "Entaille pourpre",
        "Blutsense",
        "Corte carmesí"
    ]
  }`;

export const LIMIT_BURST_DESCRIPTIONS_TEST_DATA =
  `{
    "100000102": [
        "Deal fire damage to one enemy",
        "對1名敵人發動火屬性攻擊",
        "적 1명에게 불속성 피해",
        "Dégâts de feu sur un ennemi",
        "Feuerschaden, ein Ziel",
        "Daño de fuego a un enemigo"
    ],
    "100000103": [
        "Deal fire damage to one enemy",
        "對1名敵人發動火屬性攻擊",
        "적 1명에게 불속성 피해",
        "Dégâts de feu sur un ennemi",
        "Feuerschaden, ein Ziel",
        "Daño de fuego a un enemigo"
    ]
  }`;
