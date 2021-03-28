import {StorableFormControl} from './storable-form-control';
import {FormControl, Validators} from '@angular/forms';

describe('StorableFormControl', () => {
  let store;
  let mockLocalStorage;

  beforeEach(() => {
    store = new Map();
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
        store.clear();
      }
    };
  });

  it('should store string value correctly', () => {
    // GIVEN
    const storableFormControl = new StorableFormControl(
      new FormControl('Hello world!', Validators.required),
      'local-storage-label');
    //expect(mockLocalStorage.getItem).toHaveBeenCalledTimes(0);

    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'getItem').and.throwError('Unexpected call to getItem()');

    // WHEN
    storableFormControl.store();

    // THEN
    //expect(store.size).toEqual(1);
    expect(store['local-storage-label']).toEqual('Hello world!');
  });


  /*  spyOn(localStorage, 'getItem')
    .and.callFake(mockLocalStorage.getItem);
  spyOn(localStorage, 'setItem')
    .and.callFake(mockLocalStorage.setItem);
  spyOn(localStorage, 'removeItem')
    .and.callFake(mockLocalStorage.removeItem);
  spyOn(localStorage, 'clear')
    .and.callFake(mockLocalStorage.clear); */
});
