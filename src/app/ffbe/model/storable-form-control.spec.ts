import {StorableFormControl} from './storable-form-control';
import {FormControl, Validators} from '@angular/forms';

describe('StorableFormControl', () => {
  let mockLocalStorage;
  let store;

  beforeEach(() => {
    store = new Map();
    mockLocalStorage = {
      getItem: (key: string): string => {
        return store.has(key) ? store.get(key) : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = new Map();
      }
    };

    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should store string value correctly', () => {
    // GIVEN
    const storableFormControl = new StorableFormControl(
      'label-for-storing-string',
      false,
      new FormControl('A hello world message to be stored!'));

    // WHEN
    storableFormControl.store();

    // THEN
    expect(localStorage.getItem).toHaveBeenCalledTimes(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('label-for-storing-string',
      'A hello world message to be stored!');
    expect(localStorage.removeItem).toHaveBeenCalledTimes(0);
    expect(localStorage.clear).toHaveBeenCalledTimes(0);
  });

  it('should fetch string value correctly', () => {
    // GIVEN
    const storableFormControl = new StorableFormControl('label-for-fetching-string');
    store.set('label-for-fetching-string', 'A hello world message to be fetched!');

    // WHEN
    storableFormControl.fetch();

    // THEN
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledWith('label-for-fetching-string');
    expect(storableFormControl.formControl.value).toEqual('A hello world message to be fetched!');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(localStorage.removeItem).toHaveBeenCalledTimes(0);
    expect(localStorage.clear).toHaveBeenCalledTimes(0);
  });

  it('should store integer value correctly', () => {
    // GIVEN
    const storableFormControl = new StorableFormControl(
      'label-for-storing-integer',
      true,
      new FormControl(123456));

    // WHEN
    storableFormControl.store();

    // THEN
    expect(localStorage.getItem).toHaveBeenCalledTimes(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('label-for-storing-integer', '123456');
    expect(localStorage.removeItem).toHaveBeenCalledTimes(0);
    expect(localStorage.clear).toHaveBeenCalledTimes(0);
  });

  it('should fetch integer value correctly', () => {
    // GIVEN
    const storableFormControl = new StorableFormControl('label-for-fetching-integer', true);
    store.set('label-for-fetching-integer', '654321');

    // WHEN
    storableFormControl.fetch();

    // THEN
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledWith('label-for-fetching-integer');
    expect(storableFormControl.formControl.value).toEqual(654321);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(localStorage.removeItem).toHaveBeenCalledTimes(0);
    expect(localStorage.clear).toHaveBeenCalledTimes(0);
  });

  it('should return the value correctly when calling the getter', () => {
    // GIVEN
    const storableFormControl = new StorableFormControl(
      'label-for-not-storing-anything',
      false,
      new FormControl('A hello world message!'));

    // WHEN
    const result = storableFormControl.value;

    // THEN
    expect(result).toEqual('A hello world message!');
    expect(localStorage.getItem).toHaveBeenCalledTimes(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(localStorage.removeItem).toHaveBeenCalledTimes(0);
    expect(localStorage.clear).toHaveBeenCalledTimes(0);
  });

});
