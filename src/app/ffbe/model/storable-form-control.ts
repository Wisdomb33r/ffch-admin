import {FormControl} from '@angular/forms';

export class StorableFormControl {
  public constructor(
    public formControl: FormControl,
    public storageLabel: string
  ) {
  }

  public store() {
    localStorage.setItem(this.storageLabel, this.formControl.value);
  }

  public fetch() {

  }
}
