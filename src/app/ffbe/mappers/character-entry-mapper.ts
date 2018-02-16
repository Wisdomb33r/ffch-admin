import {CharacterEntry} from '../model/character-entry.model';
import {Unite} from '../model/unite.model';
import {Personnage} from '../model/personnage.model';
import { CharacterEntryStatsMapper } from '../mappers/character-entry-stats.mapper';

export class CharacterEntryMapper {

  public static toUnite(entry: CharacterEntry, gumi_id: number, perso: Personnage): Unite {
    let unite = new Unite(
      perso, entry.rarity, entry.limitburst_id, gumi_id
    );
    unite.carac = CharacterEntryStatsMapper.toUniteCarac(entry.stats, unite);
    return unite;
  }

  public static toUniteArray(entries: any, perso: Personnage): Array<Unite> {
    let unites = new Array<Unite>();
    if (entries) {
      const entryNames: string[] = Object.getOwnPropertyNames(entries);
      for (let entryName of entryNames) {
        unites.push(CharacterEntryMapper.toUnite(entries[entryName], +entryName, perso));
      }
    }
    return unites;
  }
}
