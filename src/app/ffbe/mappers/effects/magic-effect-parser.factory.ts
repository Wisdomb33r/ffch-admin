import {EffectParser} from './effect-parser';
import {UnknownEffectParser} from './unknown-effect-parser';
import {AbilityHealingTurnSplitParser} from './abilities/ability-healing-turn-split.parser';
import {AbilityHealingParser} from './abilities/ability-healing.parser';
import {AbilityDamagesMagicSprScalingParser} from './abilities/ability-damages-magic-spr-scaling.parser';
import {AbilityDamagesMagicParser} from './abilities/ability-damages-magic.parser';
import {AbilityDamagesMagicConsecutiveIncreaseParser} from './abilities/ability-damages-magic-consecutive-increase.parser';
import {AbilityDamagesDrainParser} from './abilities/ability-damages-drain.parser';
import {AbilityDamagesMagicIgnoreSprParser} from './abilities/ability-damages-magic-ignore-spr.parser';
import {AbilityDamagesPercentParser} from './abilities/ability-damages-percent.parser';

export class MagicEffectParserFactory {
  public static getParser(effectId1: number, effectId2: number, effectId3: number): EffectParser {
    switch (effectId3) {
      case 2:
        return new AbilityHealingParser();
      case 8:
        return new AbilityHealingTurnSplitParser();
      case 9:
        return new AbilityDamagesPercentParser();
      case 10:
        return new AbilityDamagesDrainParser();
      case 15:
        return new AbilityDamagesMagicParser();
      case 70:
        return new AbilityDamagesMagicIgnoreSprParser();
      case 72:
        return new AbilityDamagesMagicConsecutiveIncreaseParser();
      case 103:
        return new AbilityDamagesMagicSprScalingParser();
      default:
        return new UnknownEffectParser();
    }
  }
}