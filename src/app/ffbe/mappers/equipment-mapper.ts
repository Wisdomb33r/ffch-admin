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
    const resistancesElementaires = EquipmentMapper.mapEquipmentElementResistances(equipment.stats.element_resist);
    const elementsArme = EquipmentMapper.mapEquipmentElementInflicts(equipment.stats.element_inflict);

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
      EquipmentMapper.mapEquipmentElements(resistancesElementaires, elementsArme),
      Array.isArray(equipment.dmSkills) ? equipment.dmSkills.map(skill => SkillMapper.toCompetence(skill)) : null
    );

    objet.extended_gumi_id = ItemCategoryFactory.toString('ItemCategory.Equipment') + ':' + equipment.gumi_id;
    objet.prix_vente = equipment.price_sell;
    objet.resistancesElementaires = resistancesElementaires;
    objet.elementsArme = elementsArme;

    return objet;
  }

  private static mapEquipmentStats(stats: EquipmentStats): ObjetCarac {
    return new ObjetCarac(stats.HP, stats.MP, stats.ATK, stats.DEF, stats.MAG, stats.SPR);
  }

  private static mapEquipmentElementResistances(res: EquipmentElementResist): ObjetElements {
    if (isNullOrUndefined(res)) {
      return ObjetElements.newEmptyObjetElements();
    }
    return new ObjetElements(res.Fire, res.Ice, res.Lightning, res.Water, res.Wind, res.Earth, res.Light, res.Dark);
  }

  private static mapEquipmentElementInflicts(inflicts: Array<string>) {
    const elements = ObjetElements.newEmptyObjetElements();

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

    return elements;
  }

  private static mapEquipmentElements(resistances: ObjetElements, inflicts: ObjetElements) {

    const elements = ObjetElements.newEmptyObjetElements();

    elements.feu = EquipmentMapper.computeElementValue(resistances.feu, inflicts.feu);
    elements.glace = EquipmentMapper.computeElementValue(resistances.glace, inflicts.glace);
    elements.foudre = EquipmentMapper.computeElementValue(resistances.foudre, inflicts.foudre);
    elements.eau = EquipmentMapper.computeElementValue(resistances.eau, inflicts.eau);
    elements.air = EquipmentMapper.computeElementValue(resistances.air, inflicts.air);
    elements.terre = EquipmentMapper.computeElementValue(resistances.terre, inflicts.terre);
    elements.lumiere = EquipmentMapper.computeElementValue(resistances.lumiere, inflicts.lumiere);
    elements.tenebres = EquipmentMapper.computeElementValue(resistances.tenebres, inflicts.tenebres);

    return elements;
  }

  private static computeElementValue(resistance: number, inflict: number): number {
    let value = resistance;

    if (inflict === 100) {
      if (isNullOrUndefined(resistance) || resistance === 0) {
        value = inflict;
      } else {
        value = resistance + 1000;
      }
    }
    return value;
  }

}
