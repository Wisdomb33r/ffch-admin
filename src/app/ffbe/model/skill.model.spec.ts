export const SKILL_TEST_DATA =
  `{
    "10010": {
        "name": "Libra",
        "compendium_id": 1,
        "type": "MAGIC",
        "active": true,
        "usable_in_exploration": false,
        "rarity": 1,
        "magic_type": "White",
        "cost": {"MP": 1},
        "is_sealable": true,
        "is_reflectable": false,
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
        "requirements": null,
        "icon": "ability_2.png",
        "strings": {
            "name": [
                "Libra",
                "窺伺探測",
                "라이브라",
                "Acuité",
                "Analyse",
                "Libra"
            ],
            "desc_short": [
                "View info on one enemy",
                "查看1名敵人的情報",
                "적 1명의 정보 확인",
                "Obtient des infos sur un ennemi",
                "Info über Gegner",
                "Te permite ver información de un enemigo."
            ],
            "desc_long": [
                "Allows you to view info on one enemy.",
                "可以查看1名敵人的情報。",
                "적 1명의 정보를 확인합니다.",
                "Permet d'obtenir des informations sur un ennemi.",
                "Zeigt Informationen eines Gegners an.",
                "Te permite ver información de un enemigo."
            ]
        }
    },
    "10020": {
        "name": "Cure",
        "compendium_id": 2,
        "type": "MAGIC",
        "active": true,
        "usable_in_exploration": true,
        "rarity": 1,
        "magic_type": "White",
        "cost": {"MP": 3},
        "is_sealable": true,
        "is_reflectable": true,
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
        "requirements": null,
        "icon": "ability_4.png",
        "strings": {
            "name": [
                "Cure",
                "療傷",
                "케알",
                "Soin",
                "Vita",
                "Cura"
            ],
            "desc_short": [
                "Restore HP for one ally",
                "恢復1名隊員的HP",
                "아군 1명의 HP 회복",
                "Soigne un allié",
                "Heilt LP, ein Verb.",
                "Recupera la VIT de un aliado."
            ],
            "desc_long": [
                "Restores HP for one ally.",
                "恢復1名隊員的HP。",
                "아군 1명의 HP를 회복합니다.",
                "Soigne un allié.",
                "Heilt LP bei einem Verbündeten.",
                "Recupera la VIT de un aliado."
            ]
        }
    },
    "10030": {
        "name": "Blindna",
        "compendium_id": 3,
        "type": "MAGIC",
        "active": true,
        "usable_in_exploration": true,
        "rarity": 1,
        "magic_type": "White",
        "cost": {"MP": 3},
        "is_sealable": true,
        "is_reflectable": true,
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
        "requirements": null,
        "icon": "ability_3.png",
        "strings": {
            "name": [
                "Blindna",
                "復明",
                "블라나",
                "Vision",
                "Lux",
                "Luz"
            ],
            "desc_short": [
                "Cure one ally of being blinded",
                "治療1名隊員的失明狀態",
                "아군 1명의 암흑 회복",
                "Guérit un allié de cécité",
                "Heilt „Blind“, ein Verb.",
                "Cura la ceguera de un aliado."
            ],
            "desc_long": [
                "Cures blind for one ally.",
                "治療1名隊員的失明狀態。",
                "아군 1명의 암흑 상태를 회복합니다.",
                "Guérit un allié de cécité.",
                "Heilt „Blind“ eines Verbündeten.",
                "Cura la ceguera de un aliado."
            ]
        }
    }
  }`;
