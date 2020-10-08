import {TueursMapper} from './tueurs-mapper';
import {Tueurs} from '../model/tueurs.model';

describe('TueurMapper', () => {
  it('should map null Tueurs to empty string', () => {
    // GIVEN
    const tueurs = null;

    // WHEN
    const result = TueursMapper.toDataBaseRepresentation(tueurs);

    // THEN
    expect(result).toEqual('');
  });

  it('should map empty Tueurs to empty string', () => {
    // GIVEN
    const tueurs = new Tueurs();

    // WHEN
    const result = TueursMapper.toDataBaseRepresentation(tueurs);

    // THEN
    expect(result).toEqual('');
  });

  it('should map Tueurs with only zero values to empty string', () => {
    // GIVEN
    const tueurs = new Tueurs(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

    // WHEN
    const result = TueursMapper.toDataBaseRepresentation(tueurs);

    // THEN
    expect(result).toEqual('');
  });

  it('should map Tueurs with null and zero values to empty string', () => {
    // GIVEN
    const tueurs = new Tueurs(0, null, 0, null, 0, 0, 0, null, 0, null, 0, 0);

    // WHEN
    const result = TueursMapper.toDataBaseRepresentation(tueurs);

    // THEN
    expect(result).toEqual('');
  });

  it('should map Tueurs with non-null values to string correctly', () => {
    // GIVEN
    const tueurs = new Tueurs(10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120);

    // WHEN
    const result = TueursMapper.toDataBaseRepresentation(tueurs);

    // THEN
    expect(result).toEqual('30,10,20,40,70,80,50,90,60,110,100,120');
  });

  it('should map Tueurs with mixed values to string correctly', () => {
    // GIVEN
    const tueurs = new Tueurs(0, null, 0, null, 10, 50, 0, null, 0, null, 0, 0);

    // WHEN
    const result = TueursMapper.toDataBaseRepresentation(tueurs);

    // THEN
    expect(result).toEqual('0,0,0,0,0,0,10,0,50,0,0,0');
  });

  it('should map null string to empty Tueurs correctly', () => {
    // GIVEN
    const dbEntry = null;

    // WHEN
    const tueurs = TueursMapper.fromDataBaseRepresentation(dbEntry);

    // THEN
    expect(tueurs).toEqual(new Tueurs());
  });

  it('should map empty string to empty Tueurs correctly', () => {
    // GIVEN
    const dbEntry = '';

    // WHEN
    const tueurs = TueursMapper.fromDataBaseRepresentation(dbEntry);

    // THEN
    expect(tueurs).toEqual(new Tueurs());
  });

  it('should map invalid string to empty Tueurs correctly', () => {
    // GIVEN
    const dbEntry = '0,50,0';

    // WHEN
    const tueurs = TueursMapper.fromDataBaseRepresentation(dbEntry);

    // THEN
    expect(tueurs).toEqual(new Tueurs());
  });

  it('should map valid string to Tueurs correctly', () => {
    // GIVEN
    const dbEntry = '30,10,20,40,70,80,50,90,60,110,100,120';

    // WHEN
    const tueurs = TueursMapper.fromDataBaseRepresentation(dbEntry);

    // THEN
    expect(tueurs).toEqual(new Tueurs(10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120));
  });

  it('should map invalid string values to null correctly', () => {
    // GIVEN
    const dbEntry = '30,10,20,40,invalid,80,50,90,60,values,100,120';

    // WHEN
    const tueurs = TueursMapper.fromDataBaseRepresentation(dbEntry);

    // THEN
    expect(tueurs).toEqual(new Tueurs(10, 20, 30, 40, 50, 60, null, 80, 90, 100, null, 120));
  });
});
