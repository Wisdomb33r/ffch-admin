import {AbilityEffectParserFactory} from './ability-effect-parser.factory';

describe('AbilityKillerDamageIncreaseParser', () => {
  it('should parse physical beast killer for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 92, [[1,  75], -1, -1, -1, -1, -1, -1, -1, 3, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+75% de dégâts physiques contre les bêtes au lanceur pour 3 tours');
  });

  it('should parse physical avian killer for caster', () => {
    // GIVEN
    const effect = JSON.parse('[1, 3, 92, [[2,  75], -1, -1, -1, -1, -1, -1, -1, 3, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+75% de dégâts physiques contre les oiseaux au lanceur pour 3 tours');
  });

  it('should parse physical aquatic killer for one ally', () => {
    // GIVEN
    const effect = JSON.parse(' [1, 2, 92, [[3,  40], -1, -1, -1, -1, -1, -1, -1, 5, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+40% de dégâts physiques contre les aquatiques à un allié pour 5 tours');
  });

  it('should parse physical demon killer for one ally', () => {
    // GIVEN
    const effect = JSON.parse(' [1, 2, 92, [[4,  75], -1, -1, -1, -1, -1, -1, -1, 7, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+75% de dégâts physiques contre les démons à un allié pour 7 tours');
  });

  it('should parse physical human killer for all allies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 92, [[5,  50], -1, -1, -1, -1, -1, -1, -1, 3, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+50% de dégâts physiques contre les humains aux alliés pour 3 tours');
  });

  it('should parse physical machine killer for all allies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 92, [[6,  50], -1, -1, -1, -1, -1, -1, -1, 1, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+50% de dégâts physiques contre les machines aux alliés pour 1 tour');
  });


  it('should parse magical dragon killer for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 93, [[7,  100], -1, -1, -1, -1, -1, -1, -1, 3, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+100% de dégâts magiques contre les dragons au lanceur pour 3 tours');
  });

  it('should parse magical faerie killer for caster', () => {
    // GIVEN
    const effect = JSON.parse('[1, 3, 93, [[8,  20], -1, -1, -1, -1, -1, -1, -1, 1, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+20% de dégâts magiques contre les esprits au lanceur pour 1 tour');
  });

  it('should parse magical insect killer for one ally', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 93, [[9,  75], -1, -1, -1, -1, -1, -1, -1, 3, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+75% de dégâts magiques contre les insectes à un allié pour 3 tours');
  });

  it('should parse magical stone killer for one ally', () => {
    // GIVEN
    const effect = JSON.parse('[1, 2, 93, [[10,  30], -1, -1, -1, -1, -1, -1, -1, 3, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+30% de dégâts magiques contre les pierres à un allié pour 3 tours');
  });

  it('should parse magical plant killer for all allies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 93, [[11,  50], -1, -1, -1, -1, -1, -1, -1, 2, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+50% de dégâts magiques contre les plantes aux alliés pour 2 tours');
  });

  it('should parse magical reaper killer for all allies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 93, [[12,  50], -1, -1, -1, -1, -1, -1, -1, 3, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+50% de dégâts magiques contre les morts-vivants aux alliés pour 3 tours');
  });


  it('should parse physical multi-monster killer for caster', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 92, [[2,  50], [5,  50], [10,  50], -1, -1, -1, -1, -1, 4, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+50% de dégâts physiques contre les oiseaux, les humains et les pierres au lanceur pour 4 tours');
  });

  it('should parse magical multi-monster killer for all allies', () => {
    // GIVEN
    const effect = JSON.parse('[2, 2, 93, [[1,  75], [6,  50], [10,  75], [12,  100], -1, -1, -1, -1, 3, 1]]');
    // WHEN
    const s = AbilityEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('+100% de dégâts magiques contre les morts-vivants aux alliés pour 3 tours<br />'
      + '+75% de dégâts magiques contre les bêtes et les pierres aux alliés pour 3 tours<br />'
      + '+50% de dégâts magiques contre les machines aux alliés pour 3 tours');
  });

});
