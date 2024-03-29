import {UniteCompetenceArray} from './unite-competence-array.model';
import {Competence} from './competence.model';
import {UniteCompetence, UniteCompetenceStatus} from './unite-competence.model';

describe('UniteCompetenceArray', () => {
  it('should compare identical UniteCompetenceArrays correctly', () => {
    // GIVEN
    const dmUniteCompetences = createUniteCompetenceArray();
    const dbUniteCompetences = createUniteCompetenceArray();

    // WHEN
    dmUniteCompetences.compare(dbUniteCompetences);

    // THEN
    expect(dmUniteCompetences.length).toEqual(4);
    expect(dmUniteCompetences.every(uniteCompetence => uniteCompetence.status === UniteCompetenceStatus.Correct)).toBeTrue();
    expect(dbUniteCompetences.length).toEqual(4);
    expect(dbUniteCompetences.every(uniteCompetence => uniteCompetence.status === UniteCompetenceStatus.Correct)).toBeTrue();

  });

  it('should compare shuffled identical UniteCompetenceArrays correctly', () => {
    // GIVEN
    const dmUniteCompetences = createUniteCompetenceArray();
    const dbUniteCompetences = createUniteCompetenceArray();
    shuffleArray(dbUniteCompetences);

    // WHEN
    dmUniteCompetences.compare(dbUniteCompetences);

    // THEN
    expect(dmUniteCompetences.length).toEqual(4);
    expect(dmUniteCompetences.every(uniteCompetence => uniteCompetence.status === UniteCompetenceStatus.Correct)).toBeTrue();
    expect(dbUniteCompetences.length).toEqual(4);
    expect(dbUniteCompetences.every(uniteCompetence => uniteCompetence.status === UniteCompetenceStatus.Correct)).toBeTrue();
  });


  it('should mark UniteCompetences in DM that are missing in DB correctly', () => {
    // GIVEN
    const dmUniteCompetences = createUniteCompetenceArray();
    const dbUniteCompetences = createUniteCompetenceArray();
    dbUniteCompetences.splice(2, 1);
    shuffleArray(dbUniteCompetences);

    // WHEN
    dmUniteCompetences.compare(dbUniteCompetences);

    // THEN
    expect(dmUniteCompetences.length).toEqual(4);
    expect(dmUniteCompetences[0].status).toEqual(UniteCompetenceStatus.Correct);
    expect(dmUniteCompetences[1].status).toEqual(UniteCompetenceStatus.Correct);
    expect(dmUniteCompetences[2].status).toEqual(UniteCompetenceStatus.NotFoundInCounterPart);
    expect(dmUniteCompetences[3].status).toEqual(UniteCompetenceStatus.Correct);

    expect(dbUniteCompetences.length).toEqual(3);
    expect(dbUniteCompetences.every(uniteCompetence => uniteCompetence.status === UniteCompetenceStatus.Correct)).toBeTrue();
  });

  it('should mark UniteCompetences in DB that are not found in DM correctly', () => {
    // GIVEN
    const dmUniteCompetences = createUniteCompetenceArray();
    dmUniteCompetences.splice(1, 1);
    const dbUniteCompetences = createUniteCompetenceArray();
    shuffleArray(dbUniteCompetences);

    // WHEN
    dmUniteCompetences.compare(dbUniteCompetences);

    // THEN
    expect(dmUniteCompetences.length).toEqual(3);
    expect(dmUniteCompetences.every(uniteCompetence => uniteCompetence.status === UniteCompetenceStatus.Correct)).toBeTrue();

    expect(dbUniteCompetences.length).toEqual(4);
    expect(dbUniteCompetences.find(uniteCompetence => uniteCompetence.competence.gumi_id === 123).status).toEqual(UniteCompetenceStatus.Correct);
    expect(dbUniteCompetences.find(uniteCompetence => uniteCompetence.competence.gumi_id === 456).status).toEqual(UniteCompetenceStatus.NotFoundInCounterPart);
    expect(dbUniteCompetences.find(uniteCompetence => uniteCompetence.competence.gumi_id === 789).status).toEqual(UniteCompetenceStatus.Correct);
    expect(dbUniteCompetences.find(uniteCompetence => uniteCompetence.competence.gumi_id === 321).status).toEqual(UniteCompetenceStatus.Correct);
  });

  it('should compare UniteCompetenceArrays with level mismatch correctly', () => {
    // GIVEN
    const dmUniteCompetences = createUniteCompetenceArray();
    const dbUniteCompetences = createUniteCompetenceArray();
    dbUniteCompetences[2].niveau = 99;
    shuffleArray(dbUniteCompetences);

    // WHEN
    dmUniteCompetences.compare(dbUniteCompetences);

    // THEN
    expect(dmUniteCompetences.length).toEqual(4);
    expect(dmUniteCompetences[0].status).toEqual(UniteCompetenceStatus.Correct);
    expect(dmUniteCompetences[1].status).toEqual(UniteCompetenceStatus.Correct);
    expect(dmUniteCompetences[2].status).toEqual(UniteCompetenceStatus.LevelMismatch);
    expect(dmUniteCompetences[3].status).toEqual(UniteCompetenceStatus.Correct);

    expect(dbUniteCompetences.length).toEqual(4);
    expect(dbUniteCompetences.find(uniteCompetence => uniteCompetence.competence.gumi_id === 123).status).toEqual(UniteCompetenceStatus.Correct);
    expect(dbUniteCompetences.find(uniteCompetence => uniteCompetence.competence.gumi_id === 456).status).toEqual(UniteCompetenceStatus.Correct);
    expect(dbUniteCompetences.find(uniteCompetence => uniteCompetence.competence.gumi_id === 789).status).toEqual(UniteCompetenceStatus.LevelMismatch);
    expect(dbUniteCompetences.find(uniteCompetence => uniteCompetence.competence.gumi_id === 321).status).toEqual(UniteCompetenceStatus.Correct);
  });


  it('should compare UniteCompetenceArrays with duplicated competences and level mismatch correctly', () => {
    // GIVEN
    const dmUniteCompetences = createUniteCompetenceArray();
    dmUniteCompetences.splice(3, 0, new UniteCompetence(createCompetence(456, 'PV +10%', 'HP +10%'), 35));

    const dbUniteCompetences = createUniteCompetenceArray();
    dbUniteCompetences.splice(0, 0, new UniteCompetence(createCompetence(456, 'PV +10%', 'HP +10%'), 40));
    shuffleArray(dbUniteCompetences);

    // WHEN
    dmUniteCompetences.compare(dbUniteCompetences);

    // THEN
    expect(dmUniteCompetences.length).toEqual(5);
    expect(dmUniteCompetences[0].status).toEqual(UniteCompetenceStatus.Correct);
    expect(dmUniteCompetences[1].status).toEqual(UniteCompetenceStatus.Correct);
    expect(dmUniteCompetences[2].status).toEqual(UniteCompetenceStatus.Correct);
    expect(dmUniteCompetences[3].status).toEqual(UniteCompetenceStatus.LevelMismatch);
    expect(dmUniteCompetences[4].status).toEqual(UniteCompetenceStatus.Correct);

    expect(dbUniteCompetences.length).toEqual(5);
    expect(dbUniteCompetences.find(uniteCompetence => uniteCompetence.competence.gumi_id === 123).status).toEqual(UniteCompetenceStatus.Correct);
    expect(dbUniteCompetences.find(uniteCompetence => uniteCompetence.competence.gumi_id === 456 && uniteCompetence.niveau === 80).status).toEqual(UniteCompetenceStatus.Correct);
    expect(dbUniteCompetences.find(uniteCompetence => uniteCompetence.competence.gumi_id === 456 && uniteCompetence.niveau === 40).status).toEqual(UniteCompetenceStatus.LevelMismatch);
    expect(dbUniteCompetences.find(uniteCompetence => uniteCompetence.competence.gumi_id === 789).status).toEqual(UniteCompetenceStatus.Correct);
    expect(dbUniteCompetences.find(uniteCompetence => uniteCompetence.competence.gumi_id === 321).status).toEqual(UniteCompetenceStatus.Correct);
  });


  function createUniteCompetenceArray(): UniteCompetenceArray {
    return new UniteCompetenceArray(
      new UniteCompetence(createCompetence(123, 'Coup de pied', 'Kick'), 1),
      new UniteCompetence(createCompetence(456, 'PV +10%', 'HP +10%'), 80),
      new UniteCompetence(createCompetence(789, 'Concombre masqué', 'Masked Cucumber'), 101),
      new UniteCompetence(createCompetence(321, 'Gros boum', 'Big boom'), 120));
  }

  function createCompetence(gumi_id: number, nom: string, nom_en: string): Competence {
    return new Competence(gumi_id,
      0,
      0,
      false,
      false,
      false,
      false,
      false,
      0,
      nom,
      nom_en,
      '',
      '',
      '',
      '',
      '',
      '',
      0,
      0,
      0,
      0,
      0,
      '',
      '',
      false);
  }

  function shuffleArray(array: Array<any>) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

});
