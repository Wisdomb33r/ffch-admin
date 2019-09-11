import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityEffectParser', () => {

  it('should parse infliction of status ailments for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 6, [0, 100, 100, 100, 100, 100, 0, 100, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Inflige Cécité/Sommeil/Silence/Paralysie/Confusion/Pétrification (100%) au lanceur');
  });

  it('should parse infliction of status ailments for one enemy', () => {
    // GIVEN
    const effect = JSON.parse('[1, 1, 6, [40, 0, 0, 0, 0, 0, 40, 0, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Inflige Poison/Maladie (40%) à un adversaire');
  });

  it('should parse infliction of status ailments for all enemies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 6, [15, 0, 70, 0, 0, 0, 15, 0, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Inflige Sommeil (70%), Poison/Maladie (15%) à tous les adversaires');
  });

  it('should parse infliction of all status ailments for all enemies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 1, 6, [40, 40, 40, 40, 40, 40, 40, 40, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Inflige toutes les altérations d\'état (40% pour chacune) à tous les adversaires');
  });

});
