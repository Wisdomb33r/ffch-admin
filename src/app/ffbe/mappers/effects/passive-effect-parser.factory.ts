import {EffectParser} from './effect-parser';
import {PassiveStatsIncreaseParser} from './passives/passive-stats-increase.parser';
import {UnknownEffectParser} from './unknown-effect-parser';
import {EsperDamageIncreaseParser} from './passives/esper-damage-increase.parser';

const PARSERS: Array<{ key: string, parser: EffectParser }> = [
  {key: '1-3-1', parser: new PassiveStatsIncreaseParser()},
  {key: '0-3-1', parser: new PassiveStatsIncreaseParser()},
  {key: '0-3-21', parser: new EsperDamageIncreaseParser()},
  {key: '1-3-21', parser: new EsperDamageIncreaseParser()},
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
