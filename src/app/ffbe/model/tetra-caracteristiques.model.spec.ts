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

});

