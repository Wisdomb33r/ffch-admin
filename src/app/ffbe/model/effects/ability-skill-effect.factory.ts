import {SkillEffect} from './skill-effect.model';
import {AbilityDamagePhysicalEffect} from './abilities/damage/ability-damage-physical-effect.model';
import {AbilityDamageMagicEffect} from './abilities/damage/ability-damage-magic-effect.model';
import {AbilityDamageHybridEffect} from './abilities/damage/ability-damage-hybrid-effect.model';
import {AbilityDamageEvokerEffect} from './abilities/damage/ability-damage-evoker-effect.model';
import {AbilityDamagePhysicalIgnoreDefEffect} from './abilities/damage/ability-damage-physical-ignore-def-effect.model';
import {AbilityDamagePhysicalConsecutiveIncreaseEffect} from './abilities/damage/ability-damage-physical-consecutive-increase-effect.model';
import {AbilityDamageMagicConsecutiveIncreaseEffect} from './abilities/damage/ability-damage-magic-consecutive-increase-effect.model';
import {AbilityDamageMagicIgnoreSprEffect} from './abilities/damage/ability-damage-magic-ignore-spr-effect.model';
import {AbilityDamageMagicSprScalingEffect} from './abilities/damage/ability-damage-magic-spr-scaling-effect.model';
import {AbilityDamagePhysicalCriticalHitEffect} from './abilities/damage/ability-damage-physical-critical-hit-effect.model';
import {AbilityDamagePhysicalDefScalingEffect} from './abilities/damage/ability-damage-physical-def-scaling-effect.model';
import {AbilityDamagePercentEffect} from './abilities/damage/ability-damage-percent-effect.model';
import {AbilityDamageOrDeathEffect} from './abilities/damage/ability-damage-or-death-effect.model';
import {AbilityDamagePhysicalTurnDelayEffect} from './abilities/damage/ability-damage-physical-turn-delay-effect.model';
import {AbilityDamagePhysicalJumpDelayEffect} from './abilities/damage/ability-damage-physical-jump-delay-effect.model';
import {AbilityDamagePhysicalComboEffect} from './abilities/damage/ability-damage-physical-combo-effect.model';
import {AbilityDamagePhysicalHpSacrificeEffect} from './abilities/damage/ability-damage-physical-hp-sacrifice-effect.model';
import {AbilityDamageDotsEffect} from './abilities/damage/ability-damage-dots-effect.model';
import {AbilityDamageDrainEffect} from './abilities/damage/ability-damage-drain-effect.model';
import {AbilityDamageFixedEffect} from './abilities/damage/ability-damage-fixed-effect.model';
import {AbilityDamageHexEffect} from './abilities/damage/ability-damage-hex-effect.model';
import {AbilityElementDamageIncreaseEffect} from './abilities/ability-element-damage-increase-effect.model';
import {AbilityMitigationMonsterTypeEffect} from './abilities/ability-mitigation-monster-type-effect.model';
import {AbilityCooldownEffect} from './abilities/ability-cooldown-effect.model';
import {AbilitySkillSwitchEffect} from './abilities/ability-skill-switch-effect.model';

export class AbilitySkillEffectFactory {
  public static getSkillEffect(effectRaw): SkillEffect {
    switch (effectRaw[2]) {
      case 1:
        return new AbilityDamagePhysicalEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 9:
        return new AbilityDamagePercentEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 10:
        return new AbilityDamageDrainEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 13:
        return new AbilityDamagePhysicalTurnDelayEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 15:
        return new AbilityDamageMagicEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 21:
        return new AbilityDamagePhysicalIgnoreDefEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 25:
        return new AbilityDamageDrainEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 40:
        return new AbilityDamageHybridEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 41:
        return new AbilityDamageFixedEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 42:
        return new AbilityDamagePhysicalComboEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 43:
        return new AbilityDamagePhysicalCriticalHitEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 52:
        if (effectRaw[0] === 0) {
        } else {
          return new AbilityDamagePhysicalJumpDelayEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
        }
        break;
      case 70:
        return new AbilityDamageMagicIgnoreSprEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 72:
        return new AbilityDamageMagicConsecutiveIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 81:
        return new AbilityDamagePhysicalHpSacrificeEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 99:
        return new AbilitySkillSwitchEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 102:
        return new AbilityDamagePhysicalDefScalingEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 103:
        return new AbilityDamageMagicSprScalingEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 112:
        return new AbilityDamageOrDeathEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 124:
        return new AbilityDamageEvokerEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 126:
        return new AbilityDamagePhysicalConsecutiveIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 130:
        return new AbilityCooldownEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 134:
        return new AbilityDamagePhysicalJumpDelayEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 139:
        return new AbilityDamageDotsEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 149:
      case 150:
        return new AbilityMitigationMonsterTypeEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 153:
      case 154:
        return new AbilityElementDamageIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 1012:
        return new AbilityDamageHexEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      default:
        return null;
    }
  }
}
