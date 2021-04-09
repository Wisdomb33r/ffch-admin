import {EffectParser} from '../effect-parser';
import {UnknownEffectParser} from '../unknown-effect-parser';
import {AbilityStatsModificationParser} from './ability-stats-modification.parser';
import {AbilityAilmentsInflictionParser} from './ability-ailments-infliction.parser';
import {AbilityAilmentsRandomInflictionParser} from './ability-ailments-random-infliction.parser';
import {AbilityAilmentsResistanceParser} from './ability-ailments-resistance.parser';
import {AbilityCountersParser} from './ability-counters.parser';
import {AbilitySkillModifierIncreaseParser} from './ability-skill-modifier-increase.parser';
import {AbilitySkillMultipleActivationParser} from './ability-skill-multiple-activation.parser';
import {AbilityHealingParser} from './ability-healing.parser';
import {AbilityHealingTurnSplitParser} from './ability-healing-turn-split.parser';
import {AbilityHealingPercentParser} from './ability-healing-percent.parser';
import {AbilityHealingFixedParser} from './ability-healing-fixed.parser';
import {AbilityLbCrystalsParser} from './ability-lb-crystals.parser';
import {AbilityLbSpeedIncreaseParser} from './ability-lb-speed-increase.parser';
import {AbilityElementImbueParser} from './ability-element-imbue.parser';
import {AbilityDispelsParser} from './ability-dispels.parser';
import {AbilityEscapeBattleParser} from './ability-escape-battle.parser';
import {AbilityMitigationsParser} from './ability-mitigations.parser';
import {AbilityStopInflictionParser} from './ability-stop-infliction.parser';
import {AbilityMagicMultipleActivationParser} from './ability-magic-multiple-activation.parser';
import {AbilityKillerDamageIncreaseParser} from './ability-killer-damage-increase.parser';
import {AbilityCharmInflictionParser} from './ability-charm-infliction.parser';
import {AbilityAilmentsCureParser} from './ability-ailments-cure.parser';
import {AbilityLbTransferParser} from './ability-lb-transfer.parser';
import {AbilityItemStealParser} from './ability-item-steal.parser';
import {AbilityRaiseParser} from './ability-raise.parser';
import {AbilityRaiseAutoParser} from './ability-raise-auto.parser';
import {AbilityDodgesParser} from './ability-dodges.parser';
import {AbilityProvocationsParser} from './ability-provocations.parser';
import {AbilityDebuffsCureParser} from './ability-debuffs-cure.parser';
import {AbilityEsperOrbsParser} from './ability-esper-orbs.parser';
import {AbilityLbDamageIncreaseParser} from './ability-lb-damage-increase.parser';
import {AbilitySingleAllyCoversParser} from './ability-single-ally-covers.parser';
import {AbilityBarriersParser} from './ability-barriers.parser';
import {AbilitySpellNullificationParser} from './ability-spell-nullification.parser';
import {AbilityEnemyScanParser} from './ability-enemy-scan.parser';
import {AbilityBerserkInflictionParser} from './ability-berserk-infliction.parser';
import {AbilityNormalAttackModifierIncreaseParser} from './ability-normal-attack-modifier-increase.parser';
import {AbilityThrowItemsParser} from './ability-throw-items.parser';
import {AbilityDebuffsStealParser} from './ability-debuffs-steal.parser';
import {AbilityMagicReflectParser} from './ability-magic-reflect.parser';
import {AbilityItemAllAlliesEffectParser} from './ability-item-all-allies-effect.parser';
import {AbilityCopyEffectsParser} from './ability-copy-effects.parser';
import {AbilityMagIncreaseNextAction} from './ability-mag-increase-next-action.parser';

export class AbilityEffectParserFactory {
  public static getParser(effectId1: number, effectId2: number, effectId3: number): EffectParser {
    switch (effectId3) {
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
      case 11:
        return new AbilityHealingPercentParser();
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
      case 24:
        return new AbilityStatsModificationParser();
      case 26:
        return new AbilityHealingPercentParser();
      case 27:
        return new AbilityRaiseAutoParser();
      case 28:
        return new AbilityItemAllAlliesEffectParser();
      case 30:
        return new AbilityHealingTurnSplitParser();
      case 31:
        return new AbilityLbTransferParser();
      case 32:
        return new AbilityEsperOrbsParser();
      case 34:
        return new AbilityAilmentsRandomInflictionParser();
      case 37:
        return new AbilityItemStealParser();
      case 44:
        return new AbilityMagicMultipleActivationParser();
      case 45:
        return new AbilityMagicMultipleActivationParser();
      case 47:
        return new AbilityEnemyScanParser();
      case 50:
        return new AbilityThrowItemsParser();
      case 51:
        return new AbilityEscapeBattleParser();
      case 52:
        if (effectId1 === 0) {
          return new AbilityMagicMultipleActivationParser();
        }
        break;
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
      case 84:
        return new AbilitySpellNullificationParser();
      case 86:
        return new AbilityMagicReflectParser();
      case 88:
        return new AbilityStopInflictionParser();
      case 90:
        return new AbilityMagIncreaseNextAction();
      case 92:
        return new AbilityKillerDamageIncreaseParser();
      case 93:
        return new AbilityKillerDamageIncreaseParser();
      case 95:
        return new AbilityElementImbueParser();
      case 97:
        return new AbilityMagicMultipleActivationParser();
      case 98:
        return new AbilitySkillMultipleActivationParser();
      case 101:
        return new AbilityMitigationsParser();
      case 111:
        return new AbilityDebuffsCureParser();
      case 118:
        return new AbilitySingleAllyCoversParser();
      case 119:
        return new AbilityCountersParser();
      case 120:
        return new AbilityLbDamageIncreaseParser();
      case 123:
        return new AbilityCountersParser();
      case 125:
        return new AbilityLbCrystalsParser();
      case 127:
        return new AbilityBarriersParser();
      case 133:
        return new AbilityDebuffsStealParser();
      case 136:
        return new AbilitySkillModifierIncreaseParser();
      case 1005:
        return new AbilityCopyEffectsParser();
      case 1006:
        return new AbilitySkillMultipleActivationParser();
      default:
        return new UnknownEffectParser();
    }
  }
}
