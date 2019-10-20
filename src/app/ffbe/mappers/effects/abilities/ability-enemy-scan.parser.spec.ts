import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityEnemyScanParser', () => {

    it('should parse enemy scan', () => {
      // GIVEN
      const effect = JSON.parse('[1, 1, 47, [134]]');
      // WHEN
      const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
      // THEN
      expect(s).toEqual('Permet d\'obtenir des infos sur un adversaire');
    });

  }
);
