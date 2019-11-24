export const CONSUMABLES_TEST_DATA =
  `{
    "101000100": {
        "name": "Potion",
        "type": "Consumable",
        "compendium_id": 1,
        "compendium_shown": true,
        "usable_in_combat": true,
        "usable_in_exploration": true,
        "flags": [true, true, false, true, false, false],
        "carry_limit": 10,
        "stack_size": 99,
        "price_buy": 100,
        "price_sell": 10,
        "effects": ["Restore 200 HP to target"],
        "effects_raw": [[1, 6, 71, [300210,  1]]],
        "icon": "item_1000.png",
        "strings": {
            "names": [
                "Potion",
                "治療劑",
                "포션",
                "Potion",
                "Trank",
                "Poción"
            ],
            "desc_short": [
                "Restore a small amount of HP to one ally",
                "少量恢復1名隊員的HP",
                "아군 1명의 HP 소량 회복",
                "Régénère légèrement les PV d'un allié",
                "Heilt einige LP eines Verbündeten.",
                "Recupera un poco la VIT de un aliado"
            ]
        }
    },
    "101000200": {
        "name": "Hi-Potion",
        "type": "Consumable",
        "compendium_id": 2,
        "compendium_shown": true,
        "usable_in_combat": true,
        "usable_in_exploration": true,
        "flags": [true, true, false, true, false, false],
        "carry_limit": 7,
        "stack_size": 99,
        "price_buy": 500,
        "price_sell": 50,
        "effects": ["Restore 500 HP to target"],
        "effects_raw": [[1, 6, 71, [300220,  1]]],
        "icon": "item_1001.png",
        "strings": {
            "names": [
                "Hi-Potion",
                "高級治療劑",
                "하이 포션",
                "Potion +",
                "Hi-Trank",
                "Ultrapoción"
            ],
            "desc_short": [
                "Restore HP for one ally",
                "恢復1名隊員的HP",
                "아군 1명의 HP 회복",
                "Régénère moyennement les PV d'un allié.",
                "Heilt LP eines Verbündeten.",
                "Recupera bastante VIT de un aliado"
            ]
        }
    }
  }`;
