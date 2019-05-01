import {Equipment} from '../model/equipment/equipment.model';
import {Objet} from '../model/objet/objet.model';
import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {ItemCategory, ItemCategoryFactory} from '../model/item-category.model';
import {SkillMapper} from './skill-mapper';
import {FfbeUtils} from '../utils/ffbe-utils';
import {EquipmentStats} from '../model/equipment/equipment-stats.model';
import {ObjetCarac} from '../model/objet/objet-carac';
import {ObjetElements} from '../model/objet/objet-elements';
import {isNullOrUndefined} from 'util';
import {EquipmentElementResist} from '../model/equipment/equipment-element-resist.model';

export class EquipmentMapper {

  public static toObjet(equipment: Equipment) {
    const objet = new Objet(null,
      FfbeUtils.findObjetCategorieByGumiId(equipment.type_id),
      equipment.strings.name[FFBE_FRENCH_TABLE_INDEX],
      equipment.strings.name[FFBE_ENGLISH_TABLE_INDEX],
      equipment.rarity,
      null,
      equipment.gumi_id,
      equipment.strings.desc_short[FFBE_FRENCH_TABLE_INDEX],
      equipment.strings.desc_short[FFBE_ENGLISH_TABLE_INDEX],
      null,
      (Array.isArray(equipment.effects) && equipment.effects.length > 0) ? equipment.effects.join('<br />') : null,
      EquipmentMapper.mapEquipmentStats(equipment.stats),
      ObjetCarac.newEmptyObjetCarac(),
      EquipmentMapper.mapEquipmentElements(equipment.stats),
      Array.isArray(equipment.dmSkills) ? equipment.dmSkills.map(skill => SkillMapper.toCompetence(skill)) : null
    );

    objet.extended_gumi_id = ItemCategoryFactory.toString('ItemCategory.Equipment') + ':' + equipment.gumi_id;
    objet.prix_vente = equipment.price_sell;

    return objet;
  }

  private static mapEquipmentStats(stats: EquipmentStats): ObjetCarac {
    return new ObjetCarac(stats.HP, stats.MP, stats.ATK, stats.DEF, stats.MAG, stats.SPR);
  }

  private static mapEquipmentElements(stats: EquipmentStats): ObjetElements {
    let elements = ObjetElements.newEmptyObjetElements();

    if (!isNullOrUndefined(stats.element_resist)) {
      elements = EquipmentMapper.mapEquipmentElementResistances(stats.element_resist);
    }

    if (!isNullOrUndefined(stats.element_inflict)) {
      EquipmentMapper.updateElementsWithInflicts(elements, stats.element_inflict);
    }

    return elements;
  }

  private static mapEquipmentElementResistances(res: EquipmentElementResist): ObjetElements {
    return new ObjetElements(res.Fire, res.Ice, res.Lightning, res.Water, res.Wind, res.Earth, res.Light, res.Dark);
  }

  private static updateElementsWithInflicts(elements: ObjetElements, inflicts: Array<string>) {
    if (Array.isArray(inflicts) && inflicts.length > 0) {
      inflicts.forEach(element => {
        if (element === 'Fire') {
          elements.feu = 100;
        } else if (element === 'Ice') {
          elements.glace = 100;
        } else if (element === 'Lightning') {
          elements.foudre = 100;
        } else if (element === 'Water') {
          elements.eau = 100;
        } else if (element === 'Wind') {
          elements.air = 100;
        } else if (element === 'Earth') {
          elements.terre = 100;
        } else if (element === 'Light') {
          elements.lumiere = 100;
        } else if (element === 'Dark') {
          elements.tenebres = 100;
        }
      })
    }
  }
}
