import {EffectParser} from '../effect-parser';
import {UnknownEffectParser} from '../unknown-effect-parser';
import {AbilityStatsModificationParser} from './ability-stats-modification.parser';
import {AbilityElementResistancesParser} from './ability-element-resistances.parser';

const PARSERS: Array<{ key: string, parser: EffectParser }> = [
  {key: '0-3-3', parser: new AbilityStatsModificationParser()},
  {key: '1-3-3', parser: new AbilityStatsModificationParser()},
  {key: '1-2-3', parser: new AbilityStatsModificationParser()},
  {key: '2-2-3', parser: new AbilityStatsModificationParser()},
  {key: '2-5-3', parser: new AbilityStatsModificationParser()},
  {key: '1-1-24', parser: new AbilityStatsModificationParser()},
  {key: '2-1-24', parser: new AbilityStatsModificationParser()},
  {key: '0-3-33', parser: new AbilityElementResistancesParser()},
  {key: '2-2-33', parser: new AbilityElementResistancesParser()},
  {key: '1-2-33', parser: new AbilityElementResistancesParser()},
  {key: '1-1-33', parser: new AbilityElementResistancesParser()},
  {key: '2-1-33', parser: new AbilityElementResistancesParser()},
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
