import {Objet} from '../model/objet/objet.model';
import {MateriaMapper} from './materia-mapper';
import {MATERIAS_TEST_DATA} from '../model/materia.model.spec';
import {Materia} from '../model/materia.model';
import {FfbeUtils} from '../utils/ffbe-utils';
import {PASSIVE_SKILLS_TEST_DATA} from '../model/skill.model.spec';
import {Skill} from '../model/skill.model';
import {Caracteristiques} from '../model/caracteristiques.model';
import {ResistancesElementaires} from '../model/resistances-elementaires.model';
import {ResistancesAlterations} from '../model/resistances-alterations.model';

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

    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);
    const skill: Skill = skills['100090'];
    materia.dmSkills = [Skill.produce(skill)];

    // WHEN
    const objet: Objet = MateriaMapper.toObjet(materia);
    // THEN
    expect(objet.getBonusBasePercent()).toEqual(new Caracteristiques(0, 0, 30, 0, 0, 0));
  });

  it('should parse passive increases to equipment Caracteristiques when dual-wielding', () => {
    // GIVEN
    const materias = JSON.parse(MATERIAS_TEST_DATA);
    const materia: Materia = materias['504231562'];
    materia.gumi_id = 504231562;

    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);
    const skill: Skill = skills['231562'];
    materia.dmSkills = [Skill.produce(skill)];

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

    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);
    const skill: Skill = skills['232511'];
    materia.dmSkills = [Skill.produce(skill)];

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

    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);
    const skill: Skill = skills['232511'];
    materia.dmSkills = [Skill.produce(skill)];

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

    const skills = JSON.parse(PASSIVE_SKILLS_TEST_DATA);
    const skill: Skill = skills['232511'];
    materia.dmSkills = [Skill.produce(skill), Skill.produce(skill)];

    // WHEN
    const objet: Objet = MateriaMapper.toObjet(materia);
    // THEN
    expect(objet.resistancesAlterations).toEqual(new ResistancesAlterations(0, 0, 0, 0, 100, 100, 0, 0));
  });
});
