import {EffectParser} from './effect-parser';
import {UnknownEffectParser} from './unknown-effect-parser';
import {PassiveEsperDamageIncreaseParser} from './passives/passive-esper-damage-increase.parser';
import {PassiveEquipmentCategoryUnlockParser} from './passives/passive-equipment-category-unlock.parser';
import {PassiveAilmentsResistanceParser} from './passives/passive-ailments-resistance.parser';
import {PassiveElementsResistanceParser} from './passives/passive-elements-resistance.parser';
import {PassiveStatsIncreaseHpThresholdParser} from './passives/passive-stats-increase-hp-threshold.parser';
import {PassiveEquipmentCategoryStatsIncreaseParser} from './passives/passive-equipment-category-stats-increase.parser';
import {PassiveCoverParser} from './passives/passive-cover.parser';
import {PassiveMpRecoveryParser} from './passives/passive-mp-recovery.parser';
import {PassiveSkillBattleStartActivationParser} from './passives/passive-skill-battle-start-activation.parser';
import {PassiveLbPerTurnParser} from './passives/passive-lb-per-turn.parser';
import {PassiveEquipmentStatsDoublehandIncreaseParser} from '../../model/effects/passives/stats/passive-equipment-stats-doublehand-increase.parser';
import {PassiveEvasionPhysicalParser} from './passives/passive-evasion-physical.parser';
import {PassiveLbDamageIncreaseParser} from './passives/passive-lb-damage-increase.parser';
import {PassiveTargetChanceChangesParser} from './passives/passive-target-chance-changes.parser';
import {PassiveLbSpeedIncreaseParser} from './passives/passive-lb-speed-increase.parser';
import {PassiveDualWieldWeaponCategoryUnlockParser} from './passives/passive-dual-wield-weapon-category-unlock.parser';
import {PassiveDebuffsResistanceParser} from './passives/passive-debuffs-resistance.parser';
import {PassiveEsperGroupSummonParser} from './passives/passive-esper-group-summon.parser';
import {PassiveKillerDamageIncreaseParser} from './passives/passive-killer-damage-increase.parser';
import {PassiveJumpDamageIncreaseParser} from './passives/passive-jump-damage-increase.parser';
import {PassiveSkillModifierIncreaseParser} from './passives/passive-skill-modifier-increase.parser';
import {PassiveEquipmentCategoryKillerDamageIncreaseParser} from './passives/passive-equipment-category-killer-damage-increase.parser';
import {PassiveLbUpgradeParser} from './passives/passive-lb-upgrade.parser';
import {PassiveLbUpgradeHpThresholdParser} from './passives/passive-lb-upgrade-hp-threshold.parser';
import {PassiveEsperStatsIncreaseParser} from './passives/passive-esper-stats-increase.parser';
import {PassiveCounterAttackChanceParser} from './passives/passive-counter-attack-chance.parser';
import {PassiveCounterAttackWithSkillParser} from './passives/passive-counter-attack-with-skill.parser';
import {PassiveEsperSummonDamageIncreaseParser} from './passives/passive-esper-summon-damage-increase.parser';
import {PassiveMpDecreaseForSongsParser} from './passives/passive-mp-decrease-for-songs.parser';
import {PassiveEvasionMagicalParser} from './passives/passive-evasion-magical.parser';
import {PassiveSkillMultipleActivationParser} from './passives/passive-skill-multiple-activation.parser';
import {PassiveEquipmentStatsIncreaseParser} from './passives/passive-equipment-stats-increase.parser';
import {PassiveSkillTurnStartActivationParser} from './passives/passive-skill-turn-start-activation.parser';
import {PassiveEquipmentStatsDoublehandGlexIncreaseParser} from '../../model/effects/passives/stats/passive-equipment-stats-doublehand-glex-increase.parser';
import {PassiveEquipmentWeaponElementStatsIncreaseParser} from './passives/passive-equipment-weapon-element-stats-increase.parser';
import {PassiveDualWieldDamageCapParser} from './passives/passive-dual-wield-damage-cap.parser';
import {PassiveDeceivesDeathParser} from './passives/passive-deceives-death.parser';
import {PassiveCounterAttackParser} from './passives/passive-counter-attack.parser';
import {PassiveElementsAbsorbParser} from './passives/passive-elements-absorb.parser';
import {PassiveStatsIncreaseUnarmedParser} from './passives/passive-stats-increase-unarmed.parser';
import {PassiveNormalAttacksMultipleStrikesParser} from './passives/passive-normal-attacks-multiple-strikes.parser';
import {PassiveItemsDropRateParser} from './passives/passive-items-drop-rate.parser';
import {PassiveGilsRateParser} from './passives/passive-gils-rate.parser';
import {PassiveExperienceRateParser} from './passives/passive-experience-rate.parser';
import {PassiveCombatRateDecreaseParser} from './passives/passive-combat-rate-decrease.parser';
import {PassiveSkillAliveAllyActivationParser} from './passives/passive-skill-alive-ally-activation.parser';
import {PassiveEquipmentCategoryElementsResistanceParser} from './passives/passive-equipment-category-elements-resistance.parser';
import {PassiveItemsHealingPotencyIncreaseParser} from './passives/passive-items-healing-potency-increase.parser';
import {PassiveExplorationStepRegenParser} from './passives/passive-exploration-step-regen.parser';
import {PassiveGilsWhileStealingParser} from './passives/passive-gils-while-stealing.parser';
import {PassiveItemsStealRateParser} from './passives/passive-items-steal-rate.parser';
import {PassiveMpCostDecreaseParser} from './passives/passive-mp-cost-decrease.parser';
import {AbilityMagicMultipleActivationParser} from './abilities/ability-magic-multiple-activation.parser';
import {PassiveMpAbsorbParser} from './passives/passive-mp-absorb.parser';
import {PassiveAilmentsCureAfterBattleParser} from './passives/passive-ailments-cure-after-battle.parser';

export class PassiveEffectParserFactory {
  public static getParser(effectId1: number, effectId2: number, effectId3: number): EffectParser {
    switch (effectId3) {
      case 2:
        return new PassiveAilmentsResistanceParser();
      case 3:
        return new PassiveElementsResistanceParser();
      case 4:
        return new PassiveStatsIncreaseHpThresholdParser();
      case 5:
        return new PassiveEquipmentCategoryUnlockParser();
      case 6:
        return new PassiveEquipmentCategoryStatsIncreaseParser();
      case 8:
        return new PassiveCoverParser();
      case 9:
        return new PassiveItemsHealingPotencyIncreaseParser();
      case 11:
        return new PassiveKillerDamageIncreaseParser();
      case 12:
        return new PassiveCounterAttackParser();
      case 13:
        return new PassiveEquipmentStatsDoublehandIncreaseParser();
      case 14:
        return new PassiveDualWieldWeaponCategoryUnlockParser();
      case 16:
        return new PassiveItemsStealRateParser();
      case 17:
        return new PassiveJumpDamageIncreaseParser();
      case 18:
        return new PassiveAilmentsCureAfterBattleParser();
      case 19:
        return new PassiveStatsIncreaseUnarmedParser();
      case 20:
        return new PassiveCounterAttackChanceParser();
      case 21:
        return new PassiveEsperDamageIncreaseParser();
      case 22:
        return new PassiveEvasionPhysicalParser();
      case 24:
        return new PassiveTargetChanceChangesParser();
      case 25:
        return new PassiveTargetChanceChangesParser();
      case 29:
        return new PassiveExplorationStepRegenParser();
      case 30:
        return new PassiveMpAbsorbParser();
      case 31:
        return new PassiveLbSpeedIncreaseParser();
      case 32:
        return new PassiveMpRecoveryParser();
      case 33:
        return new PassiveLbPerTurnParser();
      case 35:
        return new PassiveSkillBattleStartActivationParser();
      case 37:
        return new PassiveGilsRateParser();
      case 41:
        return new PassiveCounterAttackParser();
      case 42:
        return new PassiveElementsAbsorbParser();
      case 43:
        return new PassiveCombatRateDecreaseParser();
      case 44:
        return new PassiveNormalAttacksMultipleStrikesParser();
      case 45:
        return new PassiveExperienceRateParser();
      case 46:
        return new PassiveGilsWhileStealingParser();
      case 47:
        return new PassiveItemsDropRateParser();
      case 48:
        return new PassiveMpDecreaseForSongsParser();
      case 49:
        return new PassiveCounterAttackWithSkillParser();
      case 50:
        return new PassiveCounterAttackWithSkillParser();
      case 51:
        return new PassiveDeceivesDeathParser();
      case 52:
        return new AbilityMagicMultipleActivationParser();
      case 53:
        return new PassiveSkillMultipleActivationParser();
      case 54:
        return new PassiveEvasionMagicalParser();
      case 55:
        return new PassiveDebuffsResistanceParser();
      case 56:
        return new PassiveSkillBattleStartActivationParser();
      case 59:
        return new PassiveCoverParser();
      case 61:
        return new PassiveEsperGroupSummonParser();
      case 63:
        return new PassiveEsperStatsIncreaseParser();
      case 64:
        return new PassiveEsperSummonDamageIncreaseParser();
      case 66:
        return new PassiveSkillTurnStartActivationParser();
      case 68:
        return new PassiveLbDamageIncreaseParser();
      case 70:
        return new PassiveEquipmentStatsDoublehandIncreaseParser();
      case 72:
        return new PassiveLbUpgradeParser();
      case 73:
        return new PassiveSkillModifierIncreaseParser();
      case 74:
        return new PassiveEquipmentStatsIncreaseParser();
      case 75:
        return new PassiveEquipmentCategoryKillerDamageIncreaseParser();
      case 76:
        return new PassiveEquipmentCategoryElementsResistanceParser();
      case 77:
        return new PassiveMpCostDecreaseParser();
      case 80:
        return new PassiveLbUpgradeHpThresholdParser();
      case 81:
        return new PassiveDualWieldDamageCapParser();
      case 98:
        return new PassiveSkillMultipleActivationParser();
      case 136:
        return new PassiveSkillModifierIncreaseParser();
      case 10002:
        return new PassiveSkillAliveAllyActivationParser();
      case 10003:
        return new PassiveEquipmentStatsDoublehandGlexIncreaseParser();
      case 10004:
        return new PassiveEquipmentWeaponElementStatsIncreaseParser();
      case 10006:
        return new PassiveStatsIncreaseHpThresholdParser();
      default:
        return new UnknownEffectParser();
    }
  }
}
