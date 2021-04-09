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
import {AbilityZombieCureEffect} from './abilities/ability-zombie-cure-effect.model';
import {AbilityElementDamageIncreaseEffect} from './abilities/ability-element-damage-increase-effect.model';
import {AbilityMitigationMonsterTypeEffect} from './abilities/ability-mitigation-monster-type-effect.model';
import {AbilitySkillCooldownEffect} from './abilities/skill/ability-skill-cooldown-effect.model';
import {AbilitySkillSwitchEffect} from './abilities/skill/ability-skill-switch-effect.model';
import {AbilitySkillMagnusEffect} from './abilities/skill/ability-skill-magnus-effect.model';
import {AbilitySkillDelayedEffect} from './abilities/skill/ability-skill-delayed-effect.model';
import {AbilityDamagePhysicalIncreasedBreakEffect} from './abilities/damage/ability-damage-physical-increased-break-effect.model';
import {AbilityDamagePhysicalIncreasedModifierEnemyTypeEffect} from './abilities/damage/ability-damage-physical-increased-modifier-enemy-type-effect.model';
import {AbilitySkillActivationEffect} from './abilities/skill/ability-skill-activation-effect.model';
import {AbilitySkillRandomEffect} from './abilities/skill/ability-skill-random-effect.model';
import {AbilityWeaponTypeWielderDamageIncreaseEffect} from './abilities/ability-weapon-type-wielder-damage-increase-effect.model';
import {AbilitySkillMagnusGlexEffect} from './abilities/skill/ability-skill-magnus-glex-effect.model';
import {AbilityDebuffsResistanceEffect} from './abilities/ability-debuffs-resistance-effect.model';
import {AbilitySkillTagTeamAttackActivationEffect} from './abilities/skill/ability-skill-tag-team-attack-activation-effect.model';
import {AbilityCoversEffect} from './abilities/ability-covers-effect.model';
import {AbilityDeathInflictionEffect} from './abilities/ability-death-infliction-effect.model';
import {AbilityAccuracyIncreaseEffect} from './abilities/ability-accuracy-increase-effect.model';
import {AbilityGilStealEffect} from './abilities/ability-gil-steal-effect.model';
import {AbilityKillerDamageIncreaseEffect} from './abilities/ability-killer-damage-increase-effect.model';

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
      case 22:
        return new AbilityDamagePhysicalIncreasedModifierEnemyTypeEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 25:
        return new AbilityDamageDrainEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 29:
        return new AbilitySkillRandomEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 35:
        return new AbilityDeathInflictionEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
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
      case 76:
        return new AbilityGilStealEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 81:
        return new AbilityDamagePhysicalHpSacrificeEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 89:
        return new AbilityDebuffsResistanceEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 92:
      case 93:
        return new AbilityKillerDamageIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 96:
        return new AbilityCoversEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 99:
        return new AbilitySkillSwitchEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 100:
        return new AbilitySkillActivationEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 102:
        return new AbilityDamagePhysicalDefScalingEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 103:
        return new AbilityDamageMagicSprScalingEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 112:
      case 113:
        return new AbilityDamageOrDeathEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 124:
        return new AbilityDamageEvokerEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 126:
        return new AbilityDamagePhysicalConsecutiveIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 130:
        return new AbilitySkillCooldownEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 132:
        return new AbilitySkillDelayedEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 134:
        return new AbilityDamagePhysicalJumpDelayEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 139:
        return new AbilityDamageDotsEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 149:
        return new AbilityElementDamageIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 148:
        return new AbilityZombieCureEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 153:
      case 154:
        return new AbilityMitigationMonsterTypeEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 157:
        return new AbilitySkillMagnusEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 159:
        return new AbilityDamagePhysicalIncreasedBreakEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 162:
        return new AbilityAccuracyIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 163:
        return new AbilityWeaponTypeWielderDamageIncreaseEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 165:
        return new AbilitySkillTagTeamAttackActivationEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 1012:
        return new AbilityDamageHexEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 1014:
        return new AbilitySkillMagnusGlexEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      default:
        return null;
    }
  }
}
