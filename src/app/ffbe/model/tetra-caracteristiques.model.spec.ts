import {TetraCaracteristiques} from './tetra-caracteristiques.model';
import {Caracteristiques} from './caracteristiques.model';

describe('TetraCaracteristiques', () => {
  it('should add two TetraCaracteristiques correctly', () => {
    // GIVEN
    const caracIncond1 = new Caracteristiques(1, 2, 3, 4, 5, 6);
    const caracIncond2 = new Caracteristiques(60, 70, 80, 90, 100, 110);
    const caracDH1 = new Caracteristiques(21, 22, 23, 24, 25, 26);
    const caracDH2 = new Caracteristiques(30, 40, 50, 60, 70, 80);
    const caracTDH1 = new Caracteristiques(101, 102, 103, 104, 105, 106);
    const caracTDH2 = new Caracteristiques(160, 170, 180, 190, 200, 210);
    const caracDW1 = new Caracteristiques(121, 122, 123, 124, 125, 126);
    const caracDW2 = new Caracteristiques(260, 270, 280, 290, 300, 310);

    const tetraCarac1 = new TetraCaracteristiques(caracIncond1, caracDH1, caracTDH1, caracDW1);
    const tetraCarac2 = new TetraCaracteristiques(caracIncond2, caracDH2, caracTDH2, caracDW2);

    // WHEN
    tetraCarac1.accumulateByAddition(tetraCarac2);

    // THEN
    expect(tetraCarac1).toEqual(new TetraCaracteristiques(
      new Caracteristiques(61, 72, 83, 94, 105, 116),
      new Caracteristiques(51, 62, 73, 84, 95, 106),
      new Caracteristiques(261, 272, 283, 294, 305, 316),
      new Caracteristiques(381, 392, 403, 414, 425, 436)
    ));
  });

  it('should add one valid and one null TetraCaracteristiques correctly', () => {
    // GIVEN
    const caracIncond1 = new Caracteristiques(1, 2, 3, 4, 5, 6);
    const caracDH1 = new Caracteristiques(21, 22, 23, 24, 25, 26);
    const caracTDH1 = new Caracteristiques(101, 102, 103, 104, 105, 106);
    const caracDW1 = new Caracteristiques(121, 122, 123, 124, 125, 126);

    const tetraCarac1 = new TetraCaracteristiques(caracIncond1, caracDH1, caracTDH1, caracDW1);
    const tetraCarac2 = null;

    // WHEN
    tetraCarac1.accumulateByAddition(tetraCarac2);

    // THEN
    expect(tetraCarac1).toEqual(new TetraCaracteristiques(
      new Caracteristiques(1, 2, 3, 4, 5, 6),
      new Caracteristiques(21, 22, 23, 24, 25, 26),
      new Caracteristiques(101, 102, 103, 104, 105, 106),
      new Caracteristiques(121, 122, 123, 124, 125, 126)
    ));
  });

  it('should add one valid and one empty TetraCaracteristiques correctly', () => {
    // GIVEN
    const caracIncond1 = new Caracteristiques(1, 2, 3, 4, 5, 6);
    const caracDH1 = new Caracteristiques(21, 22, 23, 24, 25, 26);
    const caracTDH1 = new Caracteristiques(101, 102, 103, 104, 105, 106);
    const caracDW1 = new Caracteristiques(121, 122, 123, 124, 125, 126);

    const tetraCarac1 = new TetraCaracteristiques(caracIncond1, caracDH1, caracTDH1, caracDW1);
    const tetraCarac2 = TetraCaracteristiques.newEmptyTetraCaracteristiques();

    // WHEN
    tetraCarac1.accumulateByAddition(tetraCarac2);

    // THEN
    expect(tetraCarac1).toEqual(new TetraCaracteristiques(
      new Caracteristiques(1, 2, 3, 4, 5, 6),
      new Caracteristiques(21, 22, 23, 24, 25, 26),
      new Caracteristiques(101, 102, 103, 104, 105, 106),
      new Caracteristiques(121, 122, 123, 124, 125, 126)
    ));
  });

  it('should add one empty and one valid TetraCaracteristiques correctly', () => {
    // GIVEN
    const caracIncond1 = new Caracteristiques(1, 2, 3, 4, 5, 6);
    const caracDH1 = new Caracteristiques(21, 22, 23, 24, 25, 26);
    const caracTDH1 = new Caracteristiques(101, 102, 103, 104, 105, 106);
    const caracDW1 = new Caracteristiques(121, 122, 123, 124, 125, 126);

    const tetraCarac1 = TetraCaracteristiques.newEmptyTetraCaracteristiques();
    const tetraCarac2 = new TetraCaracteristiques(caracIncond1, caracDH1, caracTDH1, caracDW1);

    // WHEN
    tetraCarac1.accumulateByAddition(tetraCarac2);

    // THEN
    expect(tetraCarac1).toEqual(new TetraCaracteristiques(
      new Caracteristiques(1, 2, 3, 4, 5, 6),
      new Caracteristiques(21, 22, 23, 24, 25, 26),
      new Caracteristiques(101, 102, 103, 104, 105, 106),
      new Caracteristiques(121, 122, 123, 124, 125, 126)
    ));
  });

  it('should reduce three TetraCaracteristiques by addition correctly', () => {
    // GIVEN
    const caracIncond1 = new Caracteristiques(1, 2, 3, 4, 5, 6);
    const caracIncond2 = new Caracteristiques(11, 12, 13, 14, 15, 16);
    const caracIncond3 = new Caracteristiques(21, 22, 23, 24, 25, 26);
    const caracDH1 = new Caracteristiques(101, 102, 103, 104, 105, 106);
    const caracDH2 = new Caracteristiques(111, 112, 113, 114, 115, 116);
    const caracDH3 = new Caracteristiques(121, 122, 123, 124, 125, 126);
    const caracTDH1 = new Caracteristiques(201, 202, 203, 204, 205, 206);
    const caracTDH2 = new Caracteristiques(211, 212, 213, 214, 215, 216);
    const caracTDH3 = new Caracteristiques(221, 222, 223, 224, 225, 226);
    const caracDW1 = new Caracteristiques(301, 302, 303, 304, 305, 306);
    const caracDW2 = new Caracteristiques(311, 312, 313, 314, 315, 316);
    const caracDW3 = new Caracteristiques(321, 322, 323, 324, 325, 326);

    const tetraCarac1 = new TetraCaracteristiques(caracIncond1, caracDH1, caracTDH1, caracDW1);
    const tetraCarac2 = new TetraCaracteristiques(caracIncond2, caracDH2, caracTDH2, caracDW2);
    const tetraCarac3 = new TetraCaracteristiques(caracIncond3, caracDH3, caracTDH3, caracDW3);

    const tetraCaracs = [tetraCarac1, tetraCarac2, tetraCarac3];

    // WHEN
    const result = TetraCaracteristiques.computeSum(tetraCaracs);

    // THEN
    expect(tetraCarac1).toEqual(new TetraCaracteristiques(caracIncond1, caracDH1, caracTDH1, caracDW1));
    expect(tetraCarac2).toEqual(new TetraCaracteristiques(caracIncond2, caracDH2, caracTDH2, caracDW2));
    expect(tetraCarac3).toEqual(new TetraCaracteristiques(caracIncond3, caracDH3, caracTDH3, caracDW3));

    expect(result).toEqual(new TetraCaracteristiques(
      new Caracteristiques(33, 36, 39, 42, 45, 48),
      new Caracteristiques(333, 336, 339, 342, 345, 348),
      new Caracteristiques(633, 636, 639, 642, 645, 648),
      new Caracteristiques(933, 936, 939, 942, 945, 948)
    ));
  });

  it('should reduce many TetraCaracteristiques with null entries by addition correctly', () => {
    // GIVEN
    const caracIncond1 = new Caracteristiques(1, 2, 3, 4, 5, 6);
    const caracIncond2 = new Caracteristiques(11, 12, 13, 14, 15, 16);
    const caracIncond3 = new Caracteristiques(21, 22, 23, 24, 25, 26);
    const caracDH1 = new Caracteristiques(101, 102, 103, 104, 105, 106);
    const caracDH2 = new Caracteristiques(111, 112, 113, 114, 115, 116);
    const caracDH3 = new Caracteristiques(121, 122, 123, 124, 125, 126);
    const caracTDH1 = new Caracteristiques(201, 202, 203, 204, 205, 206);
    const caracTDH2 = new Caracteristiques(211, 212, 213, 214, 215, 216);
    const caracTDH3 = new Caracteristiques(221, 222, 223, 224, 225, 226);
    const caracDW1 = new Caracteristiques(301, 302, 303, 304, 305, 306);
    const caracDW2 = new Caracteristiques(311, 312, 313, 314, 315, 316);
    const caracDW3 = new Caracteristiques(321, 322, 323, 324, 325, 326);

    const tetraCarac1 = new TetraCaracteristiques(caracIncond1, caracDH1, caracTDH1, caracDW1);
    const tetraCarac2 = new TetraCaracteristiques(caracIncond2, caracDH2, caracTDH2, caracDW2);
    const tetraCarac3 = new TetraCaracteristiques(caracIncond3, caracDH3, caracTDH3, caracDW3);

    const tetraCaracs = [null, tetraCarac1, TetraCaracteristiques.newEmptyTetraCaracteristiques(), null, tetraCarac2,
      null, TetraCaracteristiques.newEmptyTetraCaracteristiques(), tetraCarac3,
      TetraCaracteristiques.newEmptyTetraCaracteristiques(), null];

    // WHEN
    const result = TetraCaracteristiques.computeSum(tetraCaracs);

    // THEN
    expect(tetraCarac1).toEqual(new TetraCaracteristiques(caracIncond1, caracDH1, caracTDH1, caracDW1));
    expect(tetraCarac2).toEqual(new TetraCaracteristiques(caracIncond2, caracDH2, caracTDH2, caracDW2));
    expect(tetraCarac3).toEqual(new TetraCaracteristiques(caracIncond3, caracDH3, caracTDH3, caracDW3));

    expect(result).toEqual(new TetraCaracteristiques(
      new Caracteristiques(33, 36, 39, 42, 45, 48),
      new Caracteristiques(333, 336, 339, 342, 345, 348),
      new Caracteristiques(633, 636, 639, 642, 645, 648),
      new Caracteristiques(933, 936, 939, 942, 945, 948)
    ));
  });

});

