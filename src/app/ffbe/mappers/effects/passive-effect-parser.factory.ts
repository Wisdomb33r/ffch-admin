import {EffectParser} from './effect-parser';
import {UnknownEffectParser} from './unknown-effect-parser';
import {PassiveStatsIncreaseHpThresholdParser} from './passives/passive-stats-increase-hp-threshold.parser';
import {PassiveCounterAttackChanceParser} from './passives/passive-counter-attack-chance.parser';
import {PassiveSkillTurnStartActivationParser} from './passives/passive-skill-turn-start-activation.parser';
import {PassiveDeceivesDeathParser} from './passives/passive-deceives-death.parser';
import {PassiveStatsIncreaseUnarmedParser} from './passives/passive-stats-increase-unarmed.parser';
import {PassiveNormalAttacksMultipleStrikesParser} from './passives/passive-normal-attacks-multiple-strikes.parser';
import {PassiveSkillAliveAllyActivationParser} from './passives/passive-skill-alive-ally-activation.parser';
import {AbilityMagicMultipleActivationParser} from './abilities/ability-magic-multiple-activation.parser';
import {PassiveAilmentsCureAfterBattleParser} from './passives/passive-ailments-cure-after-battle.parser';

export class PassiveEffectParserFactory {
  public static getParser(effectId1: number, effectId2: number, effectId3: number): EffectParser {
    switch (effectId3) {
      case 4:
        return new PassiveStatsIncreaseHpThresholdParser();
      case 18:
        return new PassiveAilmentsCureAfterBattleParser();
      case 19:
        return new PassiveStatsIncreaseUnarmedParser();
      case 20:
        return new PassiveCounterAttackChanceParser();
      case 44:
        return new PassiveNormalAttacksMultipleStrikesParser();
      case 51:
        return new PassiveDeceivesDeathParser();
      case 52:
        return new AbilityMagicMultipleActivationParser();
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
