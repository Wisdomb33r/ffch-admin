import {Equipment} from '../model/equipment/equipment.model';
import {Objet} from '../model/objet/objet.model';
import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {ItemCategory, ItemCategoryFactory} from '../model/item-category.model';
import {SkillMapper} from './skill-mapper';
import {FfbeUtils} from '../utils/ffbe-utils';

export class EquipmentMapper {

  public static toObjet(equipment: Equipment) {
    const objet = new Objet(null,
      FfbeUtils.findObjetCategorieByGumiId(equipment.type_id),
      equipment.strings.name[FFBE_FRENCH_TABLE_INDEX],
      equipment.strings.name[FFBE_ENGLISH_TABLE_INDEX],
      null,
      equipment.gumi_id,
      equipment.strings.desc_short[FFBE_FRENCH_TABLE_INDEX],
      equipment.strings.desc_short[FFBE_ENGLISH_TABLE_INDEX],
      null,
      (Array.isArray(equipment.effects) && equipment.effects.length > 0) ? equipment.effects.join('<br />') : null,
      Array.isArray(equipment.dmSkills) ? equipment.dmSkills.map(skill => SkillMapper.toCompetence(skill)) : null
    );

    objet.extended_gumi_id = ItemCategoryFactory.toString('ItemCategory.Equipment') + ':' + equipment.gumi_id;
    objet.prix_vente = equipment.price_sell;

    return objet;
  }
}
