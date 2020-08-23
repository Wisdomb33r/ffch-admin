import {Materia} from '../model/materia.model';
import {Objet} from '../model/objet/objet.model';
import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {ItemCategoryFactory} from '../model/item-category.model';
import {SkillMapper} from './skill-mapper';
import {FfbeUtils} from '../utils/ffbe-utils';
import {Caracteristiques} from '../model/caracteristiques';
import {ObjetElements} from '../model/objet/objet-elements';
import {ObjetAlterationsEtat} from '../model/objet/objet-alterations-etat.model';

export class MateriaMapper {

  public static toObjet(materia: Materia): Objet {
    const objet = new Objet(null,
      FfbeUtils.findObjetCategorieByFfchId(57),
      materia.strings.names[FFBE_FRENCH_TABLE_INDEX],
      materia.strings.names[FFBE_ENGLISH_TABLE_INDEX],
      null,
      null,
      materia.gumi_id,
      materia.strings.desc_short[FFBE_FRENCH_TABLE_INDEX] ?
        materia.strings.desc_short[FFBE_FRENCH_TABLE_INDEX] :
        materia.strings.desc_long[FFBE_FRENCH_TABLE_INDEX],
      materia.strings.desc_short[FFBE_ENGLISH_TABLE_INDEX] ?
        materia.strings.desc_short[FFBE_ENGLISH_TABLE_INDEX] :
        materia.strings.desc_long[FFBE_ENGLISH_TABLE_INDEX],
      null,
      (Array.isArray(materia.effects) && materia.effects.length > 0) ? materia.effects.join('<br />') : null,
      Caracteristiques.newEmptyCaracteristiques(),
      Caracteristiques.newEmptyCaracteristiques(),
      ObjetElements.newEmptyObjetElements(),
      ObjetAlterationsEtat.newEmptyObjetAlterationsEtat(),
      Array.isArray(materia.dmSkills) ? materia.dmSkills.map(skill => SkillMapper.toCompetence(skill)) : null
    );

    if (Array.isArray(materia.dmSkills) && materia.dmSkills.length >= 1) {
      objet.stars = materia.dmSkills[0].rarity;
    }

    objet.extended_gumi_id = ItemCategoryFactory.toString('ItemCategory.Materia') + ':' + materia.gumi_id;
    objet.prix_vente = materia.price_sell;

    return objet;
  }

}
