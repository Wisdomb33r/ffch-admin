import {SkillMockDataHelper} from '../model/skill.model.spec';
import {Skill} from '../model/skill.model';
import {CHARACTER_TEST_DATA} from '../model/character/character.model.spec';
import {Character} from '../model/character/character.model';
import {CharacterEntryMapper} from './character-entry-mapper';
import {Caracteristiques} from '../model/caracteristiques.model';
import {Unite} from '../model/unite.model';
import {LIMIT_BURST_NAMES_TEST_DATA, LIMIT_BURST_TEST_DATA} from '../model/limit-burst.model.spec';
import {LimitBurst} from '../model/limit-burst.model';

describe('CharacterEntryMapper', function () {
  it('should parse EX stats of non-NeoVision unit correctly', () => {
    // GIVEN
    const skill1: Skill = SkillMockDataHelper.mockPassiveSkill(100021);
    const skill2: Skill = SkillMockDataHelper.mockAbilitySkill(232639);

    const characters = JSON.parse(CHARACTER_TEST_DATA);
    const character: Character = characters['207000305'];
    character.skills = JSON.parse('[' +
      '{"rarity": 5, "level": 39, "type": "ABILITY", "id": 100021},' +
      '{"rarity": 5, "level": 56, "type": "ABILITY", "id": 232639}' +
      ']');

    character.skills[0].skill = skill1;
    character.skills[1].skill = skill2;

    character.entries['207000305'].characterEntrySkills = character.skills;

    // WHEN
    const unite = CharacterEntryMapper.toUnite(character.entries['207000305'], 207000305, character, []);

    // THEN
    expect(unite).toBeTruthy();
    expect(unite.caracEX).toBeUndefined();
  });

  it('should parse EX stats of NeoVision unit correctly', () => {
    // GIVEN
    const skill1: Skill = SkillMockDataHelper.mockPassiveSkill(100021);
    const skill2: Skill = SkillMockDataHelper.mockAbilitySkill(232639);

    const characters = JSON.parse(CHARACTER_TEST_DATA);
    const character: Character = characters['207000305'];
    character.skills = JSON.parse('[' +
      '{"rarity": 5, "level": 39, "type": "ABILITY", "id": 100021},' +
      '{"rarity": 5, "level": 56, "type": "ABILITY", "id": 232639}' +
      ']');

    character.skills[0].skill = skill1;
    character.skills[1].skill = skill2;

    character.entries['207000317'].characterEntrySkills = character.skills;

    // WHEN
    const unite = CharacterEntryMapper.toUnite(character.entries['207000317'], 207000317, character, []);

    // THEN
    expect(unite).toBeTruthy();
    expect(unite.caracEX).toBeTruthy();
    expect(unite.caracEX.length).toEqual(3);
    expect(unite.caracEX[0].level).toEqual(121);
    expect(unite.caracEX[1].level).toEqual(122);
    expect(unite.caracEX[2].level).toEqual(123);
    expect(unite.caracEX[0].base).toEqual(new Caracteristiques(618, 31, 27, 22, 20, 24));
    expect(unite.caracEX[1].base).toEqual(new Caracteristiques(475, 24, 21, 17, 16, 19));
    expect(unite.caracEX[2].base).toEqual(new Caracteristiques(333, 17, 14, 12, 11, 13));
  });

  it('should parse LB correctly', () => {
    // GIVEN
    const lbs = JSON.parse(LIMIT_BURST_TEST_DATA);
    const lbsNames = JSON.parse(LIMIT_BURST_NAMES_TEST_DATA);
    const lb: LimitBurst = lbs['100031607'];
    lb.names = lbsNames['100031607'];
    const fakeUnite = new Unite(2185, 8, 100032707, 100032707);

    // WHEN
    CharacterEntryMapper['convertLimitBurst'](fakeUnite, lb, []);

    // THEN
    expect(fakeUnite.lim_min).toEqual('-120% de rés. Ténèbres aux adversaires pour ce tour<br />-75% PSY aux adversaires pour ce tour<br />Dégâts magiques de Ténèbres de puissance 6100% aux adversaires');
    expect(fakeUnite.lim_max).toEqual('-120% de rés. Ténèbres aux adversaires pour ce tour<br />-75% PSY aux adversaires pour ce tour<br />Dégâts magiques de Ténèbres de puissance 10000% aux adversaires');
    expect(fakeUnite.lim_hits).toEqual(24);
    expect(fakeUnite.lim_frames).toEqual('11 18 25 32 39 46 53 60 67 74 81 88 95 102 109 116 123 130 137 144 151 158 165 172');
    expect(fakeUnite.lim_damages).toEqual('2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 54');
  });

  it('should parse LB correctly when names are missing', () => {
    // GIVEN
    const lbs = JSON.parse(LIMIT_BURST_TEST_DATA);
    const lbsNames = JSON.parse(LIMIT_BURST_NAMES_TEST_DATA);
    const lb: LimitBurst = lbs['100031607'];
    lb.names = lbsNames['1234'];
    const fakeUnite = new Unite(2185, 8, 100032707, 100032707);

    // WHEN
    CharacterEntryMapper['convertLimitBurst'](fakeUnite, lb, []);

    // THEN
    expect(fakeUnite.limite).toEqual('WARN:Veracious Moon');
    expect(fakeUnite.limite_en).toEqual('WARN:Veracious Moon');
  });
});
