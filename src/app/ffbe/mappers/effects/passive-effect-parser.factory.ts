import {EffectParser} from './effect-parser';
import {UnknownEffectParser} from './unknown-effect-parser';
import {PassiveStatsIncreaseHpThresholdParser} from './passives/passive-stats-increase-hp-threshold.parser';
import {PassiveMpRecoveryParser} from './passives/passive-mp-recovery.parser';
import {PassiveCounterAttackChanceParser} from './passives/passive-counter-attack-chance.parser';
import {PassiveMpDecreaseForSongsParser} from './passives/passive-mp-decrease-for-songs.parser';
import {PassiveSkillMultipleActivationParser} from './passives/passive-skill-multiple-activation.parser';
import {PassiveSkillTurnStartActivationParser} from './passives/passive-skill-turn-start-activation.parser';
import {PassiveDeceivesDeathParser} from './passives/passive-deceives-death.parser';
import {PassiveStatsIncreaseUnarmedParser} from './passives/passive-stats-increase-unarmed.parser';
import {PassiveNormalAttacksMultipleStrikesParser} from './passives/passive-normal-attacks-multiple-strikes.parser';
import {PassiveItemsDropRateParser} from './passives/passive-items-drop-rate.parser';
import {PassiveGilsRateParser} from './passives/passive-gils-rate.parser';
import {PassiveExperienceRateParser} from './passives/passive-experience-rate.parser';
import {PassiveCombatRateDecreaseParser} from './passives/passive-combat-rate-decrease.parser';
import {PassiveSkillAliveAllyActivationParser} from './passives/passive-skill-alive-ally-activation.parser';
import {PassiveItemsHealingPotencyIncreaseParser} from './passives/passive-items-healing-potency-increase.parser';
import {PassiveExplorationStepRegenParser} from './passives/passive-exploration-step-regen.parser';
import {PassiveGilsWhileStealingParser} from './passives/passive-gils-while-stealing.parser';
import {PassiveItemsStealRateParser} from './passives/passive-items-steal-rate.parser';
import {AbilityMagicMultipleActivationParser} from './abilities/ability-magic-multiple-activation.parser';
import {PassiveMpAbsorbParser} from './passives/passive-mp-absorb.parser';
import {PassiveAilmentsCureAfterBattleParser} from './passives/passive-ailments-cure-after-battle.parser';

export class PassiveEffectParserFactory {
  public static getParser(effectId1: number, effectId2: number, effectId3: number): EffectParser {
    switch (effectId3) {
      case 4:
        return new PassiveStatsIncreaseHpThresholdParser();
      case 9:
        return new PassiveItemsHealingPotencyIncreaseParser();
      case 16:
        return new PassiveItemsStealRateParser();
      case 18:
        return new PassiveAilmentsCureAfterBattleParser();
      case 19:
        return new PassiveStatsIncreaseUnarmedParser();
      case 20:
        return new PassiveCounterAttackChanceParser();
      case 29:
        return new PassiveExplorationStepRegenParser();
      case 30:
        return new PassiveMpAbsorbParser();
      case 32:
        return new PassiveMpRecoveryParser();
      case 37:
        return new PassiveGilsRateParser();
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
      case 51:
        return new PassiveDeceivesDeathParser();
      case 52:
        return new AbilityMagicMultipleActivationParser();
      case 53:
        return new PassiveSkillMultipleActivationParser();
      case 66:
        return new PassiveSkillTurnStartActivationParser();
      case 10002:
        return new PassiveSkillAliveAllyActivationParser();
      case 10006:
        return new PassiveStatsIncreaseHpThresholdParser();
      default:
        return new UnknownEffectParser();
    }
  }
}
