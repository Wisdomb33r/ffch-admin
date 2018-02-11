import {AppComponent} from '../app.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CharactersComponent} from './characters/characters.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CharactersService} from './services/characters.service';
import {DataMiningClientService} from './services/data-mining-client.service';
import {CharacterDisplayComponent} from './character-display/character-display.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [CharactersComponent, CharacterDisplayComponent],
  exports: [CharactersComponent, CharacterDisplayComponent],
  providers: [CharactersService, DataMiningClientService]
})
export class FfbeModule {}
