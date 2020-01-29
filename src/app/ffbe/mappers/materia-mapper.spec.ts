import {Objet} from '../model/objet/objet.model';
import {MateriaMapper} from './materia-mapper';
import {MATERIAS_TEST_DATA} from '../model/materia.model.spec';
import {Materia} from '../model/materia.model';
import {FfbeUtils} from '../utils/ffbe-utils';

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
});
