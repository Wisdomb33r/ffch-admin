import {CHARACTER_TEST_DATA} from '../model/character.model.spec';
import {Character} from '../model/character.model';
import {Unite} from '../model/unite.model';
import {UniteCarac} from '../model/unite-carac.model';
import {CharacterEntryStatsMapper} from './character-entry-stats.mapper';
import {Caracteristiques} from '../model/caracteristiques.model';
import {Skill} from '../model/skill.model';
import {PASSIVE_SKILLS_TEST_DATA} from '../model/skill.model.spec';

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

      const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);

      const plainSkill1: Skill = skills['100010'];
      plainSkill1.gumi_id = 100010;

      const plainSkill2: Skill = skills['230020'];
      plainSkill2.gumi_id = 230020;

      const plainSkill3: Skill = skills['234232'];
      plainSkill3.gumi_id = 234232;

      character.skills = JSON.parse('[' +
        '{"rarity": 2, "level": 3, "type": "ABILITY", "id": 100010},' +
        '{"rarity": 2, "level": 8, "type": "MAGIC", "id": 230020},' +
        '{"rarity": 2, "level": 17, "type": "ABILITY", "id": 234232}' +
        ']');
      character.skills[0].skill = Skill.produce(plainSkill1);
      character.skills[1].skill = Skill.produce(plainSkill2);
      character.skills[2].skill = Skill.produce(plainSkill3);

      character.entries['100000102'].characterEntrySkills = character.skills;

      // WHEN
    const uniteCarac = CharacterEntryStatsMapper.toUniteCarac(character.entries[100000102].stats, unite, character.entries['100000102'].characterEntrySkills);

      // THEN
      expect(uniteCarac.getBonusBasePercent()).toEqual(new Caracteristiques(10, 20, 0, 20, 0, 0));
    }
  );
});
