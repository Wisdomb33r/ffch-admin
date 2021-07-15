import {Objet} from '../../model/objet/objet.model';
import {FfbeUtils} from '../../utils/ffbe-utils';
import {EQUIPMENTS_TEST_DATA} from '../../model/items/equipment/equipment.model.spec';
import {EquipmentMapper} from './equipment-mapper';
import {Equipment} from '../../model/items/equipment/equipment.model';
import {CharactersServiceMock} from '../../services/characters.service.spec';
import {CharactersService} from '../../services/characters.service';
import {CHARACTER_TEST_DATA} from '../../model/character/character.model.spec';
import {Character} from '../../model/character/character.model';
import {Caracteristiques} from '../../model/caracteristiques.model';
import {SkillMockDataHelper} from '../../model/skill.model.spec';
import {Skill} from '../../model/skill.model';
import {ResistancesElementaires} from '../../model/resistances-elementaires.model';
import {ResistancesAlterations} from '../../model/resistances-alterations.model';
import {Tueurs} from '../../model/tueurs.model';

describe('EquipmentMapper', () => {
  it('should transform equipment raw data into Objet', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['301000200'];
    equipment.gumi_id = 301000200;
    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.id).toBeNull();
    expect(objet.gumi_id).toEqual(301000200);
    expect(objet.categorie).toEqual(FfbeUtils.findObjetCategorieByFfchId(16));
    expect(objet.stars).toEqual(1);
    expect(objet.icone).toEqual(null);
    expect(objet.nom).toEqual('Couteau en bronze');
    expect(objet.nom_en).toEqual('Bronze Knife');
    expect(objet.description).toEqual('Couteau fait de bronze.');
    expect(objet.description_en).toEqual('A dagger made of bronze.');
    expect(objet.effet).toBeFalsy();
    expect(objet.effet_en).toBeFalsy();
    expect(objet.extended_gumi_id).toEqual('21:301000200');
  });

  it('should fallback to long description if short is missing', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['301000200'];
    equipment.gumi_id = 301000200;
    equipment.strings.desc_short = [null, null, null, null, null, null];
    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.description).toEqual('Un couteau en bronze possédant un seul côté tranchant.');
  });

  it('should parse female character requirement', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['301000200'];
    equipment.gumi_id = 301000200;
    equipment.requirements = ['SEX', 2];
    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.effet).toEqual('Exclusif aux personnages de sexe féminin');
  });

  it('should parse male character requirement', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['301000200'];
    equipment.gumi_id = 301000200;
    equipment.requirements = ['SEX', 1];
    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.effet).toEqual('Exclusif aux personnages de sexe masculin');
  });

  it('should parse character identifier requirement', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['301000200'];
    equipment.gumi_id = 301000200;
    equipment.requirements = ['UNIT_ID', 100000102];

    const characters = JSON.parse(CHARACTER_TEST_DATA);
    const character: Character = characters['100000102'];
    character.gumi_id = 100000102;
    const charactersServiceMock = new CharactersServiceMock() as CharactersService;
    CharactersService['INSTANCE'] = charactersServiceMock;
    spyOn(charactersServiceMock, 'searchForShallowCharacterByGumiId').and.returnValue(character);
    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.effet).toEqual('Exclusif à <a href="ffexvius_units.php?gumiid=100000102">Rain</a>');
  });

  it('should parse characters identifiers requirement', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['301000200'];
    equipment.gumi_id = 301000200;
    equipment.requirements = ['UNIT_ID', [100000102, 100016205]];

    const characters = JSON.parse(CHARACTER_TEST_DATA);
    const character: Character = characters['100000102'];
    character.gumi_id = 100000102;
    const character2: Character = characters['100016205'];
    character2.gumi_id = 100016205;
    const charactersServiceMock = new CharactersServiceMock() as CharactersService;
    CharactersService['INSTANCE'] = charactersServiceMock;
    spyOn(charactersServiceMock, 'searchForShallowCharacterByGumiId').and.returnValues(character, character2);
    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.effet).toEqual('Exclusif à <a href="ffexvius_units.php?gumiid=100000102">Rain</a>, <a href="ffexvius_units.php?gumiid=100016205">Hyoh</a>');
  });

  it('should parse unknown character identifier requirement', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['301000200'];
    equipment.gumi_id = 301000200;
    equipment.requirements = ['UNIT_ID', [100000102, 100016205]];

    const charactersServiceMock = new CharactersServiceMock() as CharactersService;
    CharactersService['INSTANCE'] = charactersServiceMock;
    spyOn(charactersServiceMock, 'searchForShallowCharacterByGumiId').and.returnValue(null);
    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.effet).toEqual('Exclusif à UNKNOWN character, UNKNOWN character');
  });

  it('should parse passive Caracteristiques increases', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['409013500'];
    equipment.gumi_id = 409013500;

    const skill: Skill = SkillMockDataHelper.mockPassiveSkill(100010);
    equipment.dmSkills = [skill];

    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.getBonusBasePercent()).toEqual(new Caracteristiques(10, 0, 0, 0, 0, 0));
  });

  it('should parse passive increases to equipment Caracteristiques when dual-wielding', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['409029600'];
    equipment.gumi_id = 409029600;

    const skill: Skill = SkillMockDataHelper.mockPassiveSkill(230650);
    equipment.dmSkills = [skill];

    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.getBonusDualWieldPercent()).toEqual(new Caracteristiques(0, 0, 50, 0, 0, 0));
  });

  it('should filter out passive increases to equipment Caracteristiques when dual-wielding that have unit restrictions', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['1100000184'];
    equipment.gumi_id = 1100000184;

    const skill1: Skill = SkillMockDataHelper.mockPassiveSkill(911268);
    const skill2: Skill = SkillMockDataHelper.mockPassiveSkill(912847);
    equipment.dmSkills = [skill1, skill2];

    const charactersServiceMock = new CharactersServiceMock() as CharactersService;
    CharactersService['INSTANCE'] = charactersServiceMock;
    spyOn(charactersServiceMock, 'searchForCharacterByGumiId').and.returnValue(null);

    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.getBonusDualWieldPercent()).toEqual(new Caracteristiques(0, 0, 25, 0, 0, 0));
  });

  it('should parse passive increases to equipment Caracteristiques when single-wielding a one-handed weapon', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['1100000056'];
    equipment.gumi_id = 1100000056;

    const skill: Skill = SkillMockDataHelper.mockPassiveSkill(101360);
    equipment.dmSkills = [skill];

    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.getBonusDoublehandPercent()).toEqual(new Caracteristiques(0, 0, 50, 0, 0, 0));
  });

  it('should parse passive increases to equipment Caracteristiques when single-wielding any weapon', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['1100000215'];
    equipment.gumi_id = 1100000215;

    const skill: Skill = SkillMockDataHelper.mockPassiveSkill(911627);
    equipment.dmSkills = [skill];

    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.getBonusTrueDoublehandPercent()).toEqual(new Caracteristiques(0, 0, 50, 0, 50, 0));
  });

  it('should parse passive element resistances from equipment stats correctly', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['1100000369'];
    equipment.gumi_id = 1100000369;

    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.elements).toEqual(new ResistancesElementaires(15, 15, 0, 0, 15, 15, 0, 0));
  });

  it('should parse passive element resistances from skills correctly', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['405004800'];
    equipment.gumi_id = 405004800;

    const skill: Skill = SkillMockDataHelper.mockPassiveSkill(226886);
    equipment.dmSkills = [skill];

    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.elements).toEqual(new ResistancesElementaires(30, 0, 0, 30, 30, 30, 0, 0));
  });

  it('should parse passive element resistances from stats and skills correctly', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['1100000369'];
    equipment.gumi_id = 1100000369;
    equipment.skills = [226886];

    const skill: Skill = SkillMockDataHelper.mockPassiveSkill(226886);
    equipment.dmSkills = [skill];

    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.elements).toEqual(new ResistancesElementaires(45, 15, 0, 30, 45, 45, 0, 0));
  });

  it('should parse passive element inflicts from equipment stats correctly', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['301003500'];
    equipment.gumi_id = 301003500;

    const skill1: Skill = SkillMockDataHelper.mockPassiveSkill(100020);
    const skill2: Skill = SkillMockDataHelper.mockPassiveSkill(227937);
    equipment.dmSkills = [skill1, skill2];

    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);

    // THEN
    expect(objet.resistancesElementaires).toEqual(new ResistancesElementaires(20, 20, 20, 20, 20, 20, 20, 20));
    expect(objet.elementsArme).toEqual(new ResistancesElementaires(1000, null, null, null, null, null, null, null));
    expect(objet.elements).toEqual(new ResistancesElementaires(1020, 20, 20, 20, 20, 20, 20, 20));
  });

  it('should parse passive element resistances and inflicts from equipment stats and skills correctly', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['301003500'];
    equipment.gumi_id = 301003500;
    equipment.stats.element_resist = equipments['1100000369'].stats.element_resist;

    const skill1: Skill = SkillMockDataHelper.mockPassiveSkill(100020);
    const skill2: Skill = SkillMockDataHelper.mockPassiveSkill(227937);
    equipment.dmSkills = [skill1, skill2];

    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);

    // THEN
    expect(objet.resistancesElementaires).toEqual(new ResistancesElementaires(35, 35, 20, 20, 35, 35, 20, 20));
    expect(objet.elementsArme).toEqual(new ResistancesElementaires(1000, null, null, null, null, null, null, null));
    expect(objet.elements).toEqual(new ResistancesElementaires(1035, 35, 20, 20, 35, 35, 20, 20));
  });

  it('should parse passive ailment resistances from equipment stats correctly', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['409001700'];
    equipment.gumi_id = 409001700;

    const skill: Skill = SkillMockDataHelper.mockPassiveSkill(228182);
    equipment.dmSkills = [skill];

    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.resistancesAlterations).toEqual(new ResistancesAlterations(0, 0, 0, 0, 0, 0, 0, 100));
  });

  it('should parse passive ailment resistances from skills correctly', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['301000200'];
    equipment.gumi_id = 301000200;
    equipment.skills = [232511];

    const skill: Skill = SkillMockDataHelper.mockPassiveSkill(232511);
    equipment.dmSkills = [skill];

    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.resistancesAlterations).toEqual(new ResistancesAlterations(0, 0, 0, 0, 100, 100, 0, 0));
  });

  it('should parse passive ailment resistances from stats and skills correctly', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['409001700'];
    equipment.gumi_id = 409001700;
    equipment.skills = [232511];

    const skill: Skill = SkillMockDataHelper.mockPassiveSkill(232511);
    equipment.dmSkills = [skill];

    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.resistancesAlterations).toEqual(new ResistancesAlterations(0, 0, 0, 0, 100, 100, 0, 100));
  });

  it('should cap passive ailment resistances at 100% correctly', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['1100000237'];
    equipment.gumi_id = 1100000237;

    const skill1: Skill = SkillMockDataHelper.mockPassiveSkill(911899);
    const skill2: Skill = SkillMockDataHelper.mockPassiveSkill(100160);
    equipment.dmSkills = [skill1, skill2];

    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.resistancesAlterations).toEqual(new ResistancesAlterations(100, 100, 100, 100, 100, 100, 100, 100));
  });

  it('should parse passive physical killers from skills correctly', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['409012200'];
    equipment.gumi_id = 409012200;

    const skill: Skill = SkillMockDataHelper.mockPassiveSkill(213190);
    equipment.dmSkills = [skill];

    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.tueursPhysiques).toEqual(new Tueurs(15, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 0));
  });

  it('should parse passive physical killers from skills into database representation correctly', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['409012200'];
    equipment.gumi_id = 409012200;

    const skill: Skill = SkillMockDataHelper.mockPassiveSkill(213190);
    equipment.dmSkills = [skill];

    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.tueurs).toEqual('0,15,0,0,15,0,0,0,0,0,0,0');
  });

  it('should parse passive magical killers from skills correctly', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['1100000362'];
    equipment.gumi_id = 1100000362;

    const skill1: Skill = SkillMockDataHelper.mockPassiveSkill(910229);
    const skill2: Skill = SkillMockDataHelper.mockPassiveSkill(913476);
    equipment.dmSkills = [skill1, skill2];

    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.tueursMagiques).toEqual(new Tueurs(0, 0, 0, 0, 0, 50, 75, 0, 0, 0, 0, 0));
  });

  it('should parse passive magical killers from skills into database representation correctly', () => {
    // GIVEN
    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['1100000362'];
    equipment.gumi_id = 1100000362;

    const skill1: Skill = SkillMockDataHelper.mockPassiveSkill(910229);
    const skill2: Skill = SkillMockDataHelper.mockPassiveSkill(913476);
    equipment.dmSkills = [skill1, skill2];

    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.tueurs_m).toEqual('0,0,0,0,75,0,0,0,50,0,0,0');
  });

});
