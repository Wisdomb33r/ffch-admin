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
    objet2.description = 'Une merveilleuse casserole d\'un autre monde';

    // WHEN + THEN
    expect(objet1.isDifferent(objet2)).toBeTrue();
  });

  it('should analyse Objet as different when the \"carac\" differs', () => {
    // GIVEN
    const objet1 = createTestObjet();
    const objet2 = createTestObjet();
    objet2.carac.att = 45;

    // WHEN + THEN
    expect(objet1.isDifferent(objet2)).toBeTrue();
  });

  it('should analyse Objet as different when the \"caracp\" differs', () => {
    // GIVEN
    const objet1 = createTestObjet();
    const objet2 = createTestObjet();
    objet2.caracp.def = 52;

    // WHEN + THEN
    expect(objet1.isDifferent(objet2)).toBeTrue();
  });

  it('should analyse Objet as different when the \"caracpDoublehand\" differs', () => {
    // GIVEN
    const objet1 = createTestObjet();
    const objet2 = createTestObjet();
    objet2.caracpDoublehand.mag = 41;

    // WHEN + THEN
    expect(objet1.isDifferent(objet2)).toBeTrue();
  });

  it('should analyse Objet as different when the \"caracpTrueDoublehand\" differs', () => {
    // GIVEN
    const objet1 = createTestObjet();
    const objet2 = createTestObjet();
    objet2.caracpTrueDoublehand.pv = 39;

    // WHEN + THEN
    expect(objet1.isDifferent(objet2)).toBeTrue();
  });

  it('should analyse Objet as different when the \"caracpDualwield\" differs', () => {
    // GIVEN
    const objet1 = createTestObjet();
    const objet2 = createTestObjet();
    objet2.caracpDualwield.psy = 67;

    // WHEN + THEN
    expect(objet1.isDifferent(objet2)).toBeTrue();
  });

  it('should analyse Objet as different when the \"elements\" differs', () => {
    // GIVEN
    const objet1 = createTestObjet();
    const objet2 = createTestObjet();
    objet2.elements.glace = 58;

    // WHEN + THEN
    expect(objet1.isDifferent(objet2)).toBeTrue();
  });

  it('should analyse Objet as different when the \"resistancesAlterations\" differs', () => {
    // GIVEN
    const objet1 = createTestObjet();
    const objet2 = createTestObjet();
    objet2.resistancesAlterations.maladie = 61;

    // WHEN + THEN
    expect(objet1.isDifferent(objet2)).toBeTrue();
  });

  it('should analyse Objet as different when the \"two_handed\" differs', () => {
    // GIVEN
    const objet1 = createTestObjet();
    const objet2 = createTestObjet();
    objet2.two_handed = true;

    // WHEN + THEN
    expect(objet1.isDifferent(objet2)).toBeTrue();
  });

  it('should analyse Objet as different when the \"variance_min\" differs', () => {
    // GIVEN
    const objet1 = createTestObjet();
    const objet2 = createTestObjet();
    objet2.variance_min = 0.8;

    // WHEN + THEN
    expect(objet1.isDifferent(objet2)).toBeTrue();
  });

  it('should analyse Objet as different when the \"variance_max\" differs', () => {
    // GIVEN
    const objet1 = createTestObjet();
    const objet2 = createTestObjet();
    objet2.variance_max = 1.2;

    // WHEN + THEN
    expect(objet1.isDifferent(objet2)).toBeTrue();
  });

  function createTestObjet(): Objet {
    const objet = new Objet(
      1,
      FfbeUtils.findObjetCategorieByGumiId(1),
      'Casserole',
      'Saucepan',
      1,
      '',
      1,
      'Une magnifique casserole d\'un autre monde',
      'A splendid saucepan from another world',
      '',
      '',
      new Caracteristiques(1, 2, 3, 4, 5, 6),
      new Caracteristiques(11, 12, 13, 14, 15, 16),
      new Caracteristiques(21, 22, 23, 24, 25, 26),
      new Caracteristiques(31, 32, 33, 34, 35, 36),
      new Caracteristiques(41, 42, 43, 44, 45, 46),
      new ResistancesElementaires(101, 102, 103, 104, 105, 106, 107, 108),
      new ResistancesAlterations(201, 202, 203, 204, 205, 206, 207, 208),
      '',
      '',
      []
    );

    objet.two_handed = false;
    objet.variance_min = 0.9;
    objet.variance_max = 1.1;

    return objet;
  }
});
