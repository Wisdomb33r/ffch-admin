import {StorableFormControl} from './storable-form-control';
import {FormControl, Validators} from '@angular/forms';

describe('StorableFormControl', () => {
  let mockLocalStorage;

  beforeEach(() => {
    let store = {};
    mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
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
      new FormControl('A hello world message to be stored!', Validators.required),
      'label-for-storing-string');

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

});
