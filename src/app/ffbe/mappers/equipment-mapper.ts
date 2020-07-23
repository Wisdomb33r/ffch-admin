import {Equipment} from '../model/equipment/equipment.model';
import {Objet} from '../model/objet/objet.model';
import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {ItemCategoryFactory} from '../model/item-category.model';
import {SkillMapper} from './skill-mapper';
import {FfbeUtils} from '../utils/ffbe-utils';
import {EquipmentStats} from '../model/equipment/equipment-stats.model';
import {ObjetCarac} from '../model/objet/objet-carac';
import {ObjetElements} from '../model/objet/objet-elements';
import {EquipmentElementResist} from '../model/equipment/equipment-element-resist.model';
import {ObjetAlterationsEtat} from '../model/objet/objet-alterations-etat.model';
import {EquipmentStatusEffect} from '../model/equipment/equipment-status-effect.model';
import {Character} from '../model/character.model';
import {CharactersService} from '../services/characters.service';

export class EquipmentMapper {

  public static toObjet(equipment: Equipment) {
    const resistancesElementaires = EquipmentMapper.mapEquipmentElementResistances(equipment.stats.element_resist);
    const elementsArme = EquipmentMapper.mapEquipmentElementInflicts(equipment.stats.element_inflict);
    const requirements: string = EquipmentMapper.mapEquipmentRequirements(equipment.requirements);

    const objet = new Objet(null,
      FfbeUtils.findObjetCategorieByGumiId(equipment.type_id),
      equipment.strings.name[FFBE_FRENCH_TABLE_INDEX],
      equipment.strings.name[FFBE_ENGLISH_TABLE_INDEX],
      equipment.rarity,
      null,
      equipment.gumi_id,
      equipment.strings.desc_short[FFBE_FRENCH_TABLE_INDEX] ?
        equipment.strings.desc_short[FFBE_FRENCH_TABLE_INDEX] :
        equipment.strings.desc_long[FFBE_FRENCH_TABLE_INDEX],
      equipment.strings.desc_short[FFBE_ENGLISH_TABLE_INDEX] ?
        equipment.strings.desc_short[FFBE_ENGLISH_TABLE_INDEX] :
        equipment.strings.desc_long[FFBE_ENGLISH_TABLE_INDEX],
      requirements,
      (Array.isArray(equipment.effects) && equipment.effects.length > 0) ? equipment.effects.join('<br />') : null,
      EquipmentMapper.mapEquipmentStats(equipment.stats),
      ObjetCarac.newEmptyObjetCarac(),
      EquipmentMapper.mapEquipmentElements(resistancesElementaires, elementsArme),
      EquipmentMapper.mapEquipmentStatusEffect(equipment.stats.status_resist),
      Array.isArray(equipment.dmSkills) ? equipment.dmSkills.map(skill => SkillMapper.toCompetence(skill)) : null
    );

    objet.extended_gumi_id = ItemCategoryFactory.toString('ItemCategory.Equipment') + ':' + equipment.gumi_id;
    objet.prix_vente = equipment.price_sell;
    objet.resistancesElementaires = resistancesElementaires;
    objet.elementsArme = elementsArme;

    objet.two_handed = equipment.is_twohanded;
    if (Array.isArray(equipment.dmg_variance) && equipment.dmg_variance.length >= 2) {
      objet.variance_min = Math.round(equipment.dmg_variance[0] * 100);
      objet.variance_max = Math.round(equipment.dmg_variance[1] * 100);
    }
    objet.alterationsArme = EquipmentMapper.mapEquipmentStatusEffect(equipment.stats.status_inflict);

    return objet;
  }

  private static mapEquipmentStats(stats: EquipmentStats): ObjetCarac {
    return new ObjetCarac(stats.HP, stats.MP, stats.ATK, stats.DEF, stats.MAG, stats.SPR);
  }

  private static mapEquipmentElementResistances(res: EquipmentElementResist): ObjetElements {
    if (FfbeUtils.isNullOrUndefined(res)) {
      return ObjetElements.newEmptyObjetElements();
    }
    return new ObjetElements(res.Fire, res.Ice, res.Lightning, res.Water, res.Wind, res.Earth, res.Light, res.Dark);
  }

  private static mapEquipmentElementInflicts(inflicts: Array<string>) {
    const elements = ObjetElements.newEmptyObjetElements();

    if (Array.isArray(inflicts) && inflicts.length > 0) {
      inflicts.forEach(element => {
        if (element === 'Fire') {
          elements.feu = 1000;
        } else if (element === 'Ice') {
          elements.glace = 1000;
        } else if (element === 'Lightning') {
          elements.foudre = 1000;
        } else if (element === 'Water') {
          elements.eau = 1000;
        } else if (element === 'Wind') {
          elements.air = 1000;
        } else if (element === 'Earth') {
          elements.terre = 1000;
        } else if (element === 'Light') {
          elements.lumiere = 1000;
        } else if (element === 'Dark') {
          elements.tenebres = 1000;
        }
      });
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

    if (inflict === 1000) {
      if (FfbeUtils.isNullOrUndefined(resistance) || resistance === 0) {
        value = inflict;
      } else {
        value = resistance + 1000;
      }
    }
    return value;
  }

  private static mapEquipmentStatusEffect(e: EquipmentStatusEffect): ObjetAlterationsEtat {
    if (FfbeUtils.isNullOrUndefined(e)) {
      return ObjetAlterationsEtat.newEmptyObjetAlterationsEtat();
    }
    return new ObjetAlterationsEtat(e.Poison, e.Blind, e.Sleep, e.Silence, e.Paralyze, e.Confusion, e.Disease, e.Petrify);
  }

  private static mapEquipmentRequirements(requirements: Array<any>): string {
    let parsedRequirements = '';
    if (requirements && Array.isArray(requirements) && requirements.length > 1) {
      if (requirements[0] === 'SEX') {
        const sexText = requirements[1] === 2 ? 'féminin' : 'masculin';
        parsedRequirements += `Exclusif aux personnages de sexe ${sexText}`;
      }
      if (requirements[0] === 'UNIT_ID') {
        parsedRequirements += 'Exclusif à ';
        let first = true;
        const identifiers = Array.isArray(requirements[1]) ? requirements[1] : [requirements[1]];
        identifiers.forEach(identifier => {
          const character: Character = CharactersService.getInstance().searchForCharacterByGumiId(identifier);
          const separator = !first ? ', ' : '';
          if (!character || !character.names || !character.names[FFBE_FRENCH_TABLE_INDEX]) {
            parsedRequirements += `${separator}UNKNOWN character`;
          } else {
            parsedRequirements += `${separator}<a href="ffexvius_units.php?gumiid=${character.gumi_id}">${character.names[FFBE_FRENCH_TABLE_INDEX]}</a>`;
          }
          first = false;
        });
      }
    }
    return parsedRequirements;
  }
}
