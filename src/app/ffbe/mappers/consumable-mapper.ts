import {Consumable} from '../model/consumable.model';
import {Objet} from '../model/objet/objet.model';
import {Caracteristiques} from '../model/caracteristiques.model';
import {ResistancesElementaires} from '../model/resistances-elementaires.model';
import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {ItemCategoryFactory} from '../model/item-category.model';
import {CategorieObjet} from '../model/objet/categorie-objet.model';
import {FfbeUtils} from '../utils/ffbe-utils';
import {ResistancesAlterations} from '../model/resistances-alterations.model';

export class ConsumableMapper {

  public static toObjet(consumable: Consumable): Objet {
    const objet = new Objet(null,
      ConsumableMapper.mapTypeIntoCategorie(consumable.type, consumable.strings.names[FFBE_FRENCH_TABLE_INDEX]),
      consumable.strings.names[FFBE_FRENCH_TABLE_INDEX],
      consumable.strings.names[FFBE_ENGLISH_TABLE_INDEX],
      null,
      null,
      consumable.gumi_id,
      consumable.strings.desc_short[FFBE_FRENCH_TABLE_INDEX] ?
        consumable.strings.desc_short[FFBE_FRENCH_TABLE_INDEX] :
        consumable.strings.desc_long[FFBE_FRENCH_TABLE_INDEX],
      consumable.strings.desc_short[FFBE_ENGLISH_TABLE_INDEX] ?
        consumable.strings.desc_short[FFBE_ENGLISH_TABLE_INDEX] :
        consumable.strings.desc_long[FFBE_ENGLISH_TABLE_INDEX],
      null,
      (Array.isArray(consumable.effects) && consumable.effects.length > 0) ? consumable.effects.join('<br />') : null,
      new Caracteristiques(),
      new Caracteristiques(),
      new Caracteristiques(),
      new Caracteristiques(),
      new Caracteristiques(),
      new ResistancesElementaires(),
      ResistancesAlterations.newEmptyObjetAlterationsEtat(),
      null
    );

    objet.extended_gumi_id = ItemCategoryFactory.toString('ItemCategory.Consumable') + ':' + consumable.gumi_id;
    objet.prix_vente = consumable.price_sell;

    return objet;
  }

  public static mapTypeIntoCategorie(type: string, nom: string): CategorieObjet {
    let categorie = FfbeUtils.findObjetCategorieByFfchId(61);

    if (type === '4') {
      categorie = FfbeUtils.findObjetCategorieByFfchId(36);
    } else if (type === 'Awakening') {
      categorie = FfbeUtils.findObjetCategorieByFfchId(65);
      if (nom?.startsWith('Prisme')) {
        categorie = FfbeUtils.findObjetCategorieByFfchId(79);
      }
      if (nom?.startsWith('Fragment')) {
        categorie = FfbeUtils.findObjetCategorieByFfchId(66);
      }
    } else if (type === 'Item') {
      categorie = FfbeUtils.findObjetCategorieByFfchId(59);
    }

    return categorie;
  }

}
