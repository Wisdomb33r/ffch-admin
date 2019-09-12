import {EffectParser} from './effect-parser';
import {PassiveStatsIncreaseParser} from './passives/passive-stats-increase.parser';
import {UnknownEffectParser} from './unknown-effect-parser';
import {PassiveEsperDamageIncreaseParser} from './passives/passive-esper-damage-increase.parser';
import {PassiveEquipmentCategoryUnlockParser} from './passives/passive-equipment-category-unlock.parser';
import {PassiveAilmentsResistanceParser} from './passives/passive-ailments-resistance.parser';
import {PassiveElementsResistanceParser} from './passives/passive-elements-resistance.parser';
import {PassiveStatsIncreaseHpThresholdParser} from './passives/passive-stats-increase-hp-threshold.parser';
import {PassiveStatsIncreaseWearingEquipmentCategoryParser} from './passives/passive-stats-increase-wearing-equipment-category.parser';
import {PassiveAllyCoverParser} from './passives/passive-ally-cover.parser';
import {PassiveMpRecoveryParser} from './passives/passive-mp-recovery.parser';
import {PassiveBattleStartSkillActivationParser} from './passives/passive-battle-start-skill-activation.parser';
import {PassiveLbPerTurnParser} from './passives/passive-lb-per-turn.parser';
import {PassiveEquipmentStatsDoublehandIncreaseParser} from './passives/passive-equipment-stats-doublehand-increase.parser';
import {PassiveEquipmentStatsDualwieldIncreaseParser} from './passives/passive-equipment-stats-dualwield-increase.parser';
import {PassivePhysicalEvasionParser} from './passives/passive-physical-evasion.parser';
import {PassiveLbDamageIncreaseParser} from './passives/passive-lb-damage-increase.parser';
import {PassiveTargetChanceChangesParser} from './passives/passive-target-chance-changes.parser';
import {PassiveLbSpeedIncreaseParser} from './passives/passive-lb-speed-increase.parser';
import {PassiveDualWieldWeaponCategoryUnlockParser} from './passives/passive-dual-wield-weapon-category-unlock.parser';
import {PassiveDebuffsResistanceParser} from './passives/passive-debuffs-resistance.parser';
import {PassiveGroupEsperSummonParser} from './passives/passive-group-esper-summon.parser';
import {PassiveKillerDamageIncreaseParser} from './passives/passive-killer-damage-increase.parser';
import {PassiveJumpDamageIncreaseParser} from './passives/passive-jump-damage-increase.parser';
import {PassiveSkillModifierIncreaseParser} from './passives/passive-skill-modifier-increase.parser';

const PARSERS: Array<{ key: string, parser: EffectParser }> = [
  {key: '0-3-1', parser: new PassiveStatsIncreaseParser()},
  {key: '1-3-1', parser: new PassiveStatsIncreaseParser()},
  {key: '0-3-2', parser: new PassiveAilmentsResistanceParser()},
  {key: '1-3-2', parser: new PassiveAilmentsResistanceParser()},
  {key: '0-3-3', parser: new PassiveElementsResistanceParser()},
  {key: '1-3-3', parser: new PassiveElementsResistanceParser()},
  {key: '0-3-4', parser: new PassiveStatsIncreaseHpThresholdParser()},
  {key: '1-3-4', parser: new PassiveStatsIncreaseHpThresholdParser()},
  {key: '0-3-5', parser: new PassiveEquipmentCategoryUnlockParser()},
  {key: '1-3-5', parser: new PassiveEquipmentCategoryUnlockParser()},
  {key: '0-3-6', parser: new PassiveStatsIncreaseWearingEquipmentCategoryParser()},
  {key: '1-3-6', parser: new PassiveStatsIncreaseWearingEquipmentCategoryParser()},
  {key: '1-2-8', parser: new PassiveAllyCoverParser()},
  {key: '1-1-11', parser: new PassiveKillerDamageIncreaseParser()},
  {key: '0-3-11', parser: new PassiveKillerDamageIncreaseParser()},
  {key: '1-3-11', parser: new PassiveKillerDamageIncreaseParser()},
  {key: '0-3-13', parser: new PassiveEquipmentStatsDoublehandIncreaseParser()},
  {key: '1-3-13', parser: new PassiveEquipmentStatsDoublehandIncreaseParser()},
  {key: '0-3-14', parser: new PassiveDualWieldWeaponCategoryUnlockParser()},
  {key: '1-3-14', parser: new PassiveDualWieldWeaponCategoryUnlockParser()},
  {key: '0-3-17', parser: new PassiveJumpDamageIncreaseParser()},
  {key: '1-3-17', parser: new PassiveJumpDamageIncreaseParser()},
  {key: '0-3-21', parser: new PassiveEsperDamageIncreaseParser()},
  {key: '1-3-21', parser: new PassiveEsperDamageIncreaseParser()},
  {key: '0-3-22', parser: new PassivePhysicalEvasionParser()},
  {key: '1-3-22', parser: new PassivePhysicalEvasionParser()},
  {key: '0-3-24', parser: new PassiveTargetChanceChangesParser()},
  {key: '1-3-24', parser: new PassiveTargetChanceChangesParser()},
  {key: '0-3-25', parser: new PassiveTargetChanceChangesParser()},
  {key: '1-3-25', parser: new PassiveTargetChanceChangesParser()},
  {key: '0-3-31', parser: new PassiveLbSpeedIncreaseParser()},
  {key: '1-3-31', parser: new PassiveLbSpeedIncreaseParser()},
  {key: '0-3-32', parser: new PassiveMpRecoveryParser()},
  {key: '1-3-32', parser: new PassiveMpRecoveryParser()},
  {key: '0-3-33', parser: new PassiveLbPerTurnParser()},
  {key: '1-3-33', parser: new PassiveLbPerTurnParser()},
  {key: '0-3-35', parser: new PassiveBattleStartSkillActivationParser()},
  {key: '1-3-35', parser: new PassiveBattleStartSkillActivationParser()},
  {key: '2-1-35', parser: new PassiveBattleStartSkillActivationParser()},
  {key: '0-3-55', parser: new PassiveDebuffsResistanceParser()},
  {key: '1-3-55', parser: new PassiveDebuffsResistanceParser()},
  {key: '0-3-56', parser: new PassiveBattleStartSkillActivationParser()},
  {key: '1-3-56', parser: new PassiveBattleStartSkillActivationParser()},
  {key: '0-3-61', parser: new PassiveGroupEsperSummonParser()},
  {key: '0-3-68', parser: new PassiveLbDamageIncreaseParser()},
  {key: '1-3-68', parser: new PassiveLbDamageIncreaseParser()},
  {key: '0-3-69', parser: new PassiveEquipmentStatsDualwieldIncreaseParser()},
  {key: '1-3-69', parser: new PassiveEquipmentStatsDualwieldIncreaseParser()},
  {key: '--69', parser: new PassiveEquipmentStatsDualwieldIncreaseParser()}, // wtf is this ? bugged config
  {key: '0-3-70', parser: new PassiveEquipmentStatsDoublehandIncreaseParser()},
  {key: '0-3-73', parser: new PassiveSkillModifierIncreaseParser()},
  {key: '1-3-73', parser: new PassiveSkillModifierIncreaseParser()},
];

export class PassiveEffectParserFactory {
  public static getParser(effectId1: number, effectId2: number, effectId3: number): EffectParser {
    const parserItem = PARSERS.find(val => val.key === effectId1 + '-' + effectId2 + '-' + effectId3);
    if (parserItem) {
      return parserItem.parser;
    }
    return new UnknownEffectParser();
  }
}
