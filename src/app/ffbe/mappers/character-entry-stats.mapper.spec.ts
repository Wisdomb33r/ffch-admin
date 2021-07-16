import {CHARACTER_TEST_DATA} from '../model/character/character.model.spec';
import {Character} from '../model/character/character.model';
import {Unite} from '../model/unite.model';
import {CharacterEntryStatsMapper} from './character-entry-stats.mapper';
import {Caracteristiques} from '../model/caracteristiques.model';
import {Skill} from '../model/skill.model';
import {SkillMockDataHelper} from '../model/skill.model.spec';

describe('CharacterEntryStatsMapper', function () {
  it('should parse stats correctly', () => {
      // GIVEN
      const characters = JSON.parse(CHARACTER_TEST_DATA);
      const character: Character = characters['100000102'];
      character.gumi_id = 100000102;

      const characterEntry = character.entries[100000102];
      characterEntry.stats.ATK[2] = 18;
      characterEntry.stats.DEF[2] = 28;
      characterEntry.stats.MAG[2] = 38;
      characterEntry.stats.SPR[2] = 48;

      const unite = new Unite(1, 2, 100000102, 100000102);
      const skills = [];

      // WHEN
      const uniteCarac = CharacterEntryStatsMapper.toUniteCarac(characterEntry.stats, unite, skills);

      // THEN
      expect(uniteCarac.level === 30);
      expect(uniteCarac.level_max === 30);
      expect(uniteCarac.base).toEqual(new Caracteristiques(1144, 45, 41, 40, 39, 37));
      expect(uniteCarac.pots).toEqual(new Caracteristiques(120, 20, 18, 28, 38, 48));
    }
  );

  it('should parse percent bonus to base stats correctly', () => {
      // GIVEN
      const characters = JSON.parse(CHARACTER_TEST_DATA);
      const character: Character = characters['100000102'];
      character.gumi_id = 100000102;

      const unite = new Unite(1, 2, 100000102, 100000102);

      const skill1: Skill = SkillMockDataHelper.mockPassiveSkill(100010);
      const skill2: Skill = SkillMockDataHelper.mockPassiveSkill(230020);
      const skill3: Skill = SkillMockDataHelper.mockPassiveSkill(234232);

      character.skills = JSON.parse('[' +
        '{"rarity": 2, "level": 3, "type": "ABILITY", "id": 100010},' +
        '{"rarity": 2, "level": 8, "type": "MAGIC", "id": 230020},' +
        '{"rarity": 2, "level": 17, "type": "ABILITY", "id": 234232}' +
        ']');
      character.skills[0].skill = skill1;
      character.skills[1].skill = skill2;
      character.skills[2].skill = skill3;

      character.entries['100000102'].characterEntrySkills = character.skills;

      // WHEN
      const uniteCarac = CharacterEntryStatsMapper.toUniteCarac(character.entries[100000102].stats,
        unite, character.entries['100000102'].characterEntrySkills);

      // THEN
      expect(uniteCarac.getBonusBasePercent()).toEqual(new Caracteristiques(10, 20, 0, 20, 0, 0));
    }
  );

  it('should parse percent bonus to Equipment stats when dual-wielding correctly', () => {
      // GIVEN
      const characters = JSON.parse(CHARACTER_TEST_DATA);
      const character: Character = characters['100009105'];
      character.gumi_id = 100009105;

      const unite = new Unite(1033, 7, 100009105, 100009105);

      const skill1: Skill = SkillMockDataHelper.mockPassiveSkill(100010);
      const skill2: Skill = SkillMockDataHelper.mockPassiveSkill(950145);
      const skill3: Skill = SkillMockDataHelper.mockPassiveSkill(707785);

      character.skills = JSON.parse('[' +
        '{"rarity": 5, "level": 3, "type": "ABILITY", "id": 100010},' +
        '{"rarity": 7, "level": 101, "type": "ABILITY", "id": 950145},' +
        '{"rarity": 7, "level": 110, "type": "ABILITY", "id": 707785}' +
        ']');
      character.skills[0].skill = skill1;
      character.skills[1].skill = skill2;
      character.skills[2].skill = skill3;

      character.entries['100009105'].characterEntrySkills = character.skills;

      // WHEN
      const uniteCarac = CharacterEntryStatsMapper.toUniteCarac(character.entries[100009105].stats,
        unite, character.entries['100009105'].characterEntrySkills);

      // THEN
      expect(uniteCarac.getBonusDualWieldPercent()).toEqual(new Caracteristiques(0, 0, 10, 0, 0, 0));
    }
  );

  it('should filter out skills with requirements when computing bonus to equipment stats when dual-wielding', () => {
      // GIVEN
      const characters = JSON.parse(CHARACTER_TEST_DATA);
      const character: Character = characters['100009105'];
      character.gumi_id = 100009105;

      const unite = new Unite(1033, 7, 100009105, 100009105);

      const skill1: Skill = SkillMockDataHelper.mockPassiveSkill(100010);
      const skill2: Skill = SkillMockDataHelper.mockPassiveSkill(227160);
      const skill3: Skill = SkillMockDataHelper.mockPassiveSkill(707785);

      character.skills = JSON.parse('[' +
        '{"rarity": 5, "level": 3, "type": "ABILITY", "id": 100010},' +
        '{"rarity": 7, "level": 101, "type": "ABILITY", "id": 227160},' +
        '{"rarity": 7, "level": 110, "type": "ABILITY", "id": 707785}' +
        ']');
      character.skills[0].skill = skill1;
      character.skills[1].skill = skill2;
      character.skills[2].skill = skill3;

      character.entries['100009105'].characterEntrySkills = character.skills;

      // WHEN
      const uniteCarac = CharacterEntryStatsMapper.toUniteCarac(character.entries[100009105].stats,
        unite, character.entries['100009105'].characterEntrySkills);

      // THEN
      expect(uniteCarac.getBonusDualWieldPercent()).toEqual(new Caracteristiques(0, 0, 10, 0, 0, 0));
    }
  );

  it('should parse percent bonus to Equipment stats when single-wielding a one-handed weapon correctly', () => {
      // GIVEN
      const characters = JSON.parse(CHARACTER_TEST_DATA);
      const character: Character = characters['207002007'];
      character.gumi_id = 207002007;

      const unite = new Unite(2080, 8, 207002007, 207002007);

      const skill1: Skill = SkillMockDataHelper.mockPassiveSkill(100010);
      const skill2: Skill = SkillMockDataHelper.mockPassiveSkill(950145);
      const skill3: Skill = SkillMockDataHelper.mockPassiveSkill(702240);

      character.skills = JSON.parse('[' +
        '{"rarity": "NV", "level": 24, "type": "ABILITY", "id": 100010, "ex_level": 0},' +
        '{"rarity": "NV", "level": 100, "type": "ABILITY", "id": 950145, "ex_level": 0},' +
        '{"rarity": "NV", "level": 120, "type": "ABILITY", "id": 702240, "ex_level": 0}' +
        ']');
      character.skills[0].skill = skill1;
      character.skills[1].skill = skill2;
      character.skills[2].skill = skill3;

      character.entries['207002007'].characterEntrySkills = character.skills;

      // WHEN
      const uniteCarac = CharacterEntryStatsMapper.toUniteCarac(character.entries[207002007].stats,
        unite, character.entries['207002007'].characterEntrySkills);

      // THEN
      expect(uniteCarac.getBonusDoublehandPercent()).toEqual(new Caracteristiques(0, 0, 100, 50, 0, 50));
    }
  );

  it('should parse percent bonus to Equipment stats when single-wielding any weapon correctly', () => {
      // GIVEN
      const characters = JSON.parse(CHARACTER_TEST_DATA);
      const character: Character = characters['207002007'];
      character.gumi_id = 207002007;

      const unite = new Unite(2080, 8, 207002007, 207002007);

      const skill1: Skill = SkillMockDataHelper.mockPassiveSkill(100010);
      const skill2: Skill = SkillMockDataHelper.mockPassiveSkill(950145);
      const skill3: Skill = SkillMockDataHelper.mockPassiveSkill(236037);

      character.skills = JSON.parse('[' +
        '{"rarity": "NV", "level": 24, "type": "ABILITY", "id": 100010, "ex_level": 0},' +
        '{"rarity": "NV", "level": 100, "type": "ABILITY", "id": 950145, "ex_level": 0},' +
        '{"rarity": "NV", "level": 110, "type": "ABILITY", "id": 914072, "ex_level": 0}' +
        ']');
      character.skills[0].skill = skill1;
      character.skills[1].skill = skill2;
      character.skills[2].skill = skill3;

      character.entries['207002007'].characterEntrySkills = character.skills;

      // WHEN
      const uniteCarac = CharacterEntryStatsMapper.toUniteCarac(character.entries[207002007].stats,
        unite, character.entries['207002007'].characterEntrySkills);

      // THEN
      expect(uniteCarac.getBonusTrueDoublehandPercent()).toEqual(new Caracteristiques(0, 0, 100, 0, 0, 0));
    }
  );
});
