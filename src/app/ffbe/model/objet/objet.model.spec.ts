import {Caracteristiques} from '../caracteristiques.model';
import {Objet} from './objet.model';
import {FfbeUtils} from '../../utils/ffbe-utils';
import {ResistancesElementaires} from '../resistances-elementaires.model';
import {ResistancesAlterations} from '../resistances-alterations.model';

describe('Objet', () => {
  it('should not analyse null Objet as different', () => {
    // GIVEN
    const objet1 = createTestObjet();
    const objet2 = null;

    // WHEN + THEN
    expect(objet1.isDifferent(objet2)).toBeFalse();
  });

  it('should analyse Objet with same values as equal', () => {
    // GIVEN
    const objet1 = createTestObjet();
    const objet2 = createTestObjet();

    // WHEN + THEN
    expect(objet1.isDifferent(objet2)).toBeFalse();
  });

  function createTestObjet(): Objet {
    return new Objet(
      1,
      FfbeUtils.findObjetCategorieByGumiId(1),
      '',
      '',
      1,
      '',
      1,
      '',
      '',
      '',
      '',
      new Caracteristiques(),
      new Caracteristiques(),
      new Caracteristiques(),
      new Caracteristiques(),
      new Caracteristiques(),
      new ResistancesElementaires(),
      new ResistancesAlterations(),
      '',
      '',
      []
    );
  }
});
