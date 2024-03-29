import {PassiveEffectParserFactory} from './passive-effect-parser.factory';
import {SkillsService} from '../../services/skills.service';
import {SkillMockDataHelper} from '../../model/skill.model.spec';
import {CHARACTER_TEST_DATA} from '../../model/character/character.model.spec';
import {Character} from '../../model/character/character.model';
import {CharactersService} from '../../services/characters.service';
import {SkillsServiceMock} from '../../services/skills.service.spec';
import {CharactersServiceMock} from '../../services/characters.service.spec';

describe('PassiveEffectParser', () => {
  const passiveEffectParserTestMappings = [
    {effect: '[0, 3, 4, [1, 40, 9999, 30, 0, -1]]', parsed: '+40% ATT quand les PV passent sous 30% (max 9999 fois)'},
    {
      effect: '[0, 3, 4, [2, 40, 9999, 30, 0, 3]]',
      parsed: '+40% DÉF pour 3 tours quand les PV passent sous 30% (max 9999 fois)'
    },
    {
      effect: '[0, 3, 4, [20, 150, 5, 30, 0, -1]]',
      parsed: '+150 PV chaque tour quand les PV passent sous 30% (max 5 fois)'
    },
    {
      effect: '[0, 3, 4, [74,  100,  1,  50,  0,  -1]]',
      parsed: '+100% dégâts physiques aux morts-vivants quand les PV passent sous 50% (max 1 fois)'
    },
    {
      effect: '[0, 3, 4, [204,  40,  9000,  65,  0,  3]]',
      parsed: '+40% mitigation générale pour 3 tours quand les PV passent sous 65% (max 9000 fois)'
    },
    {
      effect: '[0, 3, 18, [1,  1,  1,  1,  1,  1,  1,  1]]',
      parsed: 'Soigne toutes les altérations au lanceur après le combat'
    },
    {
      effect: '[2, 2, 18, [0,  1,  0,  0,  1,  0,  1,  0]]',
      parsed: 'Soigne Cécité, Paralysie et Maladie aux alliés après le combat'
    },
    {effect: '[0, 3, 19, [200]]', parsed: '+200% ATT si l\'unité ne porte rien dans les deux mains'},
    {effect: '[0, 3, 20, [20]]', parsed: '+20% de chance d\'activation des contre-attaques'},
    {effect: '[0, 3, 44, [7]]', parsed: 'Les attaques normales s\'exécutent 7 fois'},
    {
      effect: '[0, 3, 51, [20, 80, 10, 3]]',
      parsed: '80% de chance d\'éviter la mort avec 10% PV lors d\'une attaque fatale si les PV étaient supérieurs à 20% (max 3 fois)'
    },
    {
      effect: '[0, 3, 10006, [[23, 24], 40, 9999, 30, 0, 2]]',
      parsed: '+40% rés. Feu, rés. Glace pour 2 tours quand les PV passent sous 30% (max 9999 fois)'
    },
    {
      effect: '[0, 3, 10006, [[23, 24, 25, 26, 27, 28, 29, 30], 40, 9999, 30, 0, 2]]',
      parsed: '+40% de rés. aux éléments pour 2 tours quand les PV passent sous 30% (max 9999 fois)'
    },
    {effect: '[9999, 9999, 9999, [0]]', parsed: 'Effet UNKNOWN'},
  ];

  passiveEffectParserTestMappings.forEach(testParams => {
    it('should parse effect for input ' + testParams.effect, () => {
      // GIVEN
      const effect = JSON.parse(testParams.effect);
      // WHEN
      const s = PassiveEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
      // THEN
      expect(s).toEqual(testParams.parsed);
    });
  });

  it('should parse turn start activation effect', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 66, [100020, 50]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValue(SkillMockDataHelper.mockPassiveSkill(100020));
    // WHEN
    const s = PassiveEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Effet activé en début de tour (50% de chance): +20% PV');
  });

  it('should parse turn start activation effect when ally alive', () => {
    // GIVEN
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValue(SkillMockDataHelper.mockPassiveSkill(100020));

    const characters = JSON.parse(CHARACTER_TEST_DATA);
    const character: Character = characters['100000102'];

    const charactersServiceMock = new CharactersServiceMock() as CharactersService;
    CharactersService['INSTANCE'] = charactersServiceMock;
    spyOn(charactersServiceMock, 'searchForCharacterByGumiId').and.returnValue(character);

    const effect = JSON.parse('[0, 3, 10002, [100000102, 3, 100020, 0]]');
    // WHEN
    const s = PassiveEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Effet activé en début de tour si Rain est en vie: +20% PV');
  });

  it('should parse turn start activation effect when genre ally alive', () => {
    // GIVEN
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValue(SkillMockDataHelper.mockPassiveSkill(100020));

    const effect = JSON.parse('[0, 3, 10002, [0, 1, 100020, 0]]');
    // WHEN
    const s = PassiveEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Effet activé en début de tour si un allié masculin est en vie: +20% PV');
  });
});
