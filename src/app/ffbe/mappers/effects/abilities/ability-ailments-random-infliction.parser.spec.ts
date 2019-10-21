import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityAilmentsRandomInflictionParser', () => {

  it('should parse random infliction of status ailments for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 34, [0, 100, 100, 100, 100, 100, 0, 100, 90, 2]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Inflige 2 altérations aléatoires (100% Cécité, Sommeil, Silence, Paralysie, Confusion, Pétrification) au lanceur');
  });

  it('should parse infliction of all status ailments for all enemies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 34, [40, 40, 40, 40, 40, 40, 40, 40, 1, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Inflige 1 altération aléatoire (40% chacune) aux adversaires');
  });

});
