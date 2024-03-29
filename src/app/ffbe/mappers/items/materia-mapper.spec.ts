import {Objet} from '../../model/objet/objet.model';
import {MateriaMapper} from './materia-mapper';
import {MATERIAS_TEST_DATA} from '../../model/items/materia/materia.model.spec';
import {Materia} from '../../model/items/materia/materia.model';
import {FfbeUtils} from '../../utils/ffbe-utils';
import {SkillMockDataHelper} from '../../model/skill.model.spec';
import {Skill} from '../../model/skill.model';
import {Caracteristiques} from '../../model/caracteristiques.model';
import {ResistancesElementaires} from '../../model/resistances-elementaires.model';
import {ResistancesAlterations} from '../../model/resistances-alterations.model';
import {Tueurs} from '../../model/tueurs.model';

describe('MateriaMapper', () => {
  it('should transform materia raw data into Objet', () => {
    // GIVEN
    const materias = JSON.parse(MATERIAS_TEST_DATA);
    const materia: Materia = materias['504100090'];
    materia.gumi_id = 504100090;
    // WHEN
    const objet: Objet = MateriaMapper.toObjet(materia);
    // THEN
    expect(objet.id).toBeNull();
    expect(objet.gumi_id).toEqual(504100090);
    expect(objet.categorie).toEqual(FfbeUtils.findObjetCategorieByFfchId(57));
    expect(objet.stars).toEqual(null);
    expect(objet.icone).toEqual(null);
    expect(objet.nom).toEqual('ATT +30%');
    expect(objet.nom_en).toEqual('ATK +30%');
    expect(objet.description).toEqual('Augmente l\'ATT de 30%');
    expect(objet.effet).toBeFalsy();
    expect(objet.effet_en).toEqual('Grants \'ATK +30%\' passive.');
    expect(objet.extended_gumi_id).toEqual('22:504100090');
  });

  it('should fallback to long description if short is missing', () => {
    // GIVEN
    const materias = JSON.parse(MATERIAS_TEST_DATA);
    const materia: Materia = materias['504100090'];
    materia.gumi_id = 504100090;
    materia.strings.desc_short = [null, null, null, null, null, null];
    // WHEN
    const objet: Objet = MateriaMapper.toObjet(materia);
    // THEN
    expect(objet.description).toEqual('Augmente l\'ATT de 30%.');
  });

  it('should parse passive Caracteristiques increases', () => {
    // GIVEN
    const materias = JSON.parse(MATERIAS_TEST_DATA);
    const materia: Materia = materias['504100090'];
    materia.gumi_id = 504100090;

    const skill: Skill = SkillMockDataHelper.mockPassiveSkill(100090);
    materia.dmSkills = [skill];

    // WHEN
    const objet: Objet = MateriaMapper.toObjet(materia);
    // THEN
    expect(objet.getBonusBasePercent()).toEqual(new Caracteristiques(0, 0, 30, 0, 0, 0));
  });

  it('should parse passive increases to materia Caracteristiques when dual-wielding', () => {
    // GIVEN
    const materias = JSON.parse(MATERIAS_TEST_DATA);
    const materia: Materia = materias['504231562'];
    materia.gumi_id = 504231562;

    const skill: Skill = SkillMockDataHelper.mockPassiveSkill(231562);
    materia.dmSkills = [skill];

    // WHEN
    const objet: Objet = MateriaMapper.toObjet(materia);
    // THEN
    expect(objet.getBonusDualWieldPercent()).toEqual(new Caracteristiques(0, 0, 100, 0, 0, 0));
  });

  it('should parse passive increases to element resistances', () => {
    // GIVEN
    const materias = JSON.parse(MATERIAS_TEST_DATA);
    const materia: Materia = materias['504232511'];
    materia.gumi_id = 504232511;

    const skill: Skill = SkillMockDataHelper.mockPassiveSkill(232511);
    materia.dmSkills = [skill];

    // WHEN
    const objet: Objet = MateriaMapper.toObjet(materia);
    // THEN
    expect(objet.elements).toEqual(new ResistancesElementaires(30, 30, 30, 30, 30, 30, 30, 30));
  });

  it('should parse passive increases to ailment resistances correctly', () => {
    // GIVEN
    const materias = JSON.parse(MATERIAS_TEST_DATA);
    const materia: Materia = materias['504232511'];
    materia.gumi_id = 504232511;

    const skill: Skill = SkillMockDataHelper.mockPassiveSkill(232511);
    materia.dmSkills = [skill];

    // WHEN
    const objet: Objet = MateriaMapper.toObjet(materia);
    // THEN
    expect(objet.resistancesAlterations).toEqual(new ResistancesAlterations(0, 0, 0, 0, 100, 100, 0, 0));
  });

  it('should cap passive increases to ailment resistances att 100% correctly', () => {
    // GIVEN
    const materias = JSON.parse(MATERIAS_TEST_DATA);
    const materia: Materia = materias['504232511'];
    materia.gumi_id = 504232511;
    materia.skills = [232511, 232511];

    const skill: Skill = SkillMockDataHelper.mockPassiveSkill(232511);
    materia.dmSkills = [skill, skill];

    // WHEN
    const objet: Objet = MateriaMapper.toObjet(materia);
    // THEN
    expect(objet.resistancesAlterations).toEqual(new ResistancesAlterations(0, 0, 0, 0, 100, 100, 0, 0));
  });

  it('should parse passive physical killers from skills correctly', () => {
    // GIVEN
    const materias = JSON.parse(MATERIAS_TEST_DATA);
    const materia: Materia = materias['504204030'];
    materia.gumi_id = 504204030;

    const skill: Skill = SkillMockDataHelper.mockPassiveSkill(204030);
    materia.dmSkills = [skill];

    // WHEN
    const objet: Objet = MateriaMapper.toObjet(materia);
    // THEN
    expect(objet.tueursPhysiques).toEqual(new Tueurs(0, 0, 50, 0, 0, 0, 50, 0, 0, 0, 0, 0));
  });

  it('should parse passive physical killers from skills into database representation correctly', () => {
    // GIVEN
    const materias = JSON.parse(MATERIAS_TEST_DATA);
    const materia: Materia = materias['504204030'];
    materia.gumi_id = 504204030;

    const skill: Skill = SkillMockDataHelper.mockPassiveSkill(204030);
    materia.dmSkills = [skill];

    // WHEN
    const objet: Objet = MateriaMapper.toObjet(materia);
    // THEN
    expect(objet.tueurs).toEqual('50,0,0,0,50,0,0,0,0,0,0,0');
  });

  it('should parse passive magical killers from skills correctly', () => {
    // GIVEN
    const materias = JSON.parse(MATERIAS_TEST_DATA);
    const materia: Materia = materias['504230563'];
    materia.gumi_id = 504230563;

    const skill: Skill = SkillMockDataHelper.mockPassiveSkill(230563);
    materia.dmSkills = [skill];

    // WHEN
    const objet: Objet = MateriaMapper.toObjet(materia);
    // THEN
    expect(objet.tueursMagiques).toEqual(new Tueurs(0, 0, 0, 0, 50, 0, 0, 0, 50, 0, 50, 0));
  });

  it('should parse passive magical killers from skills into database representation correctly', () => {
    // GIVEN
    const materias = JSON.parse(MATERIAS_TEST_DATA);
    const materia: Materia = materias['504230563'];
    materia.gumi_id = 504230563;

    const skill: Skill = SkillMockDataHelper.mockPassiveSkill(230563);
    materia.dmSkills = [skill];

    // WHEN
    const objet: Objet = MateriaMapper.toObjet(materia);
    // THEN
    expect(objet.tueurs_m).toEqual('0,0,0,0,0,0,50,50,0,50,0,0');
  });

});
