import {AppComponent} from '../app.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CharactersComponent} from './characters/characters.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CharactersService} from './services/characters.service';
import {DataMiningClientService} from './services/data-mining-client.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [CharactersComponent],
  exports: [CharactersComponent],
  providers: [CharactersService, DataMiningClientService]
})
export class FfbeModule {}
