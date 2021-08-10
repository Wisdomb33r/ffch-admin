import {SkillEffect} from './skill-effect.model';
import {PassiveCoverEffect} from './passives/passive-cover-effect.model';
import {PassiveStatsIncreaseFixedEffect} from './passives/stats/passive-stats-increase-fixed-effect.model';
import {PassiveStatsIncreaseEffect} from './passives/stats/passive-stats-increase-effect.model';
import {PassiveDebuffsResistanceEffect} from './passives/passive-debuffs-resistance-effect.model';
import {PassiveChainBaseModifierIncreaseEffect} from './passives/passive-chain-base-modifier-increase-effect.model';
import {PassiveEquipmentStatsDualwieldIncreaseEffect} from './passives/stats/passive-equipment-stats-dualwield-increase-effect.model';
import {PassiveEquipmentStatsDoublehandIncreaseEffect} from './passives/stats/passive-equipment-stats-doublehand-increase-effect.model';
import {PassiveEquipmentStatsDoublehandGlexIncreaseEffect} from './passives/stats/passive-equipment-stats-doublehand-glex-increase-effect.model';
import {PassiveMpCostDecreaseEffect} from './passives/passive-mp-cost-decrease-effect.model';
import {PassiveElementsResistanceEffect} from './passives/passive-elements-resistance-effect.model';
import {PassiveElementsAbsorbEffect} from './passives/passive-elements-absorb-effect.model';
import {PassiveEquipmentCategoryElementsResistanceEffect} from './passives/passive-equipment-category-elements-resistance-effect.model';
import {PassiveAilmentsResistanceEffect} from './passives/passive-ailments-resistance-effect.model';
import {PassiveKillerDamageIncreaseEffect} from './passives/passive-killer-damage-increase-effect.model';
import {PassiveEquipmentCategoryKillerDamageIncreaseEffect} from './passives/passive-equipment-category-killer-damage-increase-effect.model';
import {PassiveJumpDamageIncreaseEffect} from './passives/passive-jump-damage-increase-effect.model';
import {PassiveSkillBattleStartActivationEffect} from './passives/skill/passive-skill-battle-start-activation-effect.model';
import {PassiveCounterAttackEffect} from './passives/passive-counter-attack-effect.model';
import {PassiveSkillCounterAttackActivationEffect} from './passives/skill/passive-skill-counter-attack-activation-effect.model';
import {PassiveEsperDamageIncreaseEffect} from './passives/esper/passive-esper-damage-increase-effect.model';
import {PassiveEsperSummonDamageIncreaseEffect} from './passives/esper/passive-esper-summon-damage-increase-effect.model';
import {PassiveEquipmentStatsIncreaseEffect} from './passives/stats/passive-equipment-stats-increase-effect.model';
import {PassiveEquipmentStatsDoublehandShieldIncreaseEffect} from './passives/stats/passive-equipment-stats-doublehand-shield-increase-effect.model';
import {PassiveEquipmentCategoryUnlockEffect} from './passives/passive-equipment-category-unlock-effect.model';
import {PassiveEquipmentCategoryStatsIncreaseEffect} from './passives/stats/passive-equipment-category-stats-increase-effect.model';
import {PassiveEquipmentWeaponElementStatsIncreaseEffect} from './passives/stats/passive-equipment-weapon-element-stats-increase-effect.model';
import {PassiveDualWieldWeaponCategoryUnlockEffect} from './passives/passive-dual-wield-weapon-category-unlock-effect.model';
import {PassiveLbDamageIncreaseEffect} from './passives/limitburst/passive-lb-damage-increase-effect.model';
import {PassiveLbPerTurnEffect} from './passives/limitburst/passive-lb-per-turn-effect.model';
import {PassiveLbSpeedIncreaseEffect} from './passives/limitburst/passive-lb-speed-increase-effect.model';
import {PassiveLbUpgradeEffect} from './passives/limitburst/passive-lb-upgrade-effect.model';
import {PassiveLbUpgradeHpThresholdEffect} from './passives/limitburst/passive-lb-upgrade-hp-threshold-effect.model';
import {PassiveChainModifierLimitIncreaseEffect} from './passives/passive-chain-modifier-limit-increase-effect.model';
import {PassiveChainModifierLimitWhileDualWieldingIncreaseEffect} from './passives/passive-chain-modifier-limit-while-dual-wielding-increase-effect.model';
import {PassiveBrokenTargetDamageIncreaseEffect} from './passives/passive-broken-target-damage-increase-effect.model';
import {PassiveSkillReplacingNormalAttackEffect} from './passives/passive-skill-replacing-normal-attack-effect.model';
import {PassiveSkillModifierIncreaseEffect} from './passives/skill/passive-skill-modifier-increase-effect.model';
import {PassiveSkillMoraleJaugeActivationEffect} from './passives/skill/passive-skill-morale-jauge-activation-effect.model';
import {PassiveEsperGroupSummonEffect} from './passives/esper/passive-esper-group-summon-effect.model';
import {PassiveEsperStatsIncreaseEffect} from './passives/esper/passive-esper-stats-increase-effect.model';
import {PassiveTargetChanceChangesEffect} from './passives/passive-target-chance-changes-effect.model';
import {PassiveEvasionPhysicalEffect} from './passives/passive-evasion-physical-effect.model';
import {PassiveEvasionMagicalEffect} from './passives/passive-evasion-magical-effect.model';
import {PassiveDamagesAbsorptionEffect} from './passives/passive-damages-absorption-effect.model';
import {PassiveItemsDropRateEffect} from './passives/passive-items-drop-rate-effect.model';
import {PassiveSkillMultipleActivationEffect} from './passives/skill/passive-skill-multiple-activation-effect.model';
import {PassiveSkillOrMagicMultipleActivationEffectModel} from './passives/skill/passive-skill-or-magic-multiple-activation-effect.model';

export class PassiveSkillEffectFactory {
  public static getSkillEffect(effectRaw): SkillEffect {
    switch (effectRaw[2]) {
      case 1:
        return new PassiveStatsIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 2:
        return new PassiveAilmentsResistanceEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 3:
        return new PassiveElementsResistanceEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 5:
        return new PassiveEquipmentCategoryUnlockEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 6:
        return new PassiveEquipmentCategoryStatsIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 8:
        return new PassiveCoverEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 11:
        return new PassiveKillerDamageIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 12:
        return new PassiveCounterAttackEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 13:
        return new PassiveEquipmentStatsDoublehandIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 14:
        return new PassiveDualWieldWeaponCategoryUnlockEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 17:
        return new PassiveJumpDamageIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 21:
        return new PassiveEsperDamageIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 22:
        return new PassiveEvasionPhysicalEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 24:
      case 25:
        return new PassiveTargetChanceChangesEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 31:
        return new PassiveLbSpeedIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 33:
        return new PassiveLbPerTurnEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 35:
        return new PassiveSkillBattleStartActivationEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 41:
        return new PassiveCounterAttackEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 42:
        return new PassiveElementsAbsorbEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 47:
        return new PassiveItemsDropRateEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 49:
      case 50:
        return new PassiveSkillCounterAttackActivationEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 53:
        return new PassiveSkillMultipleActivationEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 54:
        return new PassiveEvasionMagicalEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 55:
        return new PassiveDebuffsResistanceEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 56:
        return new PassiveSkillBattleStartActivationEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 59:
        return new PassiveCoverEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 61:
        return new PassiveEsperGroupSummonEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 63:
        return new PassiveEsperStatsIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 64:
        return new PassiveEsperSummonDamageIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 68:
        return new PassiveLbDamageIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 69:
        return new PassiveEquipmentStatsDualwieldIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 70:
        return new PassiveEquipmentStatsDoublehandIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 72:
        return new PassiveLbUpgradeEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 73:
        return new PassiveSkillModifierIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 74:
        return new PassiveEquipmentStatsIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 75:
        return new PassiveEquipmentCategoryKillerDamageIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 76:
        return new PassiveEquipmentCategoryElementsResistanceEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 77:
        return new PassiveMpCostDecreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 80:
        return new PassiveLbUpgradeHpThresholdEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 81:
        return new PassiveChainModifierLimitWhileDualWieldingIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 82:
        return new PassiveDamagesAbsorptionEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
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
      case 102:
        return new PassiveSkillOrMagicMultipleActivationEffectModel(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 103:
        return new PassiveSkillBattleStartActivationEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 10003:
        return new PassiveEquipmentStatsDoublehandGlexIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 10004:
        return new PassiveEquipmentWeaponElementStatsIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 10007:
        return new PassiveSkillMoraleJaugeActivationEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      default:
        return null;
    }
  }
}
