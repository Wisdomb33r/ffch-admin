import {FormControl, Validators} from '@angular/forms';

export class StorableFormControl {
  public constructor(
    public storageLabel: string,
    public formControl: FormControl = new FormControl('', Validators.required)
  ) {
  }

  public store() {
    localStorage.setItem(this.storageLabel, this.formControl.value);
  }

  public fetch() {

  }
}
