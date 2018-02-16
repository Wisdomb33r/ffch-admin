import {LimitBurst} from '../model/limit-burst.model';
import {Unite} from '../model/unite.model';
import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';

export class UniteMapper {
  public static updateLimite(unite: Unite, lb: LimitBurst) {
    unite.limite = lb.strings.name[FFBE_FRENCH_TABLE_INDEX];
    unite.limite_en = lb.strings.name[FFBE_ENGLISH_TABLE_INDEX];
    unite.lim_desc = lb.strings.desc[FFBE_FRENCH_TABLE_INDEX];
    unite.lim_desc_en = lb.strings.desc[FFBE_ENGLISH_TABLE_INDEX];
    unite.lim_hits = lb.attack_count.length > 0 ? lb.attack_count[0] : null;
    unite.lim_frames = lb.attack_frames.length > 0 ? lb.attack_frames[0].join(" ") : null;
    unite.lim_nb_niv = lb.levels;
  }
}
