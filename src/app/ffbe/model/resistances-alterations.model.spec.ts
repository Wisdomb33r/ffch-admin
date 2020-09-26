import {ResistancesAlterations} from './resistances-alterations.model';
import {NameValuePair, NameValuePairArray} from './name-value-pair-array.model';

describe('ResistancesAlterations', () => {
  it('should add two ResistancesAlterations correctly', () => {
    // GIVEN
    const resAlterations1 = new ResistancesAlterations(1, 2, 3, 4, 5, 6, 7, 8);
    const resAlterations2 = new ResistancesAlterations(60, 70, 80, 90, 100, 110, 120, 130);

    // WHEN
    resAlterations1.accumulateByAddition(resAlterations2);

    // THEN
    expect(resAlterations1).toEqual(new ResistancesAlterations(61, 72, 83, 94, 105, 116, 127, 138));
  });

  it('should add one valid and one null ResistancesAlterations correctly', () => {
    // GIVEN
    const resAlterations1 = new ResistancesAlterations(1, 2, 3, 4, 5, 6, 7, 8);
    const resAlterations2 = null;

    // WHEN
    resAlterations1.accumulateByAddition(resAlterations2);

    // THEN
    expect(resAlterations1).toEqual(new ResistancesAlterations(1, 2, 3, 4, 5, 6, 7, 8));
  });

  it('should add one valid and one empty ResistancesAlterations correctly', () => {
    // GIVEN
    const resAlterations1 = new ResistancesAlterations(1, 2, 3, 4, 5, 6, 7, 8);
    const resAlterations2 = new ResistancesAlterations();

    // WHEN
    resAlterations1.accumulateByAddition(resAlterations2);

    // THEN
    expect(resAlterations1).toEqual(new ResistancesAlterations(1, 2, 3, 4, 5, 6, 7, 8));
  });

  it('should add one empty and one valid ResistancesAlterations correctly', () => {
    // GIVEN
    const resAlterations1 = new ResistancesAlterations();
    const resAlterations2 = new ResistancesAlterations(1, 2, 3, 4, 5, 6, 7, 8);

    // WHEN
    resAlterations1.accumulateByAddition(resAlterations2);

    // THEN
    expect(resAlterations1).toEqual(new ResistancesAlterations(1, 2, 3, 4, 5, 6, 7, 8));
  });

  it('should reduce three ResistancesAlterations by addition correctly', () => {
    // GIVEN
    const resAlterations1 = new ResistancesAlterations(1, 2, 3, 4, 5, 6, 7, 8);
    const resAlterations2 = new ResistancesAlterations(60, 70, 80, 90, 100, 110, 120, 130);
    const resAlterations3 = new ResistancesAlterations(100, 200, 300, 400, 500, 600, 700, 800);

    const resAlterations = [resAlterations1, resAlterations2, resAlterations3];

    // WHEN
    const result = ResistancesAlterations.computeSum(resAlterations);

    // THEN
    expect(resAlterations1).toEqual(new ResistancesAlterations(1, 2, 3, 4, 5, 6, 7, 8));
    expect(resAlterations2).toEqual(new ResistancesAlterations(60, 70, 80, 90, 100, 110, 120, 130));
    expect(resAlterations3).toEqual(new ResistancesAlterations(100, 200, 300, 400, 500, 600, 700, 800));

    expect(result).toEqual(new ResistancesAlterations(161, 272, 383, 494, 605, 716, 827, 938));
  });

  it('should reduce many ResistancesAlterations with null entries by addition correctly', () => {
    // GIVEN
    const resAlterations1 = new ResistancesAlterations(1, 2, 3, 4, 5, 6, 7, 8);
    const resAlterations2 = new ResistancesAlterations(60, 70, 80, 90, 100, 110, 120, 130);
    const resAlterations3 = new ResistancesAlterations(100, 200, 300, 400, 500, 600, 700, 800);

    const resAlterations = [null, resAlterations1, null, resAlterations2, null, resAlterations3, null];

    // WHEN
    const result = ResistancesAlterations.computeSum(resAlterations);

    // THEN
    expect(resAlterations1).toEqual(new ResistancesAlterations(1, 2, 3, 4, 5, 6, 7, 8));
    expect(resAlterations2).toEqual(new ResistancesAlterations(60, 70, 80, 90, 100, 110, 120, 130));
    expect(resAlterations3).toEqual(new ResistancesAlterations(100, 200, 300, 400, 500, 600, 700, 800));

    expect(result).toEqual(new ResistancesAlterations(161, 272, 383, 494, 605, 716, 827, 938));
  });

  it('should convert ResistancesAlterations to NameValueArray correctly', () => {
    // GIVEN
    const resAlterations = new ResistancesAlterations(10, 20, 30, 40, 50, 60, 70, 80);

    // WHEN
    const array = resAlterations.toNameValuePairArray();

    // THEN
    expect(array.findIndex((nameValuePair: NameValuePair) => nameValuePair.name === 'Poison' && nameValuePair.value === 10)).toEqual(0);
    expect(array.findIndex((nameValuePair: NameValuePair) => nameValuePair.name === 'Cecité' && nameValuePair.value === 20)).toEqual(1);
    expect(array.findIndex((nameValuePair: NameValuePair) => nameValuePair.name === 'Sommeil' && nameValuePair.value === 30)).toEqual(2);
    expect(array.findIndex((nameValuePair: NameValuePair) => nameValuePair.name === 'Silence' && nameValuePair.value === 40)).toEqual(3);
    expect(array.findIndex((nameValuePair: NameValuePair) => nameValuePair.name === 'Paralysie' && nameValuePair.value === 50)).toEqual(4);
    expect(array.findIndex((nameValuePair: NameValuePair) => nameValuePair.name === 'Confusion' && nameValuePair.value === 60)).toEqual(5);
    expect(array.findIndex((nameValuePair: NameValuePair) => nameValuePair.name === 'Maladie' && nameValuePair.value === 70)).toEqual(6);
    expect(array.findIndex((nameValuePair: NameValuePair) => nameValuePair.name === 'Pétrification' && nameValuePair.value === 80)).toEqual(7);
  });

});
