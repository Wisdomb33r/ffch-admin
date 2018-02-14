import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CharactersComponent} from './characters/characters.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CharactersService} from './services/characters.service';
import {DataMiningClientService} from './services/data-mining-client.service';
import {CharacterDisplayComponent} from './character-display/character-display.component';
import {BrowserModule} from '@angular/platform-browser';
import {MatProgressSpinnerModule} from '@angular/material';
import {LimitBurstsService} from './services/limit-bursts.service';
import {SkillsService} from './services/skills.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  declarations: [CharactersComponent, CharacterDisplayComponent],
  exports: [CharactersComponent, CharacterDisplayComponent],
  providers: [
    DataMiningClientService,
    CharactersService,
    LimitBurstsService,
    SkillsService,
  ]
})
export class FfbeModule {
}
