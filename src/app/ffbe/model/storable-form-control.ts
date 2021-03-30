import {FormControl} from '@angular/forms';

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
    const convertedValue = this.isNumber ? +storedValue : storedValue;
    this.formControl.patchValue(convertedValue);
  }

  public get value(): any {
    return this.formControl.value;
  }
}
