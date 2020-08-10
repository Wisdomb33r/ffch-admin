import {SkillEffect} from './skill-effect.model';
import {AbilityDamagesPhysicalEffect} from './abilities/ability-damages-physical-effect.model';
import {AbilityDamagesMagicEffect} from './abilities/ability-damages-magic-effect.model';
import {AbilityDamagesHybridEffect} from './abilities/ability-damages-hybrid-effect.model';
import {AbilityDamagesEvokerEffect} from './abilities/ability-damages-evoker-effect.model';
import {AbilityDamagesPhysicalIgnoreDefEffect} from './abilities/ability-damages-physical-ignore-def-effect.model';
import {AbilityDamagesPhysicalConsecutiveIncreaseEffect} from './abilities/ability-damages-physical-consecutive-increase-effect.model';
import {AbilityDamagesMagicConsecutiveIncreaseEffect} from './abilities/ability-damages-magic-consecutive-increase-effect.model';
import {AbilityDamagesMagicIgnoreSprEffect} from './abilities/ability-damages-magic-ignore-spr-effect.model';
import {AbilityDamagesMagicSprScalingEffect} from './abilities/ability-damages-magic-spr-scaling-effect.model';
import {AbilityDamagesPhysicalCriticalHitEffect} from './abilities/ability-damages-physical-critical-hit-effect.model';
import {AbilityDamagesPhysicalDefScalingEffect} from './abilities/ability-damages-physical-def-scaling-effect.model';
import {AbilityDamagesPercentEffect} from './abilities/ability-damages-percent-effect.model';
import {AbilityDamagesOrDeathEffect} from './abilities/ability-damages-or-death-effect.model';
import {AbilityDamagesPhysicalTurnDelayEffect} from './abilities/ability-damages-physical-turn-delay-effect.model';
import {AbilityDamagesPhysicalJumpDelayEffect} from './abilities/ability-damages-physical-jump-delay-effect.model';
import {AbilityDamagesPhysicalComboEffect} from './abilities/ability-damages-physical-combo-effect.model';
import {AbilityDamagesPhysicalHpSacrificeEffect} from './abilities/ability-damages-physical-hp-sacrifice-effect.model';
import {AbilityDamagesDotsEffect} from './abilities/ability-damages-dots-effect.model';
import {AbilityDamagesDrainEffect} from './abilities/ability-damages-drain-effect.model';
import {AbilityDamagesFixedEffect} from './abilities/ability-damages-fixed-effect.model';
import {AbilityDamagesHexEffect} from './abilities/ability-damages-hex-effect.model';
import {AbilityElementDamageIncreaseEffect} from './abilities/ability-element-damage-increase-effect.model';
import {AbilityMitigationMonsterTypeEffect} from './abilities/ability-mitigation-monster-type-effect.model';

export class SkillEffectFactory {
  public static getSkillEffect(effectRaw): SkillEffect {
    switch (effectRaw[2]) {
      case 1:
        return new AbilityDamagesPhysicalEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 9:
        return new AbilityDamagesPercentEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 10:
        return new AbilityDamagesDrainEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 13:
        return new AbilityDamagesPhysicalTurnDelayEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 15:
        return new AbilityDamagesMagicEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 21:
        return new AbilityDamagesPhysicalIgnoreDefEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 25:
        return new AbilityDamagesDrainEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 40:
        return new AbilityDamagesHybridEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 41:
        return new AbilityDamagesFixedEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 42:
        return new AbilityDamagesPhysicalComboEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 43:
        return new AbilityDamagesPhysicalCriticalHitEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 52:
        if (effectRaw[0] === 0) {
        } else {
          return new AbilityDamagesPhysicalJumpDelayEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
        }
        break;
      case 70:
        return new AbilityDamagesMagicIgnoreSprEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 72:
        return new AbilityDamagesMagicConsecutiveIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 81:
        return new AbilityDamagesPhysicalHpSacrificeEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 102:
        return new AbilityDamagesPhysicalDefScalingEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 103:
        return new AbilityDamagesMagicSprScalingEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 112:
        return new AbilityDamagesOrDeathEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 124:
        return new AbilityDamagesEvokerEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 126:
        return new AbilityDamagesPhysicalConsecutiveIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 134:
        return new AbilityDamagesPhysicalJumpDelayEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 139:
        return new AbilityDamagesDotsEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 149:
      case 150:
        return new AbilityMitigationMonsterTypeEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 153:
      case 154:
        return new AbilityElementDamageIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 1012:
        return new AbilityDamagesHexEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      default:
        return null;
    }
  }
}
