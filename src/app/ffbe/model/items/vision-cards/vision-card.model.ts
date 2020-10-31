import {Skill} from '../../skill.model';
import {VisionCardStats} from './vision-card-stats.model';

export class VisionCard {
  gumi_id: number;
  name: string;
  rarity: number;
  stats: VisionCardStats;
  skills: any;
  dmSkills: Array<Skill>;
}
