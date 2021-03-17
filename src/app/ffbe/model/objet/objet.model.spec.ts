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

  it('should analyse Objet as different when the \"Categorie\" differs', () => {
    // GIVEN
    const objet1 = createTestObjet();
    const objet2 = createTestObjet();
    objet2.categorie = FfbeUtils.findObjetCategorieByGumiId(2);

    // WHEN + THEN
    expect(objet1.isDifferent(objet2)).toBeTrue();
  });

  it('should analyse Objet as different when the \"nom\" differs', () => {
    // GIVEN
    const objet1 = createTestObjet();
    const objet2 = createTestObjet();
    objet2.nom = 'Casque';

    // WHEN + THEN
    expect(objet1.isDifferent(objet2)).toBeTrue();
  });

  it('should analyse Objet as different when the \"nom_en\" differs', () => {
    // GIVEN
    const objet1 = createTestObjet();
    const objet2 = createTestObjet();
    objet2.nom_en = 'Helmet';

    // WHEN + THEN
    expect(objet1.isDifferent(objet2)).toBeTrue();
  });

  it('should analyse Objet as different when the \"stars\" differs', () => {
    // GIVEN
    const objet1 = createTestObjet();
    const objet2 = createTestObjet();
    objet2.stars = 3;

    // WHEN + THEN
    expect(objet1.isDifferent(objet2)).toBeTrue();
  });

  it('should analyse Objet as different when the \"gumi_id\" differs', () => {
    // GIVEN
    const objet1 = createTestObjet();
    const objet2 = createTestObjet();
    objet2.gumi_id = 2;

    // WHEN + THEN
    expect(objet1.isDifferent(objet2)).toBeTrue();
  });

  it('should analyse Objet as different when the \"description\" differs', () => {
    // GIVEN
    const objet1 = createTestObjet();
    const objet2 = createTestObjet();
    objet2.description = 'Une merveilleuse casserole venue d\'un autre monde';

    // WHEN + THEN
    expect(objet1.isDifferent(objet2)).toBeTrue();
  });

  function createTestObjet(): Objet {
    return new Objet(
      1,
      FfbeUtils.findObjetCategorieByGumiId(1),
      'Casserole',
      'Saucepan',
      1,
      '',
      1,
      'Une magnifique casserole venue d\'un autre monde',
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
