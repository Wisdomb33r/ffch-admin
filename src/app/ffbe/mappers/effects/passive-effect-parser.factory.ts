import {EffectParser} from './effect-parser';
import {PassiveStatsIncreaseParser} from './passives/passive-stats-increase.parser';
import {UnknownEffectParser} from './unknown-effect-parser';
import {PassiveEsperDamageIncreaseParser} from './passives/passive-esper-damage-increase.parser';
import {PassiveEquipmentCategoryUnlockParser} from './passives/passive-equipment-category-unlock.parser';
import {PassiveAilmentsResistanceParser} from './passives/passive-ailments-resistance.parser';
import {PassiveElementsResistanceParser} from './passives/passive-elements-resistance.parser';

const PARSERS: Array<{ key: string, parser: EffectParser }> = [
  {key: '0-3-1', parser: new PassiveStatsIncreaseParser()},
  {key: '1-3-1', parser: new PassiveStatsIncreaseParser()},
  {key: '0-3-2', parser: new PassiveAilmentsResistanceParser()},
  {key: '1-3-2', parser: new PassiveAilmentsResistanceParser()},
  {key: '0-3-3', parser: new PassiveElementsResistanceParser()},
  {key: '1-3-3', parser: new PassiveElementsResistanceParser()},
  {key: '0-3-5', parser: new PassiveEquipmentCategoryUnlockParser()},
  {key: '1-3-5', parser: new PassiveEquipmentCategoryUnlockParser()},
  {key: '0-3-21', parser: new PassiveEsperDamageIncreaseParser()},
  {key: '1-3-21', parser: new PassiveEsperDamageIncreaseParser()},
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
