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
});
