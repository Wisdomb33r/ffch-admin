import {SkillEffect} from './skill-effect.model';
import {PassiveStatsIncreaseFixedEffect} from './passives/stats/passive-stats-increase-fixed-effect.model';
import {PassiveStatsIncreaseEffect} from './passives/stats/passive-stats-increase-effect.model';

export class PassiveSkillEffectFactory {
  public static getSkillEffect(effectRaw): SkillEffect {
    switch (effectRaw[2]) {
      case 1:
        return new PassiveStatsIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 89:
        return new PassiveStatsIncreaseFixedEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      default:
        return null;
    }
  }
}
