import {FormControl} from '@angular/forms';

export class StorableFormControl {
  public constructor(
    public storageLabel: string,
    public formControl: FormControl = new FormControl('')
  ) {
  }

  public store() {
    localStorage.setItem(this.storageLabel, `${this.formControl.value}`);
  }

  public fetch() {
    const storedValue = localStorage.getItem((this.storageLabel));
    const convertedValue = isNaN(+storedValue) ? storedValue : +storedValue;
    this.formControl.patchValue(convertedValue);
  }
}
