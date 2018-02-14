import {Entry} from '../model/entry.model';
import {Unite} from '../model/unite.model';
import {Personnage} from '../model/personnage.model';

export class EntryMapper {

  public static toUnite(entry: Entry, gumi_id: number, perso: Personnage): Unite {
    return new Unite(
       perso, entry.rarity, "", "", "", "", 0, gumi_id
    );
  }

  public static toUniteArray(entries: any, perso: Personnage): Array<Unite> {
      let unites = new Array<Unite>();
      const entryNames: string[] = Object.getOwnPropertyNames(entries);
      for (let entryName of entryNames) {
          unites.push(EntryMapper.toUnite(entries[entryName], +entryName, perso));
      }
      return unites;
  }
}
