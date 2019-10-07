import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityElementImbueParser', () => {
  it('should parser Fire element imbue for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 95, [100,  0,  0,  0,  0,  0,  0,  0,  2,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Ajoute l\'élément Feu aux attaques physiques et hybrides du lanceur pour 2 tours');
  });

  it('should parser Ice element imbue for caster', () => {
    // GIVEN
    const effect = JSON.parse('[1, 3, 95, [0,  100,  0,  0,  0,  0,  0,  0,  5,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Ajoute l\'élément Glace aux attaques physiques et hybrides du lanceur pour 5 tours');
  });

  it('should parser Lightning element imbue for one ally', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 95, [0,  0,  100,  0,  0,  0,  0,  0,  3,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Ajoute l\'élément Foudre aux attaques physiques et hybrides d\'un allié pour 3 tours');
  });

  it('should parser Water element imbue for one random ally', () => {
    // GIVEN
    const effect = JSON.parse('[3, 2, 95, [0,  0,  0,  100,  0,  0,  0,  0,  2,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Ajoute l\'élément Eau aux attaques physiques et hybrides d\'un allié au hasard pour 2 tours');
  });

  it('should parser Wind element imbue for one ally except caster', () => {
    // GIVEN
    const effect = JSON.parse('[1, 5, 95, [0,  0,  0,  0,  100,  0,  0,  0,  3,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Ajoute l\'élément Vent aux attaques physiques et hybrides d\'un allié sauf le lanceur pour 3 tours');
  });

  it('should parser Earth element imbue for all allies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 95, [0,  0,  0,  0,  0,  100,  0,  0,  5,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Ajoute l\'élément Terre aux attaques physiques et hybrides des alliés pour 5 tours');
  });

  it('should parser Light element imbue for all allies except caster', () => {
    // GIVEN
    const effect = JSON.parse('[2, 5, 95, [0,  0,  0,  0,  0,  0,  100,  0,  5,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Ajoute l\'élément Lumière aux attaques physiques et hybrides des alliés sauf le lanceur pour 5 tours');
  });

  it('should parse chance of Dark element imbue for all allies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 95, [0,  0,  0,  0,  0,  0,  0,  50,  5,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('50% de chance d\'ajouter l\'élément Ténèbres aux attaques physiques et hybrides des alliés pour 5 tours');
  });

  it('should parser Fire/Light element imbue for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 95, [100,  0,  0,  0,  0,  0,  100,  0,  2,  1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Ajoute les éléments Feu/Lumière aux attaques physiques et hybrides du lanceur pour 2 tours');
  });

});
