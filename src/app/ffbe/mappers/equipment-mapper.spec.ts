import {Objet} from '../model/objet/objet.model';
import {FfbeUtils} from '../utils/ffbe-utils';
import {EQUIPMENTS_TEST_DATA} from '../model/equipment/equipment.model.spec';
import {EquipmentMapper} from './equipment-mapper';
import {Equipment} from '../model/equipment/equipment.model';
import {CharactersServiceMock} from '../services/characters.service.spec';
import {CharactersService} from '../services/characters.service';
import {CHARACTER_TEST_DATA} from '../model/character.model.spec';
import {Character} from '../model/character.model';
import {Caracteristiques} from '../model/caracteristiques.model';
import {PASSIVE_SKILLS_TEST_DATA} from '../model/skill.model.spec';
import {Skill} from '../model/skill.model';

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
    spyOn(charactersServiceMock, 'searchForCharacterByGumiId').and.returnValue(character);
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
    spyOn(charactersServiceMock, 'searchForCharacterByGumiId').and.returnValues(character, character2);
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
    spyOn(charactersServiceMock, 'searchForCharacterByGumiId').and.returnValue(null);
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

    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);
    const skill: Skill = skills['100010'];
    equipment.dmSkills = [Skill.produce(skill)];

    // WHEN
    const objet: Objet = EquipmentMapper.toObjet(equipment);
    // THEN
    expect(objet.caracp).toEqual(new Caracteristiques(10, 0, 0, 0, 0, 0));
  });

});
