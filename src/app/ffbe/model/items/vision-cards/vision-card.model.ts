import {Skill} from '../../skill.model';
import {VisionCardStats} from './vision-card-stats.model';

export class VisionCard {
  public gumi_id: number;
  public name: string;
  public rarity: number;
  public stats: VisionCardStats;
  public skills: any;
  public names: Array<string>;
  public dmSkills: Array<Skill>;
}
