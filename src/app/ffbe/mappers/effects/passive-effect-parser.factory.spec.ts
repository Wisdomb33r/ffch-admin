import {PassiveEffectParserFactory} from './passive-effect-parser.factory';
import {SkillsService} from '../../services/skills.service';
import {
  ABILITY_SKILLS_NAMES_TEST_DATA,
  ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA,
  ABILITY_SKILLS_TEST_DATA,
  MAGIC_SKILLS_NAMES_TEST_DATA,
  MAGIC_SKILLS_SHORTDESCRIPTIONS_TEST_DATA,
  MAGIC_SKILLS_TEST_DATA,
  PASSIVE_SKILLS_TEST_DATA
} from '../../model/skill.model.spec';
import {Skill} from '../../model/skill.model';
import {HTML_LINE_RETURN} from './skill-effects.mapper';
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
      effect: '[1, 2, 8, [1, 100, 40, 60, 50]]',
      parsed: '50% de chance de protéger un allié féminin des attaques physiques avec mitigation de 40%-60%'
    },
    {effect: '[0, 3, 9, [100]]', parsed: '+100% d\'efficacité des objets de soin en combat'},
    {effect: '[0, 3, 16, [100, 0]]', parsed: '+100% de chance de réussir à voler un objet'},
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
    {effect: '[0, 3, 22, [20]]', parsed: '+20% d\'esquive physique'},
    {effect: '[0, 3, 24, [20]]', parsed: '+20% de chance d\'être ciblé'},
    {effect: '[0, 3, 25, [20]]', parsed: '-20% de chance d\'être ciblé'},
    {effect: '[0, 3, 29, [8, 20, 5, 4, 6]]', parsed: '+20 PV et +4 PM tous les 6 pas en exploration'},
    {
      effect: '[0, 3, 30, [50]]',
      parsed: 'Absorbe 50% des PM utilisés par l\'adversaire lors de dégâts magiques encaissés'
    },
    {effect: '[0, 3, 32, [7]]', parsed: '+7% de PM soignés chaque tour'},
    {effect: '[0, 3, 32, [3, 3]]', parsed: '+3 sphères de chimère'},
    {effect: '[0, 3, 37, [500]]', parsed: '+500% de gils reçus en combat'},
    {effect: '[0, 3, 42, [0, 0, 0, 1, 0, 0, 1, 0]]', parsed: 'Absorbe les dégâts d\'élément Eau ou Lumière'},
    {effect: '[0, 3, 43, [-20]]', parsed: '-20% de chance de combat en exploration'},
    {effect: '[0, 3, 44, [7]]', parsed: 'Les attaques normales s\'exécutent 7 fois'},
    {effect: '[0, 3, 45, [50]]', parsed: '+50% d\'expérience reçue en combat'},
    {effect: '[0, 3, 46, [100, 100]]', parsed: 'Permet de voler 100% des gils en plus des objets'},
    {effect: '[0, 3, 46, [50, 100]]', parsed: 'Permet de voler 50% à 100% des gils en plus des objets'},
    {
      effect: '[0, 3, 47, [50, 100]]', parsed: '+50% de chance d\'obtenir un butin normal'
        + HTML_LINE_RETURN + '+100% de chance de recevoir un butin rare'
    },
    {effect: '[0, 3, 48, [20]]', parsed: '-20% de PM consommés par les compétences chantées'},
    {
      effect: '[0, 3, 51, [20, 80, 10, 3]]',
      parsed: '80% de chance d\'éviter la mort avec 10% PV lors d\'une attaque fatale si les PV étaient supérieurs à 20% (max 3 fois)'
    },
    {effect: '[0, 3, 54, [-1, 20]]', parsed: '+20% d\'esquive magique (effet passif non cumulable)'},
    {
      effect: '[1, 2, 59, [1, 100, 40, 60, 50]]',
      parsed: '50% de chance de protéger un allié féminin des attaques magiques avec mitigation de 40%-60%'
    },
    {
      effect: '[0, 3, 10004, [2, 10, 10, 20, 10, 10, 20]]',
      parsed: '+20% ATT/PSY, +10% PV/PM/DÉF/MAG si l\'unité porte une arme d\'élément Glace'
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

  it('should parse multi-skill when effect is the only one', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    const skill1: Skill = skills['200200'];
    skill1.gumi_id = 200200;
    skill1.names = names['200200'];
    skill1.descriptions = descriptions['200200'];
    const skill2: Skill = skills['200270'];
    skill2.gumi_id = 200270;
    skill2.names = names['200270'];
    skill2.descriptions = descriptions['200270'];

    const effect = JSON.parse('[0, 3, 53, [3, 123456, -1, [200200, 200270], 1]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(Skill.produce(skill1), Skill.produce(skill2));
    const fakeSkill: Skill = new Skill();
    fakeSkill.effects_raw = [effect]; // single effect in the skill
    // WHEN
    const s = PassiveEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Permet l\'utilisation de <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a>, <a href="ffexvius_skills.php?gumiid=200270">Transpercer</a> 3x par tour');
  });

  it('should parse multi-skill without duplicates', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    const skill1: Skill = skills['200200'];
    skill1.gumi_id = 200200;
    skill1.names = names['200200'];
    skill1.descriptions = descriptions['200200'];

    const effect = JSON.parse('[0, 3, 53, [3, 123456, -1, [200200], 1, 1]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(Skill.produce(skill1));
    const fakeSkill: Skill = new Skill();
    fakeSkill.effects_raw = [effect]; // single effect in the skill
    // WHEN
    const s = PassiveEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Permet l\'utilisation d\'aptitudes <strong>distinctes</strong> parmi <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a> 3x par tour');
  });

  it('should parse multi-skill when there is multiple effects', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    const skill1: Skill = skills['200200'];
    skill1.gumi_id = 200200;
    skill1.names = names['200200'];
    skill1.descriptions = descriptions['200200'];
    const skill2: Skill = skills['200270'];
    skill2.gumi_id = 200270;
    skill2.names = names['200270'];
    skill2.descriptions = descriptions['200270'];

    const effect = JSON.parse('[0, 3, 53, [3, 200200, -1, [200270], 1]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(Skill.produce(skill1), Skill.produce(skill2));
    const fakeSkill: Skill = new Skill();
    fakeSkill.effects_raw = [effect, effect]; // multiple effects in the skill
    // WHEN
    const s = PassiveEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, fakeSkill);
    // THEN
    expect(s).toEqual('Donne accès à <a href="ffexvius_skills.php?gumiid=200200">Coup de pied</a>');
  });

  it('should parse turn start activation effect', () => {
    // GIVEN
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);
    const skill: Skill = skills['100020'];
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    skill.names = names['100020'];
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['100020'];

    const effect = JSON.parse('[0, 3, 66, [100020, 50]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValue(Skill.produce(skill));
    // WHEN
    const s = PassiveEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Effet activé en début de tour (50% de chance): +20% PV');
  });

  it('should parse turn start activation effect when ally alive', () => {
    // GIVEN
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);
    const skill: Skill = skills['100020'];
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    skill.names = names['100020'];
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['100020'];

    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValue(Skill.produce(skill));

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
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);
    const skill: Skill = skills['100020'];
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    skill.names = names['100020'];
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['100020'];

    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValue(Skill.produce(skill));

    const effect = JSON.parse('[0, 3, 10002, [0, 1, 100020, 0]]');
    // WHEN
    const s = PassiveEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Effet activé en début de tour si un allié masculin est en vie: +20% PV');
  });
});
