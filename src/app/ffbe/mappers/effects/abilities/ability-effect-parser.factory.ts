import {EffectParser} from '../effect-parser';
import {UnknownEffectParser} from '../unknown-effect-parser';
import {AbilityStatsModificationParser} from './ability-stats-modification.parser';

const PARSERS: Array<{ key: string, parser: EffectParser }> = [
  {key: '0-3-3', parser: new AbilityStatsModificationParser()},
  {key: '1-3-3', parser: new AbilityStatsModificationParser()},
  {key: '2-2-3', parser: new AbilityStatsModificationParser()},
  {key: '2-5-3', parser: new AbilityStatsModificationParser()},
];

export class AbilityEffectParserFactory {
  public static getParser(effectId1: number, effectId2: number, effectId3: number): EffectParser {
    const parserItem = PARSERS.find(val => val.key === effectId1 + '-' + effectId2 + '-' + effectId3);
    if (parserItem) {
      return parserItem.parser;
    }
    return new UnknownEffectParser();
  }
}