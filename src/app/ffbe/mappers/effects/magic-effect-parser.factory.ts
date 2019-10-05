import {EffectParser} from './effect-parser';
import {UnknownEffectParser} from './unknown-effect-parser';
import {AbilityHealingTurnSplitParser} from './abilities/ability-healing-turn-split.parser';
import {AbilityHealingParser} from './abilities/ability-healing.parser';
import {AbilityDamagesMagicSprScalingParser} from './abilities/ability-damages-magic-spr-scaling.parser';

export class MagicEffectParserFactory {
  public static getParser(effectId1: number, effectId2: number, effectId3: number): EffectParser {
    switch (effectId3) {
      case 2:
        return new AbilityHealingParser();
      case 8:
        return new AbilityHealingTurnSplitParser();
      case 103:
        return new AbilityDamagesMagicSprScalingParser();
      default:
        return new UnknownEffectParser();
    }
  }
}
