import {EffectParser} from '../effect-parser';
import {UnknownEffectParser} from '../unknown-effect-parser';
import {AbilityStatsModificationParser} from './ability-stats-modification.parser';
import {AbilityElementResistancesParser} from './ability-element-resistances.parser';
import {AbilityAilmentsInflictionParser} from './ability-ailments-infliction.parser';
import {AbilityAilmentsResistanceParser} from './ability-ailments-resistance.parser';
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

export class AbilityEffectParserFactory {
  public static getParser(effectId1: number, effectId2: number, effectId3: number): EffectParser {
    switch (effectId3) {
      case 1:
        return new AbilityDamagesPhysicalParser();
      case 3:
        return new AbilityStatsModificationParser();
      case 6:
        return new AbilityAilmentsInflictionParser();
      case 7:
        return new AbilityAilmentsResistanceParser();
      case 10:
        return new AbilityDamagesDrainParser();
      case 13:
        return new AbilityDamagesPhysicalTurnDelayParser();
      case 15:
        return new AbilityDamagesMagicParser();
      case 21:
        return new AbilityDamagesPhysicalIgnoreDefParser();
      case 24:
        return new AbilityStatsModificationParser();
      case 25:
        return new AbilityDamagesDrainParser();
      case 33:
        return new AbilityElementResistancesParser();
      case 40:
        return new AbilityDamagesHybridParser();
      case 42:
        return new AbilityDamagesPhysicalComboParser();
      case 53:
        return new AbilitySkillMultipleActivationParser();
      case 70:
        return new AbilityDamagesMagicIgnoreSprParser();
      case 72:
        return new AbilityDamagesMagicConsecutiveIncreaseParser();
      case 81:
        return new AbilityDamagesPhysicalHpSacrificeParser();
      case 98:
        return new AbilitySkillMultipleActivationParser();
      case 130:
        return new AbilityCooldownParser();
      case 136:
        return new AbilitySkillModifierIncreaseParser();
      default:
        return new UnknownEffectParser();
    }
  }
}
