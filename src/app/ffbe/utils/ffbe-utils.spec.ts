import {FfbeUtils} from './ffbe-utils';

describe('FfbeUtils', () => {
  it('should compare correctly number and string', () => {
    // GIVEN
    const s1: any = 0;
    const s2 = '0';
    // WHEN
    const result = FfbeUtils.checkIfStringsDifferent(s1, s2);
    // THEN
    expect(result).toBeFalsy();
  });

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

  it('should compare correctly null and undefined booleans', () => {
    // GIVEN
    const b1 = null;
    const b2 = undefined;
    // WHEN
    const result = FfbeUtils.checkIfBooleanDifferent(b1, b2);
    // THEN
    expect(result).toBeFalsy();
  });

  it('should compare correctly null and \'false\'', () => {
    // GIVEN
    const b1 = null;
    const b2 = false;
    // WHEN
    const result = FfbeUtils.checkIfBooleanDifferent(b1, b2);
    // THEN
    expect(result).toBeFalsy();
  });

  it('should compare correctly undefined and \'false\'', () => {
    // GIVEN
    const b1 = undefined;
    const b2 = false;
    // WHEN
    const result = FfbeUtils.checkIfBooleanDifferent(b1, b2);
    // THEN
    expect(result).toBeFalsy();
  });

  it('should compare correctly null and \'true\'', () => {
    // GIVEN
    const b1 = null;
    const b2 = true;
    // WHEN
    const result = FfbeUtils.checkIfBooleanDifferent(b1, b2);
    // THEN
    expect(result).toBeTruthy();
  });

  it('should compare correctly undefined and \'true\'', () => {
    // GIVEN
    const b1 = undefined;
    const b2 = true;
    // WHEN
    const result = FfbeUtils.checkIfBooleanDifferent(b1, b2);
    // THEN
    expect(result).toBeTruthy();
  });

  it('should compare correctly \'false\' and \'true\'', () => {
    // GIVEN
    const b1 = false;
    const b2 = true;
    // WHEN
    const result = FfbeUtils.checkIfBooleanDifferent(b1, b2);
    // THEN
    expect(result).toBeTruthy();
  });

  it('should compare correctly \'false\' and \'false\'', () => {
    // GIVEN
    const b1 = false;
    const b2 = false;
    // WHEN
    const result = FfbeUtils.checkIfBooleanDifferent(b1, b2);
    // THEN
    expect(result).toBeFalsy();
  });

  it('should compare correctly \'true\' and \'true\'', () => {
    // GIVEN
    const b1 = true;
    const b2 = true;
    // WHEN
    const result = FfbeUtils.checkIfBooleanDifferent(b1, b2);
    // THEN
    expect(result).toBeFalsy();
  });

});
