import {PassiveEffectParserFactory} from './passive-effect-parser.factory';
import {SkillsService} from '../../services/skills.service';
import {
  ABILITY_SKILLS_NAMES_TEST_DATA,
  ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA,
  PASSIVE_SKILLS_TEST_DATA
} from '../../model/skill.model.spec';
import {Skill} from '../../model/skill.model';

class SkillsServiceMock {
  private static INSTANCE: SkillsServiceMock = new SkillsServiceMock();

  public static getInstance() {
    return SkillsServiceMock.INSTANCE;
  }

  public searchForSkillByGumiId(gumiId: number): Skill {
    return null;
  }
}

describe('PassiveEffectParser', () => {
  const passiveEffectParserTestMappings = [
    {effect: '[0, 3, 1, [20, 10, 30, 10, 20, 10, 30]]', parsed: '+30% MAG, +20% PV/ATT, +10% PM/DÉF/PSY'},
    {
      effect: '[0, 3, 2, [50, 40, 60, 50, 50, 50, 40, 20]]',
      parsed: '+60% de rés. à Sommeil, +50% de rés. à Poison, Silence, Paralysie, Confusion, +40% de rés. à Cécité, Maladie, +20% de rés. à Pétrification'
    },
    {effect: '[0, 3, 2, [20, 20, 20, 20, 20, 20, 20, 20]]', parsed: '+20% de rés. à toutes les altérations'},
    {
      effect: '[0, 3, 3, [50, 40, 60, 50, 50, 50, 40, 20]]',
      parsed: '+60% de rés. Foudre, +50% de rés. Feu, Eau, Vent, Terre, +40% de rés. Glace, Lumière, +20% de rés. Ténèbres'
    },
    {effect: '[0, 3, 3, [20, 20, 20, 20, 20, 20, 20, 20]]', parsed: '+20% de rés. à tous les éléments'},
    {effect: '[0, 3, 4, [2, 40, 9999, 30, 0, -1]]', parsed: '+40% DÉF quand les PV passent sous 30% (max 9999 fois)'},
    {effect: '[0, 3, 4, [2, 40, 9999, 30, 0, 3]]', parsed: '+40% DÉF pour 3 tours quand les PV passent sous 30% (max 9999 fois)'},
    {effect: '[0, 3, 5, [11]]', parsed: 'Permet d\'équiper les <a href="ffexvius_objects.php?categid=33">Harpes</a>'},
    {effect: '[0, 3, 5, [666]]', parsed: 'Permet d\'équiper les UNKNOWN'},
    {
      effect: '[0, 3, 6, [11, 10, 20, 10, 30, 20, 30]]',
      parsed: '+30% PM/PSY, +20% PV/DÉF, +10% ATT/MAG si l\'unité est équipée d\'une <a href="ffexvius_objects.php?categid=33">harpe</a>'
    },
    {
      effect: '[1, 2, 8, [1, 100, 40, 60, 50]]',
      parsed: '50% de chance de protéger un allié féminin des attaques avec mitigation de 40%-60%'
    },
    {
      effect: '[1, 3, 13, [25,  25,  0]]',
      parsed: '+25% à l\'ATT de l\'équipement si l\'unité porte une seule arme à une main (DH)<br />+25% précision si l\'unité porte une seule arme à une main (DH)'
    },
    {effect: '[0, 3, 21, [20]]', parsed: '+20% INV'},
    {effect: '[0, 3, 22, [20]]', parsed: '+20% d\'esquive physique'},
    {effect: '[0, 3, 24, [20]]', parsed: '+20% de chance de se faire cibler'},
    {effect: '[0, 3, 25, [20]]', parsed: '-20% de chance de se faire cibler'},
    {effect: '[0, 3, 32, [7]]', parsed: '+7% de PM soignés chaque tour'},
    {effect: '[0, 3, 32, [3, 3]]', parsed: '+3 sphères de chimère'},
    {effect: '[0, 3, 33, [100]]', parsed: '+1 cristal de limite chaque tour'},
    {effect: '[0, 3, 33, [500]]', parsed: '+5 cristaux de limite chaque tour'},
    {effect: '[0, 3, 68, [50]]', parsed: '+50% aux dégâts de la limite'},
    {effect: '[0, 3, 69, [2, 50]]', parsed: '+50% à la DÉF de l\'équipement si l\'unité porte deux armes (TDW)'},
    {effect: '[0, 3, 70, [25,  0,  2]]', parsed: '+25% à la MAG de l\'équipement si l\'unité porte une seule arme (TDH)'},
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

  it('should parse battle start activation effect', () => {
    // GIVEN
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);
    const skill: Skill = skills['100020'];
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    skill.names = names['100020'];
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['100020'];

    const effect = JSON.parse('[0, 3, 35, [100020]]');
    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValue(skill);
    // WHEN
    const s = PassiveEffectParserFactory.getParser(effect[0], effect[1], effect[2]).parse(effect, null);
    // THEN
    expect(s).toEqual('Bonus activé en début de combat ou après résurrection: +20% PV');
  });
});
