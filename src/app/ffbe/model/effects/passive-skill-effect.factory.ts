import {SkillEffect} from './skill-effect.model';
import {PassiveStatsIncreaseFixedEffect} from './passives/stats/passive-stats-increase-fixed-effect.model';
import {PassiveChainBaseModifierIncreaseEffect} from './passives/passive-chain-base-modifier-increase-effect.model';

export class PassiveSkillEffectFactory {
  public static getSkillEffect(effectRaw): SkillEffect {
    switch (effectRaw[2]) {
      case 84:
        return new PassiveChainBaseModifierIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 85:
        return new PassiveChainBaseModifierIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 89:
        return new PassiveStatsIncreaseFixedEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      default:
        return null;
    }
  }
}
