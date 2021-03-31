import {FormControl} from '@angular/forms';
import {FfbeUtils} from '../utils/ffbe-utils';

export class StorableFormControl {
  public constructor(
    public storageLabel: string,
    public isNumber: boolean = false,
    public formControl: FormControl = new FormControl('')
  ) {
  }

  public store() {
    localStorage.setItem(this.storageLabel, `${this.formControl.value}`);
  }

  public fetch() {
    const storedValue = localStorage.getItem((this.storageLabel));
    if (!FfbeUtils.isNullOrUndefined(storedValue)) {
      const convertedValue = this.isNumber ? +storedValue : storedValue;
      this.formControl.patchValue(convertedValue);
    }
  }

  public get value(): any {
    return this.formControl.value;
  }
}
