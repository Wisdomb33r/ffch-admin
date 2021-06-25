import {UniteCompetenceArray} from './unite-competence-array.model';
import {Competence} from './competence.model';
import {UniteCompetence, UniteCompetenceStatus} from './unite-competence.model';

describe('UniteCompetenceArray', () => {
  it('should compare identical UniteCompetenceArray correctly', () => {
    // GIVEN
    const dmUniteCompetences = createUniteCompetenceArray();
    const dbUniteCompetences = createUniteCompetenceArray();

    // WHEN
    const result = dmUniteCompetences.compareWithDatabase(dbUniteCompetences);

    // THEN
    expect(Array.isArray(result)).toBeTrue();
    expect(result.length).toEqual(0);
    expect(dbUniteCompetences.length).toEqual(4);
    expect(dmUniteCompetences.every(uniteCompetence => uniteCompetence.status === UniteCompetenceStatus.Correct)).toBeTrue();
  });

  it('should compare shuffled identical UniteCompetenceArray correctly', () => {
    // GIVEN
    const dmUniteCompetences = createUniteCompetenceArray();
    const dbUniteCompetences = createUniteCompetenceArray();
    shuffleArray(dbUniteCompetences);

    // WHEN
    const result = dmUniteCompetences.compareWithDatabase(dbUniteCompetences);

    // THEN
    expect(Array.isArray(result)).toBeTrue();
    expect(result.length).toEqual(0);
    expect(dbUniteCompetences.length).toEqual(4);
    expect(dmUniteCompetences.every(uniteCompetence => uniteCompetence.status === UniteCompetenceStatus.Correct)).toBeTrue();
  });


  function createUniteCompetenceArray(): UniteCompetenceArray {
    return new UniteCompetenceArray(
      new UniteCompetence(createCompetence(123, 'Coup de pied', 'Kick'), 1),
      new UniteCompetence(createCompetence(456, 'PV +10%', 'HP +10%'), 80),
      new UniteCompetence(createCompetence(789, 'Concombre masqué', 'Masked Cucumber'), 101),
      new UniteCompetence(createCompetence(321, 'Gros boum', 'Big boom'), 120),);
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
      0,
      0,
      0,
      0,
      0,
      '',
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
