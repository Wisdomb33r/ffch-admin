import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { CharactersComponent } from './characters/characters.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CharactersComponent],
  exports: [CharactersComponent]
})
export class FfbeModule {}
