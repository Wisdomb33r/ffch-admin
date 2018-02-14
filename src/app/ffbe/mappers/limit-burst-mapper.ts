import {LimitBurst} from '../model/limit-burst.model';
import {Limite} from '../model/limite.model';
import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';

export class LimitBurstMapper {

  public static toLimite(lb: LimitBurst): Limite {
    return new Limite(
      lb.strings.name[FFBE_FRENCH_TABLE_INDEX],
      lb.strings.name[FFBE_ENGLISH_TABLE_INDEX],
      lb.strings.desc[FFBE_FRENCH_TABLE_INDEX],
      lb.strings.desc[FFBE_ENGLISH_TABLE_INDEX],
      lb.attack_count.length > 0 ? lb.attack_count[0] : null,
      lb.attack_frames.length > 0 ? lb.attack_frames[0].join(" ") : null
    );
  }
}
