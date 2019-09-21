import {EffectParser} from './effect-parser';
import {PassiveStatsIncreaseParser} from './passives/passive-stats-increase.parser';
import {UnknownEffectParser} from './unknown-effect-parser';
import {PassiveEsperDamageIncreaseParser} from './passives/passive-esper-damage-increase.parser';
import {PassiveEquipmentCategoryUnlockParser} from './passives/passive-equipment-category-unlock.parser';
import {PassiveAilmentsResistanceParser} from './passives/passive-ailments-resistance.parser';
import {PassiveElementsResistanceParser} from './passives/passive-elements-resistance.parser';
import {PassiveStatsIncreaseHpThresholdParser} from './passives/passive-stats-increase-hp-threshold.parser';
import {PassiveEquipmentCategoryStatsIncreaseParser} from './passives/passive-equipment-category-stats-increase.parser';
import {PassiveCoverParser} from './passives/passive-cover.parser';
import {PassiveMpRecoveryParser} from './passives/passive-mp-recovery.parser';
import {PassiveSkillBattleStartActivationParser} from './passives/passive-skill-battle-start-activation.parser';
import {PassiveLbPerTurnParser} from './passives/passive-lb-per-turn.parser';
import {PassiveEquipmentStatsDoublehandIncreaseParser} from './passives/passive-equipment-stats-doublehand-increase.parser';
import {PassiveEquipmentStatsDualwieldIncreaseParser} from './passives/passive-equipment-stats-dualwield-increase.parser';
import {PassiveEvasionPhysicalParser} from './passives/passive-evasion-physical.parser';
import {PassiveLbDamageIncreaseParser} from './passives/passive-lb-damage-increase.parser';
import {PassiveTargetChanceChangesParser} from './passives/passive-target-chance-changes.parser';
import {PassiveLbSpeedIncreaseParser} from './passives/passive-lb-speed-increase.parser';
import {PassiveDualWieldWeaponCategoryUnlockParser} from './passives/passive-dual-wield-weapon-category-unlock.parser';
import {PassiveDebuffsResistanceParser} from './passives/passive-debuffs-resistance.parser';
import {PassiveEsperGroupSummonParser} from './passives/passive-esper-group-summon.parser';
import {PassiveKillerDamageIncreaseParser} from './passives/passive-killer-damage-increase.parser';
import {PassiveJumpDamageIncreaseParser} from './passives/passive-jump-damage-increase.parser';
import {PassiveSkillModifierIncreaseParser} from './passives/passive-skill-modifier-increase.parser';
import {PassiveEquipmentCategoryKillerDamageIncreaseParser} from './passives/passive-equipment-category-killer-damage-increase.parser';
import {PassiveLbUpgradeParser} from './passives/passive-lb-upgrade.parser';
import {PassiveLbUpgradeHpThresholdParser} from './passives/passive-lb-upgrade-hp-threshold.parser';
import {PassiveEsperStatsIncreaseParser} from './passives/passive-esper-stats-increase.parser';
import {PassiveCounterAttackChanceParser} from './passives/passive-counter-attack-chance.parser';
import {PassiveCounterAttackWithSkillParser} from './passives/passive-counter-attack-with-skill.parser';
import {PassiveEsperSummonDamageIncreaseParser} from './passives/passive-esper-summon-damage-increase.parser';
import {PassiveMpDecreaseForSongsParser} from './passives/passive-mp-decrease-for-songs.parser';
import {PassiveEvasionMagicalParser} from './passives/passive-evasion-magical.parser';
import {PassiveSkillMultipleActivationParser} from './passives/passive-skill-multiple-activation.parser';
import {PassiveEquipmentStatsIncreaseParser} from './passives/passive-equipment-stats-increase.parser';
import {PassiveSkillTurnStartActivationParser} from './passives/passive-skill-turn-start-activation.parser';
import {PassiveEquipmentStatsDoublehandGlexIncreaseParser} from './passives/passive-equipment-stats-doublehand-glex-increase.parser';
import {PassiveEquipmentWeaponElementStatsIncreaseParser} from './passives/passive-equipment-weapon-element-stats-increase.parser';
import {PassiveDualWieldDamageCapParser} from './passives/passive-dual-wield-damage-cap.parser';
import {PassiveDeceivesDeathParser} from './passives/passive-deceives-death.parser';
import {PassiveCounterAttackParser} from './passives/passive-counter-attack.parser';
import {PassiveElementsAbsorbParser} from './passives/passive-elements-absorb.parser';
import {PassiveStatsIncreaseUnarmedParser} from './passives/passive-stats-increase-unarmed.parser';

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
  {key: '0-3-6', parser: new PassiveEquipmentCategoryStatsIncreaseParser()},
  {key: '1-3-6', parser: new PassiveEquipmentCategoryStatsIncreaseParser()},
  {key: '1-2-8', parser: new PassiveCoverParser()},
  {key: '1-1-11', parser: new PassiveKillerDamageIncreaseParser()},
  {key: '0-3-11', parser: new PassiveKillerDamageIncreaseParser()},
  {key: '1-3-11', parser: new PassiveKillerDamageIncreaseParser()},
  {key: '0-3-12', parser: new PassiveCounterAttackParser()},
  {key: '1-3-12', parser: new PassiveCounterAttackParser()},
  {key: '0-3-13', parser: new PassiveEquipmentStatsDoublehandIncreaseParser()},
  {key: '1-3-13', parser: new PassiveEquipmentStatsDoublehandIncreaseParser()},
  {key: '0-3-14', parser: new PassiveDualWieldWeaponCategoryUnlockParser()},
  {key: '1-3-14', parser: new PassiveDualWieldWeaponCategoryUnlockParser()},
  {key: '0-3-17', parser: new PassiveJumpDamageIncreaseParser()},
  {key: '1-3-17', parser: new PassiveJumpDamageIncreaseParser()},
  {key: '0-3-19', parser: new PassiveStatsIncreaseUnarmedParser()},
  {key: '1-3-19', parser: new PassiveStatsIncreaseUnarmedParser()},
  {key: '0-3-20', parser: new PassiveCounterAttackChanceParser()},
  {key: '1-3-20', parser: new PassiveCounterAttackChanceParser()},
  {key: '0-3-21', parser: new PassiveEsperDamageIncreaseParser()},
  {key: '1-3-21', parser: new PassiveEsperDamageIncreaseParser()},
  {key: '0-3-22', parser: new PassiveEvasionPhysicalParser()},
  {key: '1-3-22', parser: new PassiveEvasionPhysicalParser()},
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
  {key: '0-3-35', parser: new PassiveSkillBattleStartActivationParser()},
  {key: '1-3-35', parser: new PassiveSkillBattleStartActivationParser()},
  {key: '2-1-35', parser: new PassiveSkillBattleStartActivationParser()},
  {key: '0-3-41', parser: new PassiveCounterAttackParser()},
  {key: '1-3-41', parser: new PassiveCounterAttackParser()},
  {key: '0-3-42', parser: new PassiveElementsAbsorbParser()},
  {key: '0-3-48', parser: new PassiveMpDecreaseForSongsParser()},
  {key: '1-3-48', parser: new PassiveMpDecreaseForSongsParser()},
  {key: '0-3-49', parser: new PassiveCounterAttackWithSkillParser()},
  {key: '1-3-49', parser: new PassiveCounterAttackWithSkillParser()},
  {key: '1-1-49', parser: new PassiveCounterAttackWithSkillParser()},
  {key: '2-2-49', parser: new PassiveCounterAttackWithSkillParser()},
  {key: '0-3-50', parser: new PassiveCounterAttackWithSkillParser()},
  {key: '1-3-50', parser: new PassiveCounterAttackWithSkillParser()},
  {key: '0-3-51', parser: new PassiveDeceivesDeathParser()},
  {key: '1-3-51', parser: new PassiveDeceivesDeathParser()},
  {key: '0-3-53', parser: new PassiveSkillMultipleActivationParser()},
  {key: '0-3-54', parser: new PassiveEvasionMagicalParser()},
  {key: '1-3-54', parser: new PassiveEvasionMagicalParser()},
  {key: '0-3-55', parser: new PassiveDebuffsResistanceParser()},
  {key: '1-3-55', parser: new PassiveDebuffsResistanceParser()},
  {key: '0-3-56', parser: new PassiveSkillBattleStartActivationParser()},
  {key: '1-3-56', parser: new PassiveSkillBattleStartActivationParser()},
  {key: '0-3-61', parser: new PassiveEsperGroupSummonParser()},
  {key: '0-3-63', parser: new PassiveEsperStatsIncreaseParser()},
  {key: '1-3-63', parser: new PassiveEsperStatsIncreaseParser()},
  {key: '0-3-64', parser: new PassiveEsperSummonDamageIncreaseParser()},
  {key: '0-3-66', parser: new PassiveSkillTurnStartActivationParser()},
  {key: '1-3-66', parser: new PassiveSkillTurnStartActivationParser()},
  {key: '0-3-68', parser: new PassiveLbDamageIncreaseParser()},
  {key: '1-3-68', parser: new PassiveLbDamageIncreaseParser()},
  {key: '0-3-69', parser: new PassiveEquipmentStatsDualwieldIncreaseParser()},
  {key: '1-3-69', parser: new PassiveEquipmentStatsDualwieldIncreaseParser()},
  {key: '--69', parser: new PassiveEquipmentStatsDualwieldIncreaseParser()}, // wtf is this ? bugged config
  {key: '0-3-70', parser: new PassiveEquipmentStatsDoublehandIncreaseParser()},
  {key: '0-3-72', parser: new PassiveLbUpgradeParser()},
  {key: '0-3-73', parser: new PassiveSkillModifierIncreaseParser()},
  {key: '1-3-73', parser: new PassiveSkillModifierIncreaseParser()},
  {key: '0-3-74', parser: new PassiveEquipmentStatsIncreaseParser()},
  {key: '0-3-75', parser: new PassiveEquipmentCategoryKillerDamageIncreaseParser()},
  {key: '0-3-80', parser: new PassiveLbUpgradeHpThresholdParser()},
  {key: '0-3-81', parser: new PassiveDualWieldDamageCapParser()},
  {key: '1-3-81', parser: new PassiveDualWieldDamageCapParser()},
  {key: '0-3-98', parser: new PassiveSkillMultipleActivationParser()},
  {key: '0-3-136', parser: new PassiveSkillModifierIncreaseParser()},
  {key: '0-3-10003', parser: new PassiveEquipmentStatsDoublehandGlexIncreaseParser()},
  {key: '1-3-10003', parser: new PassiveEquipmentStatsDoublehandGlexIncreaseParser()},
  {key: '0-3-10004', parser: new PassiveEquipmentWeaponElementStatsIncreaseParser()},
  {key: '1-3-10004', parser: new PassiveEquipmentWeaponElementStatsIncreaseParser()},
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
