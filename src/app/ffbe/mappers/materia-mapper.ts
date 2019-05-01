import {Materia} from '../model/materia.model';
import {Objet} from '../model/objet.model';
import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';
import {ItemCategoryFactory} from '../model/item-category.model';
import {SkillMapper} from './skill-mapper';

export class MateriaMapper {

  public static toObjet(materia: Materia): Objet {
    const objet = new Objet(null,
      materia.strings.names[FFBE_FRENCH_TABLE_INDEX],
      materia.strings.names[FFBE_ENGLISH_TABLE_INDEX],
      null,
      materia.gumi_id,
      materia.strings.desc_short[FFBE_FRENCH_TABLE_INDEX],
      materia.strings.desc_short[FFBE_ENGLISH_TABLE_INDEX],
      null,
      (Array.isArray(materia.effects) && materia.effects.length > 0) ? materia.effects.join('<br />') : null,
      Array.isArray(materia.dmSkills) ? materia.dmSkills.map(skill => SkillMapper.toCompetence(skill)) : null
    );

    objet.extended_gumi_id = ItemCategoryFactory.toString('ItemCategory.Materia') + ':' + materia.gumi_id;
    objet.prix_vente = materia.price_sell;

    return objet;
  }
  
}
