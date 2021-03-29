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
    this.formControl.patchValue(localStorage.getItem((this.storageLabel)));
  }
}
