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
            ],
            "desc_long": [
                "A tonic that restores an ally's health by a modest amount. With its ingredients harder to come by and the preparation more difficult, it is more expensive than a standard potion, but its effectiveness cannot be denied. While standard potions suffice for everyday injuries, the grave wounds suffered by numerous soldiers in the war between Grandshelt and Zoldaad brought about a need for this potent restorative.",
                "能夠充分恢復隊員HP的藥。此藥的調配方法與原料的培育方法比治療劑複雜，作為藥品來說價格比較昂貴，可效果更加顯著。平時受的傷用治療劑就能治好，但格蘭謝爾特王國與佐爾達多之間反反復複的激烈鬥爭迫使人們改良出了這種高效藥。",
                "아군의 HP를 넉넉히 회복하는 약. 원료 재배 및 조합 난이도가 일반 포션보다 높아 값이 비싸지만, 그만큼 효과는 탁월하다. 일상적인 상처에는 포션만 써도 충분하지만, 그랑셸트 왕국과 졸다드의 치열한 전쟁은 이 약품의 개량을 추진하는 원동력이 되었다.",
                "Un tonifiant qui régénère correctement la santé d'un allié. Il est plus cher qu'une potion normale en raison d'ingrédients plus rares et d'une préparation plus difficile mais on ne peut nier ses effets. Bien que les potions normales soient suffisantes pour les bobos ordinaires, les graves blessures subies par de nombreux soldats dans la guerre entre Grandshelt et Zoldaad justifient le besoin de ce puissant revigorant.",
                "Ein Tonikum, das mittelschwere Verletzungen heilt. Die Zutaten sind rar und die Zubereitung aufwendig, doch die Wirksamkeit ist dafür umso größer. Normale Tränke sind ausreichend für alltägliche Verletzungen, doch die heftigen Kriege, in die Grandshelt oder Zoldaad immer wieder verwickelt werden, machten effektivere Heilmittel erforderlich, um die Verwundeten behandeln zu können.",
                "Un tónico que recupera una modesta cantidad de la salud de un aliado. Sus ingredientes son más difíciles de conseguir, y su preparación más elaborada, por lo que es más cara que la poción convencional, pero tiene una efectividad innegable. Así como las pociones estándar bastan para heridas cotidianas, las graves heridas sufridas por los soldados en la guerra entre Grandshelt y Zoldaad requirieron de esta potente preparación."
            ]
        }
    }
  }`;
