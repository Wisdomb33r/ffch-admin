import {SkillEffect} from './skill-effect.model';
import {PassiveStatsIncreaseFixedEffect} from './passives/stats/passive-stats-increase-fixed-effect.model';
import {PassiveStatsIncreaseEffect} from './passives/stats/passive-stats-increase-effect.model';
import {PassiveChainBaseModifierIncreaseEffect} from './passives/passive-chain-base-modifier-increase-effect.model';
import {PassiveEquipmentStatsDualwieldIncreaseEffect} from './passives/stats/passive-equipment-stats-dualwield-increase-effect.model';
import {PassiveEquipmentStatsDoublehandIncreaseEffect} from './passives/stats/passive-equipment-stats-doublehand-increase-effect.model';
import {PassiveEquipmentStatsDoublehandGlexIncreaseEffect} from './passives/stats/passive-equipment-stats-doublehand-glex-increase-effect.model';
import {PassiveMpCostDecreaseEffect} from './passives/passive-mp-cost-decrease-effect.model';
import {PassiveElementsResistanceEffect} from './passives/passive-elements-resistance-effect.model';
import {PassiveEquipmentCategoryElementsResistanceEffect} from './passives/passive-equipment-category-elements-resistance-effect.model';
import {PassiveAilmentsResistanceEffect} from './passives/passive-ailments-resistance-effect.model';
import {PassiveKillerDamageIncreaseEffect} from './passives/passive-killer-damage-increase-effect.model';
import {PassiveEquipmentCategoryKillerDamageIncreaseEffect} from './passives/passive-equipment-category-killer-damage-increase-effect.model';
import {PassiveSkillBattleStartActivationEffect} from './passives/skill/passive-skill-battle-start-activation-effect.model';
import {PassiveCounterAttackEffect} from './passives/passive-counter-attack-effect.model';
import {PassiveSkillCounterAttackActivationEffect} from './passives/skill/passive-skill-counter-attack-activation-effect.model';
import {PassiveEsperSummonDamageIncreaseEffect} from './passives/passive-esper-summon-damage-increase-effect.parser';
import {PassiveEquipmentStatsIncreaseEffect} from './passives/stats/passive-equipment-stats-increase-effect.model';
import {PassiveEquipmentStatsDoublehandShieldIncreaseEffect} from './passives/stats/passive-equipment-stats-doublehand-shield-increase-effect.model';
import {PassiveLbDamageIncreaseEffect} from './passives/limitburst/passive-lb-damage-increase-effect.model';
import {PassiveChainModifierLimitIncreaseEffect} from './passives/passive-chain-modifier-limit-increase-effect.model';
import {PassiveChainModifierLimitWhileDualWieldingIncreaseEffect} from './passives/passive-chain-modifier-limit-while-dual-wielding-increase-effect.model';
import {PassiveBrokenTargetDamageIncreaseEffect} from './passives/passive-broken-target-damage-increase-effect.model';
import {PassiveSkillReplacingNormalAttackEffect} from './passives/passive-skill-replacing-normal-attack-effect.model';

export class PassiveSkillEffectFactory {
  public static getSkillEffect(effectRaw): SkillEffect {
    switch (effectRaw[2]) {
      case 1:
        return new PassiveStatsIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 2:
        return new PassiveAilmentsResistanceEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 3:
        return new PassiveElementsResistanceEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 11:
        return new PassiveKillerDamageIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 12:
        return new PassiveCounterAttackEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 13:
        return new PassiveEquipmentStatsDoublehandIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 35:
        return new PassiveSkillBattleStartActivationEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 41:
        return new PassiveCounterAttackEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 49:
      case 50:
        return new PassiveSkillCounterAttackActivationEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 56:
        return new PassiveSkillBattleStartActivationEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 64:
        return new PassiveEsperSummonDamageIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 68:
        return new PassiveLbDamageIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 69:
        return new PassiveEquipmentStatsDualwieldIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 70:
        return new PassiveEquipmentStatsDoublehandIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 74:
        return new PassiveEquipmentStatsIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 75:
        return new PassiveEquipmentCategoryKillerDamageIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 76:
        return new PassiveEquipmentCategoryElementsResistanceEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 77:
        return new PassiveMpCostDecreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 81:
        return new PassiveChainModifierLimitWhileDualWieldingIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 84:
        return new PassiveChainBaseModifierIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 85:
        return new PassiveChainBaseModifierIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 89:
        return new PassiveStatsIncreaseFixedEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 95:
        return new PassiveBrokenTargetDamageIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 98:
        return new PassiveChainModifierLimitIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 99:
        return new PassiveEquipmentStatsDoublehandShieldIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 100:
        return new PassiveSkillReplacingNormalAttackEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 10003:
        return new PassiveEquipmentStatsDoublehandGlexIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      default:
        return null;
    }
  }
}
