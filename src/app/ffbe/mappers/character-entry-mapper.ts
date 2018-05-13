import {CharacterEntry} from '../model/character-entry.model';
import {Unite} from '../model/unite.model';
import {Personnage} from '../model/personnage.model';
import {CharacterEntryStatsMapper} from './character-entry-stats.mapper';
import {LimitBurst} from '../model/limit-burst.model';
import {UniteMateriauEveil} from '../model/unite-materiau-eveil.model';
import {FFBE_ENGLISH_TABLE_INDEX, FFBE_FRENCH_TABLE_INDEX} from '../ffbe.constants';

export class CharacterEntryMapper {

  public static toUnite(entry: CharacterEntry, gumi_id: number, perso: Personnage): Unite {
    const unite = new Unite(
      entry.compendium_id,
      entry.rarity,
      entry.limitburst_id,
      gumi_id
    );
    unite.carac = CharacterEntryStatsMapper.toUniteCarac(entry.stats, unite);
    CharacterEntryMapper.convertLimitBurst(unite, entry.lb);
    CharacterEntryMapper.convertAwakeningMaterials(unite, entry.awakening);
    return unite;
  }

  public static toUniteArray(entries: any, perso: Personnage): Array<Unite> {
    const unites: Array<Unite> = [];
    if (entries) {
      const entryNames: string[] = Object.getOwnPropertyNames(entries);
      for (const entryName of entryNames) {
        unites.push(CharacterEntryMapper.toUnite(entries[entryName], +entryName, perso));
      }
    }
    return unites;
  }

  private static convertLimitBurst(unite: Unite, lb: LimitBurst) {
    if (lb) {
      unite.limite = lb.strings.name[FFBE_FRENCH_TABLE_INDEX];
      unite.limite_en = lb.strings.name[FFBE_ENGLISH_TABLE_INDEX];
      unite.lim_desc = lb.strings.desc[FFBE_FRENCH_TABLE_INDEX];
      unite.lim_desc_en = lb.strings.desc[FFBE_ENGLISH_TABLE_INDEX];
      unite.lim_effect_min = lb.min_level.effects.length > 0 ? lb.min_level.effects.join('<br />') : null;
      unite.lim_effect_max = lb.max_level.effects.length > 0 ? lb.max_level.effects.join('<br />') : null;
      unite.lim_hits = lb.attack_count.length > 0 ? lb.attack_count[0] : null;
      unite.lim_frames = lb.attack_frames.length > 0 ? lb.attack_frames[0].join(' ') : null;
      unite.lim_damages = lb.attack_damage.length > 0 ? lb.attack_damage[0].join(' ') : null;
      unite.lim_cristals_niv_min = lb.min_level.cost;
      unite.lim_cristals_niv_max = lb.max_level.cost;
      unite.lim_nb_niv = lb.levels;
    }
  }

  private static convertAwakeningMaterials(unite: Unite, awakening: any) {
    if (awakening && awakening.materials) {
      const materiauxEveil = new Array<UniteMateriauEveil>();
      console.log(awakening);
      const awakeningMaterialsNames: string[] = Object.getOwnPropertyNames(awakening.materials);
      for (const awakeningMaterialName of awakeningMaterialsNames) {
        const materiauEveil = new UniteMateriauEveil(+awakeningMaterialName, awakening.materials[awakeningMaterialName]);
        materiauxEveil.push(materiauEveil);
      }
      console.log('Materiaux éveil pour unité: ' + unite.stars + ' = ' + materiauxEveil);
      if (materiauxEveil.length > 0) {
        unite.materiauxEveil = materiauxEveil;
      }
    }
  }
}
