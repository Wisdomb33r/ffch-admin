import {FfbeUtils} from './ffbe-utils';

describe('FfbeUtils', () => {
  it('should compare correctly null and empty string', () => {
    // GIVEN
    const s1 = null;
    const s2 = '';
    // WHEN
    const result = FfbeUtils.checkIfStringsDifferent(s1, s2);
    // THEN
    expect(result).toBeFalsy();
  });

  it('should compare correctly undefined and empty string', () => {
    // GIVEN
    const s1 = undefined;
    const s2 = '';
    // WHEN
    const result = FfbeUtils.checkIfStringsDifferent(s1, s2);
    // THEN
    expect(result).toBeFalsy();
  });

  it('should compare correctly two different non empty strings', () => {
    // GIVEN
    const s1 = 'string';
    const s2 = 'strong';
    // WHEN
    const result = FfbeUtils.checkIfStringsDifferent(s1, s2);
    // THEN
    expect(result).toBeTruthy();
  });

  it('should compare correctly empty and non empty strings', () => {
    // GIVEN
    const s1 = 'string';
    const s2 = '';
    // WHEN
    const result = FfbeUtils.checkIfStringsDifferent(s1, s2);
    // THEN
    expect(result).toBeTruthy();
  });

  it('should compare correctly two same non empty strings', () => {
    // GIVEN
    const s1 = 'string';
    const s2 = 'string';
    // WHEN
    const result = FfbeUtils.checkIfStringsDifferent(s1, s2);
    // THEN
    expect(result).toBeFalsy();
  });
});
