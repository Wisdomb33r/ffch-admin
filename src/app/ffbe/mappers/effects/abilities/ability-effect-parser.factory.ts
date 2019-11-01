import {EffectParser} from '../effect-parser';
import {UnknownEffectParser} from '../unknown-effect-parser';
import {AbilityStatsModificationParser} from './ability-stats-modification.parser';
import {AbilityElementResistancesParser} from './ability-element-resistances.parser';
import {AbilityAilmentsInflictionParser} from './ability-ailments-infliction.parser';
import {AbilityAilmentsRandomInflictionParser} from './ability-ailments-random-infliction.parser';
import {AbilityAilmentsResistanceParser} from './ability-ailments-resistance.parser';
import {AbilityCountersParser} from './ability-counters.parser';
import {AbilitySkillModifierIncreaseParser} from './ability-skill-modifier-increase.parser';
import {AbilitySkillMultipleActivationParser} from './ability-skill-multiple-activation.parser';
import {AbilityDamagesPhysicalParser} from './ability-damages-physical.parser';
import {AbilityDamagesMagicParser} from './ability-damages-magic.parser';
import {AbilityDamagesHybridParser} from './ability-damages-hybrid.parser';
import {AbilityDamagesPhysicalIgnoreDefParser} from './ability-damages-physical-ignore-def.parser';
import {AbilityDamagesMagicIgnoreSprParser} from './ability-damages-magic-ignore-spr.parser';
import {AbilityDamagesPhysicalHpSacrificeParser} from './ability-damages-physical-hp-sacrifice.parser';
import {AbilityDamagesDrainParser} from './ability-damages-drain.parser';
import {AbilityDamagesPhysicalTurnDelayParser} from './ability-damages-physical-turn-delay.parser';
import {AbilityDamagesMagicConsecutiveIncreaseParser} from './ability-damages-magic-consecutive-increase.parser';
import {AbilityDamagesPhysicalComboParser} from './ability-damages-physical-combo.parser';
import {AbilityCooldownParser} from './ability-cooldown-parser';
import {AbilityDamagesPhysicalConsecutiveIncreaseParser} from './ability-damages-physical-consecutive-increase.parser';
import {AbilityDamagesPhysicalCriticalHitParser} from './ability-damages-physical-critical-hit.parser';
import {AbilityDamagesPhysicalJumpDelayParser} from './ability-damages-physical-jump-delay.parser';
import {AbilityDamagesMagicSprScalingParser} from './ability-damages-magic-spr-scaling.parser';
import {AbilityDamagesPhysicalDefScalingParser} from './ability-damages-physical-def-scaling.parser';
import {AbilityDamagesFixedParser} from './ability-damages-fixed.parser';
import {AbilityDamagesOrDeathParser} from './ability-damages-or-death.parser';
import {AbilityHealingParser} from './ability-healing.parser';
import {AbilityHealingTurnSplitParser} from './ability-healing-turn-split.parser';
import {AbilityHealingPercentParser} from './ability-healing-percent.parser';
import {AbilityHealingFixedParser} from './ability-healing-fixed.parser';
import {AbilitySkillActivationParser} from './ability-skill-activation.parser';
import {AbilityLbCrystalsParser} from './ability-lb-crystals.parser';
import {AbilityLbSpeedIncreaseParser} from './ability-lb-speed-increase.parser';
import {AbilityElementImbueParser} from './ability-element-imbue.parser';
import {AbilityDispelsParser} from './ability-dispels.parser';
import {AbilitySkillSwitchParser} from './ability-skill-switch.parser';
import {AbilityDamagesDotsParser} from './ability-damages-dots.parser';
import {AbilityMitigationsParser} from './ability-mitigations.parser';
import {AbilityDelayedSkillParser} from './ability-delayed-skill.parser';
import {AbilityStopInflictionParser} from './ability-stop-infliction.parser';
import {AbilityMagicMultipleActivationParser} from './ability-magic-multiple-activation.parser';
import {AbilityDamagesEvokerParser} from './ability-damages-evoker.parser';
import {AbilityDamagesPercentParser} from './ability-damages-percent.parser';
import {AbilityDebuffsResistanceParser} from './ability-debuffs-resistance.parser';
import {AbilityKillerDamageIncreaseParser} from './ability-killer-damage-increase.parser';
import {AbilityCharmInflictionParser} from './ability-charm-infliction.parser';
import {AbilityAilmentsCureParser} from './ability-ailments-cure.parser';
import {AbilityLbTransferParser} from './ability-lb-transfer.parser';
import {AbilityRaiseParser} from './ability-raise.parser';
import {AbilityRaiseAutoParser} from './ability-raise-auto.parser';
import {AbilityDodgesParser} from './ability-dodges.parser';
import {AbilityProvocationsParser} from './ability-provocations.parser';
import {AbilityDebuffsCureParser} from './ability-debuffs-cure.parser';
import {AbilityEsperOrbsParser} from './ability-esper-orbs.parser';
import {AbilityCoversParser} from './ability-covers.parser';
import {AbilityLbDamageIncreaseParser} from './ability-lb-damage-increase.parser';
import {AbilitySingleAllyCoversParser} from './ability-single-ally-covers.parser';
import {AbilityBarriersParser} from './ability-barriers.parser';
import {AbilityDeathInflictionParser} from './ability-death-infliction.parser';
import {AbilitySpellNullificationParser} from './ability-spell-nullification.parser';
import {AbilityEnemyScanParser} from './ability-enemy-scan.parser';
import {AbilityBerserkInflictionParser} from './ability-berserk-infliction.parser';
import {AbilityDamagesHexParser} from './ability-damages-hex.parser';
import {AbilityRandomSkillsParser} from './ability-random-skills.parser';
import {AbilityNormalAttackModifierIncreaseParser} from './ability-normal-attack-modifier-increase.parser';

export class AbilityEffectParserFactory {
  public static getParser(effectId1: number, effectId2: number, effectId3: number): EffectParser {
    switch (effectId3) {
      case 1:
        return new AbilityDamagesPhysicalParser();
      case 2:
        return new AbilityHealingParser();
      case 3:
        return new AbilityStatsModificationParser();
      case 4:
        return new AbilityRaiseParser();
      case 5:
        return new AbilityAilmentsCureParser();
      case 6:
        return new AbilityAilmentsInflictionParser();
      case 7:
        return new AbilityAilmentsResistanceParser();
      case 8:
        return new AbilityHealingTurnSplitParser();
      case 9:
        return new AbilityDamagesPercentParser();
      case 10:
        return new AbilityDamagesDrainParser();
      case 13:
        return new AbilityDamagesPhysicalTurnDelayParser();
      case 15:
        return new AbilityDamagesMagicParser();
      case 16:
        return new AbilityHealingFixedParser();
      case 17:
        return new AbilityHealingFixedParser();
      case 18:
        return new AbilityMitigationsParser();
      case 19:
        return new AbilityMitigationsParser();
      case 20:
        return new AbilityNormalAttackModifierIncreaseParser();
      case 21:
        return new AbilityDamagesPhysicalIgnoreDefParser();
      case 24:
        return new AbilityStatsModificationParser();
      case 25:
        return new AbilityDamagesDrainParser();
      case 26:
        return new AbilityHealingPercentParser();
      case 27:
        return new AbilityRaiseAutoParser();
      case 29:
        return new AbilityRandomSkillsParser();
      case 30:
        return new AbilityHealingTurnSplitParser();
      case 31:
        return new AbilityLbTransferParser();
      case 32:
        return new AbilityEsperOrbsParser();
      case 33:
        return new AbilityElementResistancesParser();
      case 34:
        return new AbilityAilmentsRandomInflictionParser();
      case 35:
        return new AbilityDeathInflictionParser();
      case 40:
        return new AbilityDamagesHybridParser();
      case 41:
        return new AbilityDamagesFixedParser();
      case 42:
        return new AbilityDamagesPhysicalComboParser();
      case 43:
        return new AbilityDamagesPhysicalCriticalHitParser();
      case 44:
        return new AbilityMagicMultipleActivationParser();
      case 45:
        return new AbilityMagicMultipleActivationParser();
      case 47:
        return new AbilityEnemyScanParser();
      case 52:
        if (effectId1 === 0) {
          return new AbilityMagicMultipleActivationParser();
        } else {
          return new AbilityDamagesPhysicalJumpDelayParser();
        }
      case 53:
        return new AbilitySkillMultipleActivationParser();
      case 54:
        return new AbilityDodgesParser();
      case 56:
        return new AbilityHealingTurnSplitParser();
      case 57:
        return new AbilityHealingTurnSplitParser();
      case 58:
        return new AbilityStatsModificationParser();
      case 59:
        return new AbilityDispelsParser();
      case 60:
        return new AbilityCharmInflictionParser();
      case 61:
        return new AbilityProvocationsParser();
      case 63:
        return new AbilityLbSpeedIncreaseParser();
      case 64:
        return new AbilityHealingPercentParser();
      case 65:
        return new AbilityHealingFixedParser();
      case 68:
        return new AbilityBerserkInflictionParser();
      case 70:
        return new AbilityDamagesMagicIgnoreSprParser();
      case 72:
        return new AbilityDamagesMagicConsecutiveIncreaseParser();
      case 81:
        return new AbilityDamagesPhysicalHpSacrificeParser();
      case 84:
        return new AbilitySpellNullificationParser();
      case 88:
        return new AbilityStopInflictionParser();
      case 89:
        return new AbilityDebuffsResistanceParser();
      case 92:
        return new AbilityKillerDamageIncreaseParser();
      case 93:
        return new AbilityKillerDamageIncreaseParser();
      case 95:
        return new AbilityElementImbueParser();
      case 96:
        return new AbilityCoversParser();
      case 98:
        return new AbilitySkillMultipleActivationParser();
      case 99:
        return new AbilitySkillSwitchParser();
      case 100:
        return new AbilitySkillActivationParser();
      case 101:
        return new AbilityMitigationsParser();
      case 102:
        return new AbilityDamagesPhysicalDefScalingParser();
      case 103:
        return new AbilityDamagesMagicSprScalingParser();
      case 111:
        return new AbilityDebuffsCureParser();
      case 112:
        return new AbilityDamagesOrDeathParser();
      case 118:
        return new AbilitySingleAllyCoversParser();
      case 120:
        return new AbilityLbDamageIncreaseParser();
      case 123:
        return new AbilityCountersParser();
      case 124:
        return new AbilityDamagesEvokerParser();
      case 125:
        return new AbilityLbCrystalsParser();
      case 126:
        return new AbilityDamagesPhysicalConsecutiveIncreaseParser();
      case 127:
        return new AbilityBarriersParser();
      case 130:
        return new AbilityCooldownParser();
      case 132:
        return new AbilityDelayedSkillParser();
      case 134:
        return new AbilityDamagesPhysicalJumpDelayParser();
      case 136:
        return new AbilitySkillModifierIncreaseParser();
      case 139:
        return new AbilityDamagesDotsParser();
      case 1012:
        return new AbilityDamagesHexParser();
      default:
        return new UnknownEffectParser();
    }
  }
}
