import {Tueurs} from './tueurs.model';

describe('Tueurs', () => {
  it('should add two Tueurs correctly', () => {
    // GIVEN
    const tueurs1 = new Tueurs(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
    const tueurs2 = new Tueurs(60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170);

    // WHEN
    tueurs1.accumulateByAddition(tueurs2);

    // THEN
    expect(tueurs1).toEqual(new Tueurs(61, 72, 83, 94, 105, 116, 127, 138, 149, 160, 171, 182));
  });

  it('should add one valid and one null Tueurs correctly', () => {
    // GIVEN
    const tueurs1 = new Tueurs(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
    const tueurs2 = null;

    // WHEN
    tueurs1.accumulateByAddition(tueurs2);

    // THEN
    expect(tueurs1).toEqual(new Tueurs(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
  });

  it('should add one valid and one empty Tueurs correctly', () => {
    // GIVEN
    const tueurs1 = new Tueurs(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
    const tueurs2 = new Tueurs();

    // WHEN
    tueurs1.accumulateByAddition(tueurs2);

    // THEN
    expect(tueurs1).toEqual(new Tueurs(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
  });

  it('should add one empty and one valid Tueurs correctly', () => {
    // GIVEN
    const tueurs1 = new Tueurs();
    const tueurs2 = new Tueurs(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);

    // WHEN
    tueurs1.accumulateByAddition(tueurs2);

    // THEN
    expect(tueurs1).toEqual(new Tueurs(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
  });

  it('should reduce three Tueurs by addition correctly', () => {
    // GIVEN
    const tueurs1 = new Tueurs(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
    const tueurs2 = new Tueurs(60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170);
    const tueurs3 = new Tueurs(100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200);

    const tueurs = [tueurs1, tueurs2, tueurs3];

    // WHEN
    const result = Tueurs.computeSum(tueurs);

    // THEN
    expect(tueurs1).toEqual(new Tueurs(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
    expect(tueurs2).toEqual(new Tueurs(60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170));
    expect(tueurs3).toEqual(new Tueurs(100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200));

    expect(result).toEqual(new Tueurs(161, 272, 383, 494, 605, 716, 827, 938, 1049, 1160, 1271, 1382));
  });

  it('should reduce many Tueurs with null entries by addition correctly', () => {
    // GIVEN
    const tueurs1 = new Tueurs(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
    const tueurs2 = new Tueurs(60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170);
    const tueurs3 = new Tueurs(100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200);

    const tueurs = [null, tueurs1, null, tueurs2, null, tueurs3, null];

    // WHEN
    const result = Tueurs.computeSum(tueurs);

    // THEN
    expect(tueurs1).toEqual(new Tueurs(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
    expect(tueurs2).toEqual(new Tueurs(60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170));
    expect(tueurs3).toEqual(new Tueurs(100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200));

    expect(result).toEqual(new Tueurs(161, 272, 383, 494, 605, 716, 827, 938, 1049, 1160, 1271, 1382));
  });
});
