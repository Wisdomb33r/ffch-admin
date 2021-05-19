import {CharacterEntryStats} from './character-entry-stats.model';
import {LimitBurst} from '../limit-burst.model';
import {CharacterSkill} from './character-skill.model';
import {NeoVisionUpgradeEntry} from './neovision-upgrade-entry.model';

export class CharacterEntry {
  public gumi_id: number;
  public compendium_id: number;
  public rarity: number;
  public stats: CharacterEntryStats;
  public limitburst_id: number;
  public lb: LimitBurst;
  public upgraded_limitburst_id: number;
  public upgraded_lb: LimitBurst;
  public awakening: any;
  public nv_upgrade: Array<NeoVisionUpgradeEntry>;
  public brave_shift: number;
  public characterEntrySkills: Array<CharacterSkill>;
}
