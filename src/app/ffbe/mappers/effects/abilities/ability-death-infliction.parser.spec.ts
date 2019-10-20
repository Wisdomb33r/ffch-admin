import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityDeathInflictionParser', () => {

    it('should parse death infliction for caster', () => {
      // GIVEN
      const effect = JSON.parse('[0, 3, 35, [100,  1,  1]]');
      // WHEN
      const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
      // THEN
      expect(s).toEqual('Inflige Mort (100%) au lanceur (ignore la rés. à Mort)');
    });

    it('should parse death infliction all enemies', () => {
      // GIVEN
      const effect = JSON.parse('[2, 1, 35, [30]]');
      // WHEN
      const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
      // THEN
      expect(s).toEqual('Inflige Mort (30%) aux adversaires');
    });

  }
);
