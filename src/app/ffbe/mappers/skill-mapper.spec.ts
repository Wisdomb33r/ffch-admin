import {Skill} from '../model/skill.model';
import {Competence} from '../model/competence.model';
import {SkillMapper} from './skill-mapper';
import {
  ABILITY_SKILLS_NAMES_TEST_DATA,
  ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA,
  ABILITY_SKILLS_TEST_DATA,
  MAGIC_SKILLS_NAMES_TEST_DATA,
  MAGIC_SKILLS_SHORTDESCRIPTIONS_TEST_DATA,
  MAGIC_SKILLS_TEST_DATA,
  PASSIVE_SKILLS_TEST_DATA
} from '../model/skill.model.spec';
import {EQUIPMENTS_TEST_DATA} from '../model/items/equipment/equipment.model.spec';
import {Equipment} from '../model/items/equipment/equipment.model';
import {EquipmentsServiceMock} from '../services/equipments.service.spec';
import {EquipmentsService} from '../services/equipments.service';
import {MATERIAS_TEST_DATA} from '../model/items/materia/materia.model.spec';
import {MateriasService} from '../services/materias.service';
import {MateriasServiceMock} from '../services/materias.service.spec';
import {Materia} from '../model/items/materia/materia.model';
import {CHARACTER_TEST_DATA} from '../model/character/character.model.spec';
import {Character} from '../model/character/character.model';
import {CharactersServiceMock} from '../services/characters.service.spec';
import {CharactersService} from '../services/characters.service';
import {
  VISION_CARDS_DESCRIPTION_TEST_DATA,
  VISION_CARDS_NAMES_TEST_DATA,
  VISION_CARDS_TEST_DATA
} from '../model/items/vision-cards/vision-card.model.spec';
import {VisionCard} from '../model/items/vision-cards/vision-card.model';
import {VisionCardsService} from '../services/vision-cards.service';
import {VisionCardsServiceMock} from '../services/vision-cards.service.spec';

describe('SkillMapper', () => {
  it('should transform ability icon string to number', () => {
    // GIVEN
    const skills = JSON.parse(MAGIC_SKILLS_TEST_DATA);
    const skill: Skill = skills['10010'];
    const names = JSON.parse(MAGIC_SKILLS_NAMES_TEST_DATA);
    skill.names = names['10010'];
    const descriptions = JSON.parse(MAGIC_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['10010'];
    skill.icon = 'ability_79.png';
    // WHEN
    const competence: Competence = SkillMapper.toCompetence(Skill.produce(skill));
    // THEN
    expect(competence.icone).toEqual(79);
  });

  it('should transform ability icon string with more than 2 digits to number', () => {
    // GIVEN
    const skills = JSON.parse(MAGIC_SKILLS_TEST_DATA);
    const skill: Skill = skills['10010'];
    const names = JSON.parse(MAGIC_SKILLS_NAMES_TEST_DATA);
    skill.names = names['10010'];
    const descriptions = JSON.parse(MAGIC_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['10010'];
    skill.icon = 'ability_9876.png';
    // WHEN
    const competence: Competence = SkillMapper.toCompetence(Skill.produce(skill));
    // THEN
    expect(competence.icone).toEqual(9876);
  });

  it('should combine correctly hits, frames, and damages if effects do not overlap', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const skill: Skill = skills['509624'];
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    skill.names = names['509624'];
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['509624'];
    skill.active = true;
    skill.type = 'ABILITY';
    skill.attack_type = 'Physical';
    // WHEN
    const competence: Competence = SkillMapper.toCompetence(Skill.produce(skill));
    // THEN
    expect(competence.hits).toEqual(8);
    expect(competence.frames).toEqual('70 76 82 88 94 100 106 112');
    expect(competence.damages).toEqual('0 0 0 0 0 0 0 0');
  });

  it('should combine correctly hits, frames, and damages when effects overlap', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const skill: Skill = skills['912882'];
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    skill.names = names['912882'];
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['912882'];
    skill.active = true;
    skill.type = 'ABILITY';
    skill.attack_type = 'Physical';
    // WHEN
    const competence: Competence = SkillMapper.toCompetence(Skill.produce(skill));
    // THEN
    expect(competence.hits).toEqual(14);
    expect(competence.frames).toEqual('35 40 45 50 55 60 65 70 75 80 85 90 95 100');
    expect(competence.damages).toEqual('0 0 0 0 0 0 0 0 0 0 0 0 0 0');
  });

  it('should combine correctly hits, frames, and damages when no effects deal damages', () => {
    // GIVEN
    const skills = JSON.parse(MAGIC_SKILLS_TEST_DATA);
    const skill: Skill = skills['10010'];
    const names = JSON.parse(MAGIC_SKILLS_NAMES_TEST_DATA);
    skill.names = names['10010'];
    const descriptions = JSON.parse(MAGIC_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['10010'];
    skill.active = true;
    skill.type = 'ABILITY';
    skill.attack_type = 'Hybrid';
    // WHEN
    const competence: Competence = SkillMapper.toCompetence(Skill.produce(skill));
    // THEN
    expect(competence.hits).toEqual(1);
    expect(competence.frames).toEqual('130');
    expect(competence.damages).toEqual('100');
  });

  it('should map requirements correctly into a text', () => {
    // GIVEN
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);
    const skill: Skill = skills['100010'];
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    skill.names = names['100010'];
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['100010'];
    skill.requirements = [['EQUIP', '301000400'], ['EQUIP', '504231141'], ['EQUIP', '401001101']];

    const equipments = JSON.parse(EQUIPMENTS_TEST_DATA);
    const equipment: Equipment = equipments['301000400'];
    equipment.gumi_id = 301000400;
    const equipmentsServiceMock = new EquipmentsServiceMock() as EquipmentsService;
    EquipmentsService['INSTANCE'] = equipmentsServiceMock;
    spyOn(equipmentsServiceMock, 'searchForEquipmentByGumiId').and.returnValues(equipment, null, null);

    const materias = JSON.parse(MATERIAS_TEST_DATA);
    const materia: Materia = materias['504100090'];
    materia.gumi_id = 504100090;
    const materiasServiceMock = new MateriasServiceMock() as MateriasService;
    MateriasService['INSTANCE'] = materiasServiceMock;
    spyOn(materiasServiceMock, 'searchForMateriaByGumiId').and.returnValues(materia, null);

    const vcs = JSON.parse(VISION_CARDS_TEST_DATA);
    const vcsNames = JSON.parse(VISION_CARDS_NAMES_TEST_DATA);
    const vcsDescriptions = JSON.parse(VISION_CARDS_DESCRIPTION_TEST_DATA);
    const vc: VisionCard = vcs['401001101'];
    vc.gumi_id = 401001101;
    vc.names = vcsNames['401001101'];
    vc.desc_short = vcsNames['401001101'];
    const vcsServiceMock = new VisionCardsServiceMock() as VisionCardsService;
    VisionCardsService['INSTANCE'] = vcsServiceMock;
    spyOn(vcsServiceMock, 'searchForVisionCardByGumiId').and.returnValues(vc);

    // WHEN
    const reqText = SkillMapper['mapRequirements'](skill);
    // THEN
    expect(reqText).toEqual('Activé si l\'unité porte <a href="ffexvius_objects.php?gumiid=301000400">Dague</a> '
      + 'ou <a href="ffexvius_objects.php?gumiid=504100090">ATT +30%</a> ou <a href="ffexvius_objects.php?gumiid=401001101">Une famille réunie</a>');
    expect(equipmentsServiceMock.searchForEquipmentByGumiId).toHaveBeenCalledTimes(3);
    expect(materiasServiceMock.searchForMateriaByGumiId).toHaveBeenCalledTimes(2);
    expect(vcsServiceMock.searchForVisionCardByGumiId).toHaveBeenCalledTimes(1);
  });

  it('should map unit restrictions correctly into a text', () => {
    // GIVEN
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);
    const skill: Skill = skills['100010'];
    skill.unit_restriction = [100000102, 100000103];

    const characters = JSON.parse(CHARACTER_TEST_DATA);
    const character: Character = characters['100000102'];
    character.gumi_id = 100000102;
    const charactersServiceMock = new CharactersServiceMock() as CharactersService;
    CharactersService['INSTANCE'] = charactersServiceMock;
    spyOn(charactersServiceMock, 'searchForCharacterByGumiId').and.returnValues(character, null);

    // WHEN
    const reqText = SkillMapper['mapUnitRestrictions'](skill);
    // THEN
    expect(reqText).toEqual('Exclusif à <a href="ffexvius_units.php?gumiid=100000102">Rain</a>');
  });

  it('should map unit restrictions correctly into a text for multiple units', () => {
    // GIVEN
    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);
    const skill: Skill = skills['100010'];
    skill.unit_restriction = [100000102, 100000103, 207000305, 207000306, 207000307];

    const characters = JSON.parse(CHARACTER_TEST_DATA);
    const character: Character = characters['100000102'];
    character.gumi_id = 100000102;
    const character2: Character = characters['207000305'];
    character2.gumi_id = 207000305;
    const charactersServiceMock = new CharactersServiceMock() as CharactersService;
    CharactersService['INSTANCE'] = charactersServiceMock;
    spyOn(charactersServiceMock, 'searchForCharacterByGumiId').and.returnValues(character, null, character2, null, null);

    // WHEN
    const reqText = SkillMapper['mapUnitRestrictions'](skill);
    // THEN
    expect(reqText).toEqual('Exclusif à <a href="ffexvius_units.php?gumiid=100000102">Rain</a>, <a href="ffexvius_units.php?gumiid=207000305">Tifa</a>');
  });

  it('should map neutral damages correctly', () => {
    // GIVEN
    const skills = JSON.parse(MAGIC_SKILLS_TEST_DATA);
    const skill: Skill = skills['20430'];
    const names = JSON.parse(MAGIC_SKILLS_NAMES_TEST_DATA);
    skill.names = names['20430'];
    const descriptions = JSON.parse(MAGIC_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['20430'];
    // WHEN
    const competence: Competence = SkillMapper.toCompetence(Skill.produce(skill));
    // THEN
    expect(competence.elements).toEqual('0');
  });

  it('should map elemental damages correctly', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const skill: Skill = skills['509024'];
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    skill.names = names['509024'];
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['509024'];
    // WHEN
    const competence: Competence = SkillMapper.toCompetence(Skill.produce(skill));
    // THEN
    expect(competence.elements).toEqual('7');
  });

  it('should map dual-element damages correctly', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const skill: Skill = skills['912221'];
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    skill.names = names['912221'];
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['912221'];
    // WHEN
    const competence: Competence = SkillMapper.toCompetence(Skill.produce(skill));
    // THEN
    expect(competence.elements).toEqual('3,5');
  });

  it('should map blue magic spells correctly', () => {
    // GIVEN
    const skills = JSON.parse(MAGIC_SKILLS_TEST_DATA);
    const skill: Skill = skills['40140'];
    skill.active = true;
    skill.type = 'MAGIC';
    const names = JSON.parse(MAGIC_SKILLS_NAMES_TEST_DATA);
    skill.names = names['40140'];
    const descriptions = JSON.parse(MAGIC_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['40140'];
    // WHEN
    const competence: Competence = SkillMapper.toCompetence(Skill.produce(skill));
    // THEN
    expect(competence.categorie).toEqual(10);
  });

  it('should map skill power calculation to puissance field', () => {
    // GIVEN
    const skills = JSON.parse(ABILITY_SKILLS_TEST_DATA);
    const skill: Skill = skills['509624'];
    skill.active = true;
    const names = JSON.parse(ABILITY_SKILLS_NAMES_TEST_DATA);
    skill.names = names['509624'];
    const descriptions = JSON.parse(ABILITY_SKILLS_SHORTDESCRIPTIONS_TEST_DATA);
    skill.descriptions = descriptions['509624'];
    // WHEN
    const competence: Competence = SkillMapper.toCompetence(Skill.produce(skill));
    // THEN
    expect(competence.puissance).toEqual(1150);
  });

});
