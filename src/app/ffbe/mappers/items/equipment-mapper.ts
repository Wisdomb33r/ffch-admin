import {Equipment} from '../../model/items/equipment/equipment.model';
import {Objet} from '../../model/objet/objet.model';
import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../../ffbe.constants';
import {ItemCategoryFactory} from '../../model/items/item-category.model';
import {SkillMapper} from '../skill-mapper';
import {FfbeUtils} from '../../utils/ffbe-utils';
import {EquipmentStats} from '../../model/items/equipment/equipment-stats.model';
import {Caracteristiques} from '../../model/caracteristiques.model';
import {ResistancesElementaires} from '../../model/resistances-elementaires.model';
import {EquipmentElementResist} from '../../model/items/equipment/equipment-element-resist.model';
import {ResistancesAlterations} from '../../model/resistances-alterations.model';
import {EquipmentStatusEffect} from '../../model/items/equipment/equipment-status-effect.model';
import {Character} from '../../model/character/character.model';
import {CharactersService} from '../../services/characters.service';
import {ItemWithSkillsMapper} from './item-with-skills-mapper';
import {Skill} from '../../model/skill.model';
import {TueursMapper} from '../tueurs-mapper';

export class EquipmentMapper extends ItemWithSkillsMapper {

  public static toObjet(equipment: Equipment): Objet {
    const resistancesElementaires = EquipmentMapper.mapEquipmentElementResistances(equipment.stats.element_resist, equipment.dmSkills);
    const elementsArme = EquipmentMapper.mapEquipmentElementInflicts(equipment.stats.element_inflict);
    const requirements: string = EquipmentMapper.mapEquipmentRequirements(equipment.requirements);

    const tueursPhysiques = ItemWithSkillsMapper.mapPhysicalKillers(equipment.dmSkills);
    const tueursMagiques = ItemWithSkillsMapper.mapMagicalKillers(equipment.dmSkills);

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
      ItemWithSkillsMapper.mapEquipmentBaseIncreasesPercent(equipment.dmSkills),
      ItemWithSkillsMapper.mapEquipmentDoublehandIncreasesPercent(equipment.dmSkills),
      ItemWithSkillsMapper.mapEquipmentTrueDoublehandIncreasesPercent(equipment.dmSkills),
      ItemWithSkillsMapper.mapEquipmentDualwieldIncreasesPercent(equipment.dmSkills),
      EquipmentMapper.mapEquipmentElements(resistancesElementaires, elementsArme),
      EquipmentMapper.mapEquipmentStatusEffect(equipment.stats.status_resist, equipment.dmSkills),
      TueursMapper.toDataBaseRepresentation(tueursPhysiques),
      TueursMapper.toDataBaseRepresentation(tueursMagiques),
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
    objet.tueursPhysiques = tueursPhysiques;
    objet.tueursMagiques = tueursMagiques;
    objet.alterationsArme = EquipmentMapper.mapEquipmentStatusEffect(equipment.stats.status_inflict, null);

    return objet;
  }

  private static mapEquipmentStats(stats: EquipmentStats): Caracteristiques {
    return new Caracteristiques(stats.HP, stats.MP, stats.ATK, stats.DEF, stats.MAG, stats.SPR);
  }

  private static mapEquipmentElementResistances(res: EquipmentElementResist, dmSkills: Array<Skill>): ResistancesElementaires {
    if (FfbeUtils.isNullOrUndefined(res) && (!Array.isArray(dmSkills) || dmSkills.length === 0)) {
      return new ResistancesElementaires();
    }

    const resistances = new ResistancesElementaires(0, 0, 0, 0, 0, 0, 0, 0);
    if (!FfbeUtils.isNullOrUndefined(res)) {
      resistances.accumulateByAddition(new ResistancesElementaires(res.Fire, res.Ice, res.Lightning, res.Water, res.Wind, res.Earth, res.Light, res.Dark));
    }

    resistances.accumulateByAddition(ItemWithSkillsMapper.mapElementResistances(dmSkills));

    return resistances;
  }

  private static mapEquipmentElementInflicts(inflicts: Array<string>) {
    const elements = new ResistancesElementaires();

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

  private static mapEquipmentElements(resistances: ResistancesElementaires, inflicts: ResistancesElementaires) {

    const elements = new ResistancesElementaires();

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

  private static mapEquipmentStatusEffect(e: EquipmentStatusEffect, dmSkills: Array<Skill>): ResistancesAlterations {
    if (FfbeUtils.isNullOrUndefined(e) && (!Array.isArray(dmSkills) || dmSkills.length === 0)) {
      return new ResistancesAlterations();
    }

    const resistances = new ResistancesAlterations(0, 0, 0, 0, 0, 0, 0, 0);
    if (!FfbeUtils.isNullOrUndefined(e)) {
      resistances.accumulateByAddition(new ResistancesAlterations(e.Poison, e.Blind, e.Sleep, e.Silence, e.Paralyze, e.Confusion, e.Disease, e.Petrify));
    }

    resistances.accumulateByAddition(ItemWithSkillsMapper.mapAilmentResistances(dmSkills));

    return ItemWithSkillsMapper.capResistancesAlterations(resistances);
  }

  private static mapEquipmentRequirements(requirements: Array<any>): string {
    let parsedRequirements = '';
    if (requirements && Array.isArray(requirements) && requirements.length > 1) {
      if (requirements[0] === 'SEX') {
        const sexText = requirements[1] === 2 ? 'féminin' : 'masculin';
        parsedRequirements = `Exclusif aux personnages de sexe ${sexText}`;
      }
      if (requirements[0] === 'UNIT_ID') {
        parsedRequirements = this.parseUnitRequirement(requirements);
      }
    }
    return parsedRequirements;
  }

  private static parseUnitRequirement(requirements: any[]) {
    let parsedRequirements = 'Exclusif à ';
    let first = true;
    const identifiers = Array.isArray(requirements[1]) ? requirements[1] : [requirements[1]];
    identifiers.forEach(identifier => {
      const character: Character = CharactersService.getInstance().searchForShallowCharacterByGumiId(identifier);
      const separator = !first ? ', ' : '';
      if (!character || !character.names || !character.names[FFBE_FRENCH_TABLE_INDEX]) {
        parsedRequirements += `${separator}UNKNOWN character`;
      } else {
        parsedRequirements += `${separator}<a href="ffexvius_units.php?gumiid=${character.gumi_id}">${character.names[FFBE_FRENCH_TABLE_INDEX]}</a>`;
      }
      first = false;
    });
    return parsedRequirements;
  }
}
