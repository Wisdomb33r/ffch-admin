import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CharactersComponent} from './characters/characters.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CharactersService} from './services/characters.service';
import {DataMiningClientService} from './services/data-mining-client.service';
import {CharacterDisplayComponent} from './character-display/character-display.component';
import {BrowserModule} from '@angular/platform-browser';
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTableModule,
  MatCheckboxModule
} from '@angular/material';
import {LimitBurstsService} from './services/limit-bursts.service';
import {SkillsService} from './services/skills.service';
import {UnitDisplayComponent} from './unit-display/unit-display.component';
import {CharacterSkillsDisplayComponent} from './character-skills-display/character-skills-display.component';
import {FfchClientService} from './services/ffch-client.service';
import {SkillsComponent} from './skills/skills.component';
import {CharacterSkillDisplayComponent} from './character-skill-display/character-skill-display.component';
import {CharacterEquipmentsDisplayComponent} from './character-equipments-display/character-equipments-display.component';
import {UnitAwakeningMaterialsDisplayComponent} from './unit-awakening-materials-display/unit-awakening-materials-display.component';
import {EnhancementsComponent} from './enhancements/enhancements.component';
import {EnhancementsService} from './services/enhancements.service';
import {EnhancementsDisplayComponent} from './enhancements-display/enhancements-display.component';
import {EnhancementDisplayComponent} from './enhancement-display/enhancement-display.component';
import {FormuleDisplayComponent} from './formule-display/formule-display.component';
import {FormulesDisplayComponent} from './formules-display/formules-display.component';
import { ItemRecipesComponent } from './item-recipes/item-recipes.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  declarations: [
    CharactersComponent,
    CharacterDisplayComponent,
    UnitDisplayComponent,
    CharacterSkillsDisplayComponent,
    SkillsComponent,
    CharacterSkillDisplayComponent,
    CharacterEquipmentsDisplayComponent,
    UnitAwakeningMaterialsDisplayComponent,
    EnhancementsComponent,
    EnhancementsDisplayComponent,
    EnhancementDisplayComponent,
    FormuleDisplayComponent,
    FormulesDisplayComponent,
    ItemRecipesComponent,
  ],
  exports: [
    CharactersComponent,
    CharacterDisplayComponent,
    UnitDisplayComponent,
    CharacterSkillsDisplayComponent,
    SkillsComponent,
    CharacterSkillDisplayComponent,
    CharacterEquipmentsDisplayComponent,
    UnitAwakeningMaterialsDisplayComponent,
  ],
  providers: [
    DataMiningClientService,
    CharactersService,
    LimitBurstsService,
    SkillsService,
    FfchClientService,
    EnhancementsService,
  ]
})
export class FfbeModule {
}
