import {TueursMapper} from './tueurs-mapper';

describe('TueurMapper', () => {
  it('should map null Tueur to empty string', () => {
    // GIVEN
    const tueurs = null;

    // WHEN
    const result = TueursMapper.toDataBaseRepresentation(tueurs);

    // THEN
    expect(result).toEqual('');
  });
});
