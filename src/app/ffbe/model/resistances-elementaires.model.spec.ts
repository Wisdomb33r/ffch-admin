import {ResistancesElementaires} from './resistances-elementaires.model';
import {NameValuePair, NameValuePairArray} from './name-value-pair-array.model';

describe('ResistancesElementaires', () => {
  it('should add two ResistancesElementaires correctly', () => {
    // GIVEN
    const elements1 = new ResistancesElementaires(1, 2, 3, 4, 5, 6, 7, 8);
    const elements2 = new ResistancesElementaires(60, 70, 80, 90, 100, 110, 120, 130);

    // WHEN
    elements1.accumulateByAddition(elements2);

    // THEN
    expect(elements1).toEqual(new ResistancesElementaires(61, 72, 83, 94, 105, 116, 127, 138));
  });

  it('should add one valid and one null ResistancesElementaires correctly', () => {
    // GIVEN
    const elements1 = new ResistancesElementaires(1, 2, 3, 4, 5, 6, 7, 8);
    const elements2 = null;

    // WHEN
    elements1.accumulateByAddition(elements2);

    // THEN
    expect(elements1).toEqual(new ResistancesElementaires(1, 2, 3, 4, 5, 6, 7, 8));
  });

  it('should add one valid and one empty ResistancesElementaires correctly', () => {
    // GIVEN
    const elements1 = new ResistancesElementaires(1, 2, 3, 4, 5, 6, 7, 8);
    const elements2 = new ResistancesElementaires();

    // WHEN
    elements1.accumulateByAddition(elements2);

    // THEN
    expect(elements1).toEqual(new ResistancesElementaires(1, 2, 3, 4, 5, 6, 7, 8));
  });

  it('should add one empty and one valid ResistancesElementaires correctly', () => {
    // GIVEN
    const elements1 = new ResistancesElementaires();
    const elements2 = new ResistancesElementaires(1, 2, 3, 4, 5, 6, 7, 8);

    // WHEN
    elements1.accumulateByAddition(elements2);

    // THEN
    expect(elements1).toEqual(new ResistancesElementaires(1, 2, 3, 4, 5, 6, 7, 8));
  });

  it('should reduce three ResistancesElementaires by addition correctly', () => {
    // GIVEN
    const elements1 = new ResistancesElementaires(1, 2, 3, 4, 5, 6, 7, 8);
    const elements2 = new ResistancesElementaires(60, 70, 80, 90, 100, 110, 120, 130);
    const elements3 = new ResistancesElementaires(100, 200, 300, 400, 500, 600, 700, 800);

    const elements = [elements1, elements2, elements3];

    // WHEN
    const result = ResistancesElementaires.computeSum(elements);

    // THEN
    expect(elements1).toEqual(new ResistancesElementaires(1, 2, 3, 4, 5, 6, 7, 8));
    expect(elements2).toEqual(new ResistancesElementaires(60, 70, 80, 90, 100, 110, 120, 130));
    expect(elements3).toEqual(new ResistancesElementaires(100, 200, 300, 400, 500, 600, 700, 800));

    expect(result).toEqual(new ResistancesElementaires(161, 272, 383, 494, 605, 716, 827, 938));
  });

  it('should reduce many ResistancesElementaires with null entries by addition correctly', () => {
    // GIVEN
    const elements1 = new ResistancesElementaires(1, 2, 3, 4, 5, 6, 7, 8);
    const elements2 = new ResistancesElementaires(60, 70, 80, 90, 100, 110, 120, 130);
    const elements3 = new ResistancesElementaires(100, 200, 300, 400, 500, 600, 700, 800);

    const elements = [null, elements1, null, elements2, null, elements3, null];

    // WHEN
    const result = ResistancesElementaires.computeSum(elements);

    // THEN
    expect(elements1).toEqual(new ResistancesElementaires(1, 2, 3, 4, 5, 6, 7, 8));
    expect(elements2).toEqual(new ResistancesElementaires(60, 70, 80, 90, 100, 110, 120, 130));
    expect(elements3).toEqual(new ResistancesElementaires(100, 200, 300, 400, 500, 600, 700, 800));

    expect(result).toEqual(new ResistancesElementaires(161, 272, 383, 494, 605, 716, 827, 938));
  });

  it('should convert ResistancesElementaires to NameValueArray correctly', () => {
    // GIVEN
    const elements = new ResistancesElementaires(10, 20, 30, 40, 50, 60, 70, 80);

    // WHEN
    const array = elements.toNameValuePairArray();

    // THEN
    expect(array.findIndex((nameValuePair: NameValuePair) => nameValuePair.name === 'Feu' && nameValuePair.value === 10)).toEqual(0);
    expect(array.findIndex((nameValuePair: NameValuePair) => nameValuePair.name === 'Glace' && nameValuePair.value === 20)).toEqual(1);
    expect(array.findIndex((nameValuePair: NameValuePair) => nameValuePair.name === 'Foudre' && nameValuePair.value === 30)).toEqual(2);
    expect(array.findIndex((nameValuePair: NameValuePair) => nameValuePair.name === 'Eau' && nameValuePair.value === 40)).toEqual(3);
    expect(array.findIndex((nameValuePair: NameValuePair) => nameValuePair.name === 'Vent' && nameValuePair.value === 50)).toEqual(4);
    expect(array.findIndex((nameValuePair: NameValuePair) => nameValuePair.name === 'Terre' && nameValuePair.value === 60)).toEqual(5);
    expect(array.findIndex((nameValuePair: NameValuePair) => nameValuePair.name === 'Lumière' && nameValuePair.value === 70)).toEqual(6);
    expect(array.findIndex((nameValuePair: NameValuePair) => nameValuePair.name === 'Ténèbres' && nameValuePair.value === 80)).toEqual(7);
  });

});
