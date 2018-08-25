import {Enhancement} from '../model/enhancement.model';
import {Amelioration} from '../model/amelioration.model';
import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';


export class EnhancementMapper {
  public static toAmelioration(enhancement: Enhancement): Amelioration {
    const amelioration = new Amelioration(
      enhancement.gumi_id,
      enhancement.units,
      enhancement.strings.names[FFBE_FRENCH_TABLE_INDEX],
      enhancement.strings.names[FFBE_ENGLISH_TABLE_INDEX],
      enhancement.strings.description[FFBE_FRENCH_TABLE_INDEX],
      enhancement.strings.description[FFBE_ENGLISH_TABLE_INDEX],
      enhancement.skill_id_old,
      enhancement.skill_id_new,
      enhancement.skill_id_base,
      enhancement.level);

    return amelioration;
  }

}
