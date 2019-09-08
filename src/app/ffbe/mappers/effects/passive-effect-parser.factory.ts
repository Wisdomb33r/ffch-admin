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
  {key: '0-3-21', parser: new PassiveEsperDamageIncreaseParser()},
  {key: '1-3-21', parser: new PassiveEsperDamageIncreaseParser()},
  {key: '0-3-32', parser: new PassiveMpRecoveryParser()},
  {key: '1-3-32', parser: new PassiveMpRecoveryParser()},
  {key: '0-3-35', parser: new PassiveBattleStartSkillActivationParser()},
  {key: '1-3-35', parser: new PassiveBattleStartSkillActivationParser()},
  {key: '2-1-35', parser: new PassiveBattleStartSkillActivationParser()},
  {key: '0-3-56', parser: new PassiveBattleStartSkillActivationParser()},
  {key: '1-3-56', parser: new PassiveBattleStartSkillActivationParser()},
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
