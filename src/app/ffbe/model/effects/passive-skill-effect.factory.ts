import {SkillEffect} from './skill-effect.model';
import {PassiveStatsIncreaseFixedEffect} from './passives/stats/passive-stats-increase-fixed-effect.model';
import {PassiveStatsIncreaseEffect} from './passives/stats/passive-stats-increase-effect.model';
import {PassiveChainBaseModifierIncreaseEffect} from './passives/passive-chain-base-modifier-increase-effect.model';
import {PassiveEquipmentStatsDualwieldIncreaseEffect} from './passives/stats/passive-equipment-stats-dualwield-increase-effect.model';
import {PassiveEquipmentStatsDoublehandIncreaseEffect} from './passives/stats/passive-equipment-stats-doublehand-increase-effect.model';
import {PassiveEquipmentStatsDoublehandGlexIncreaseEffect} from './passives/stats/passive-equipment-stats-doublehand-glex-increase-effect.model';
import {PassiveMpCostDecreaseEffect} from './passives/passive-mp-cost-decrease-effect.model';
import {PassiveElementsResistanceEffect} from './passives/passive-elements-resistance-effect.model';
import {PassiveAilmentsResistanceEffect} from './passives/passive-ailments-resistance-effect.model';
import {PassiveKillerDamageIncreaseEffect} from './passives/passive-killer-damage-increase-effect.model';
import {PassiveSkillBattleStartActivationEffect} from './passives/skill/passive-skill-battle-start-activation-effect.model';
import {PassiveSkillCounterAttackActivationEffect} from './passives/skill/passive-skill-counter-attack-activation-effect.model';

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
      case 13:
        return new PassiveEquipmentStatsDoublehandIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 35:
        return new PassiveSkillBattleStartActivationEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 49:
      case 50:
        return new PassiveSkillCounterAttackActivationEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 56:
        return new PassiveSkillBattleStartActivationEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 69:
        return new PassiveEquipmentStatsDualwieldIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 70:
        return new PassiveEquipmentStatsDoublehandIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 77:
        return new PassiveMpCostDecreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 84:
        return new PassiveChainBaseModifierIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 85:
        return new PassiveChainBaseModifierIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 89:
        return new PassiveStatsIncreaseFixedEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 10003:
        return new PassiveEquipmentStatsDoublehandGlexIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      default:
        return null;
    }
  }
}
