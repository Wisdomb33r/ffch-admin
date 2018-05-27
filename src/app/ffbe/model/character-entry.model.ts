import {CharacterEntryStats} from '../model/character-entry-stats.model';
import {LimitBurst} from './limit-burst.model';

export class CharacterEntry {
  public gumi_id: number;
  public compendium_id: number;
  public rarity: number;
  public stats: CharacterEntryStats;
  public limitburst_id: number;
  public lb: LimitBurst;
  public awakening: any;
}
