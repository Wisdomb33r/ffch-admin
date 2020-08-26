import {Caracteristiques} from './caracteristiques.model';
import {NameValuePair, NameValuePairArray} from './name-value-pair-array.model';

describe('Caracteristiques', () => {
  it('should add two Caracteristiques correctly', () => {
    // GIVEN
    const carac1 = new Caracteristiques(1, 2, 3, 4, 5, 6);
    const carac2 = new Caracteristiques(60, 70, 80, 90, 100, 110);

    // WHEN
    carac1.accumulateByAddition(carac2);

    // THEN
    expect(carac1).toEqual(new Caracteristiques(61, 72, 83, 94, 105, 116));
  });

  it('should add one valid and one null Caracteristiques correctly', () => {
    // GIVEN
    const carac1 = new Caracteristiques(1, 2, 3, 4, 5, 6);
    const carac2 = null;

    // WHEN
    carac1.accumulateByAddition(carac2);

    // THEN
    expect(carac1).toEqual(new Caracteristiques(1, 2, 3, 4, 5, 6));
  });

  it('should add one valid and one empty Caracteristiques correctly', () => {
    // GIVEN
    const carac1 = new Caracteristiques(1, 2, 3, 4, 5, 6);
    const carac2 = Caracteristiques.newEmptyCaracteristiques();

    // WHEN
    carac1.accumulateByAddition(carac2);

    // THEN
    expect(carac1).toEqual(new Caracteristiques(1, 2, 3, 4, 5, 6));
  });

  it('should add one empty and one valid Caracteristiques correctly', () => {
    // GIVEN
    const carac1 = Caracteristiques.newEmptyCaracteristiques();
    const carac2 = new Caracteristiques(1, 2, 3, 4, 5, 6);

    // WHEN
    carac1.accumulateByAddition(carac2);

    // THEN
    expect(carac1).toEqual(new Caracteristiques(1, 2, 3, 4, 5, 6));
  });

  it('should reduce three Caracteristiques by addition correctly', () => {
    // GIVEN
    const carac1 = new Caracteristiques(1, 2, 3, 4, 5, 6);
    const carac2 = new Caracteristiques(60, 70, 80, 90, 100, 110);
    const carac3 = new Caracteristiques(100, 200, 300, 400, 500, 600);

    const caracs = [carac1, carac2, carac3];

    // WHEN
    const result = Caracteristiques.computeSum(caracs);

    // THEN
    expect(carac1).toEqual(new Caracteristiques(1, 2, 3, 4, 5, 6));
    expect(carac2).toEqual(new Caracteristiques(60, 70, 80, 90, 100, 110));
    expect(carac3).toEqual(new Caracteristiques(100, 200, 300, 400, 500, 600));

    expect(result).toEqual(new Caracteristiques(161, 272, 383, 494, 605, 716));
  });

  it('should reduce many Caracteristiques with null entries by addition correctly', () => {
    // GIVEN
    const carac1 = new Caracteristiques(1, 2, 3, 4, 5, 6);
    const carac2 = new Caracteristiques(60, 70, 80, 90, 100, 110);
    const carac3 = new Caracteristiques(100, 200, 300, 400, 500, 600);

    const caracs = [null, carac1, null, carac2, null, carac3, null];

    // WHEN
    const result = Caracteristiques.computeSum(caracs);

    // THEN
    expect(carac1).toEqual(new Caracteristiques(1, 2, 3, 4, 5, 6));
    expect(carac2).toEqual(new Caracteristiques(60, 70, 80, 90, 100, 110));
    expect(carac3).toEqual(new Caracteristiques(100, 200, 300, 400, 500, 600));

    expect(result).toEqual(new Caracteristiques(161, 272, 383, 494, 605, 716));
  });

  it('should convert Caracteristiques to NameValueArray correctly', () => {
    // GIVEN
    const carac = new Caracteristiques(10, 20, 30, 40, 50, 60);

    // WHEN
    const array = carac.toNameValuePairArray();

    // THEN
    expect(array.findIndex((nameValuePair: NameValuePair) => nameValuePair.name === 'PV' && nameValuePair.value === 10)).toEqual(0);
    expect(array.findIndex((nameValuePair: NameValuePair) => nameValuePair.name === 'PM' && nameValuePair.value === 20)).toEqual(1);
    expect(array.findIndex((nameValuePair: NameValuePair) => nameValuePair.name === 'ATT' && nameValuePair.value === 30)).toEqual(2);
    expect(array.findIndex((nameValuePair: NameValuePair) => nameValuePair.name === 'DÉF' && nameValuePair.value === 40)).toEqual(3);
    expect(array.findIndex((nameValuePair: NameValuePair) => nameValuePair.name === 'MAG' && nameValuePair.value === 50)).toEqual(4);
    expect(array.findIndex((nameValuePair: NameValuePair) => nameValuePair.name === 'PSY' && nameValuePair.value === 60)).toEqual(5);
  });

});

