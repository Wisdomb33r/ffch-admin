import {SkillEffect} from './skill-effect.model';
import {AbilityDamagesPhysicalEffect} from './abilities/ability-damages-physical-effect.model';
import {AbilityDamagesMagicEffect} from './abilities/ability-damages-magic-effect.model';
import {AbilityDamagesHybridEffect} from './abilities/ability-damages-hybrid-effect.model';
import {AbilityDamagesEvokerEffect} from './abilities/ability-damages-evoker-effect.model';
import {AbilityDamagesPhysicalIgnoreDefEffect} from './abilities/ability-damages-physical-ignore-def-effect.model';

export class SkillEffectFactory {
  public static getSkillEffect(effectRaw): SkillEffect {
    switch (effectRaw[2]) {
      case 1:
        return new AbilityDamagesPhysicalEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 15:
        return new AbilityDamagesMagicEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 21:
        return new AbilityDamagesPhysicalIgnoreDefEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 40:
        return new AbilityDamagesHybridEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      case 124:
        return new AbilityDamagesEvokerEffect(effectRaw[0], effectRaw[1], effectRaw[2], effectRaw[3]);
      default:
        return null;
    }
  }
}
