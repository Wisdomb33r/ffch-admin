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
        "levels": 5,
        "min_level": {
            "cost": 8,
            "effects": ["Physical fire damage (1.8x, ATK) to one enemy"],
            "effects_raw": [[1, 1, 1, [0,  0,  0,  0,  0,  0,  180]]]},
        "max_level": {
            "cost": 8,
            "effects": ["Physical fire damage (2x, ATK) to one enemy"],
            "effects_raw": [[1, 1, 1, [0,  0,  0,  0,  0,  0,  200]]]},
        "strings": {
            "name": [
                "Flame Sword",
                "火焰劍",
                "불꽃검",
                "Pyrolame",
                "Flammenschwert",
                "Espada ígnea"
            ],
            "desc": [
                "Fire damage to one enemy",
                "對1名敵人發動火屬性攻擊",
                "적 1명에게 불속성 피해",
                "Dégâts de feu sur un ennemi",
                "Feuerschaden, ein Ziel",
                "Daño de fuego a un enemigo"
            ]
        }
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
        "levels": 10,
        "min_level": {
            "cost": 10,
            "effects": ["Physical fire damage (2x, ATK) to one enemy"],
            "effects_raw": [[1, 1, 1, [0,  0,  0,  0,  0,  0,  200]]]},
        "max_level": {
            "cost": 10,
            "effects": ["Physical fire damage (2.45x, ATK) to one enemy"],
            "effects_raw": [[1, 1, 1, [0,  0,  0,  0,  0,  0,  245]]]},
        "strings": {
            "name": [
                "Crimson Slash",
                "深紅斬擊",
                "진홍빛 참격",
                "Entaille pourpre",
                "Blutsense",
                "Corte carmesí"
            ],
            "desc": [
                "Fire damage to one enemy",
                "對1名敵人發動火屬性攻擊",
                "적 1명에게 불속성 피해",
                "Dégâts de feu sur un ennemi",
                "Feuerschaden, ein Ziel",
                "Daño de fuego a un enemigo"
            ]
        }
    }
  }`;
