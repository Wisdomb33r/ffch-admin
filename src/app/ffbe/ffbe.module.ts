import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CharactersComponent} from './characters/characters.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CharactersService} from './services/characters.service';
import {DataMiningClientService} from './services/data-mining-client.service';
import {CharacterDisplayComponent} from './character-display/character-display.component';
import {BrowserModule} from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {LimitBurstsService} from './services/limit-bursts.service';
import {SkillsService} from './services/skills.service';
import {UnitDisplayComponent} from './unit-display/unit-display.component';
import {SkillsDisplayComponent} from './skills-display/skills-display.component';
import {FfchClientService} from './services/ffch-client.service';
import {SkillsComponent} from './skills/skills.component';
import {SkillDisplayComponent} from './skill-display/skill-display.component';
import {CharacterEquipmentsDisplayComponent} from './character-equipments-display/character-equipments-display.component';
import {UnitAwakeningMaterialsDisplayComponent} from './unit-awakening-materials-display/unit-awakening-materials-display.component';
import {EnhancementsComponent} from './enhancements/enhancements.component';
import {EnhancementsService} from './services/enhancements.service';
import {EnhancementsDisplayComponent} from './enhancements-display/enhancements-display.component';
import {EnhancementDisplayComponent} from './enhancement-display/enhancement-display.component';
import {FormuleDisplayComponent} from './formule-display/formule-display.component';
import {FormulesDisplayComponent} from './formules-display/formules-display.component';
import {ItemRecipesComponent} from './item-recipes/item-recipes.component';
import {RecettesDisplayComponent} from './recettes-display/recettes-display.component';
import {RecetteDisplayComponent} from './recette-display/recette-display.component';
import {ConsumablesService} from './services/consumables.service';
import {ItemRecipesService} from './services/item-recipes.service';
import {ItemsService} from './services/items.service';
import {EquipmentsService} from './services/equipments.service';
import {MateriasService} from './services/materias.service';
import {ClipboardModule} from 'ngx-clipboard';
import {CompetencesComparingContainerDisplayComponent} from './competences-comparing-container-display/competences-comparing-container-display.component';
import {ItemsComponent} from './items/items.component';
import {ObjetsDisplayComponent} from './objets-display/objets-display.component';
import {ObjetDisplayComponent} from './objet-display/objet-display.component';
import {ObjetCaracDisplayComponent} from './objet-carac-display/objet-carac-display.component';
import {ObjetElementsDisplayComponent} from './objet-elements-display/objet-elements-display.component';
import {ObjetElementsTripletDisplayComponent} from './objet-elements-triplet-display/objet-elements-triplet-display.component';
import {ObjetAlterationsEtatDuoDisplayComponent} from './objet-alterations-etat-duo-display/objet-alterations-etat-duo-display.component';
import {ObjetAlterationsEtatDisplayComponent} from './objet-alterations-etat-display/objet-alterations-etat-display.component';
import {LatentSkillsComponent} from './latent-skills/latent-skills.component';
import {LatentSkillsService} from './services/latent-skills.service';

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
    MatCheckboxModule,
    ClipboardModule,
  ],
  declarations: [
    CharactersComponent,
    CharacterDisplayComponent,
    UnitDisplayComponent,
    SkillsDisplayComponent,
    SkillsComponent,
    SkillDisplayComponent,
    CharacterEquipmentsDisplayComponent,
    UnitAwakeningMaterialsDisplayComponent,
    EnhancementsComponent,
    EnhancementsDisplayComponent,
    EnhancementDisplayComponent,
    FormuleDisplayComponent,
    FormulesDisplayComponent,
    ItemRecipesComponent,
    RecettesDisplayComponent,
    RecetteDisplayComponent,
    CompetencesComparingContainerDisplayComponent,
    ItemsComponent,
    ObjetsDisplayComponent,
    ObjetDisplayComponent,
    ObjetCaracDisplayComponent,
    ObjetElementsDisplayComponent,
    ObjetElementsTripletDisplayComponent,
    ObjetAlterationsEtatDuoDisplayComponent,
    ObjetAlterationsEtatDisplayComponent,
    LatentSkillsComponent,
  ],
  exports: [
    CharactersComponent,
    CharacterDisplayComponent,
    UnitDisplayComponent,
    SkillsDisplayComponent,
    SkillsComponent,
    SkillDisplayComponent,
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
    ConsumablesService,
    ItemRecipesService,
    ItemsService,
    EquipmentsService,
    MateriasService,
    LatentSkillsService,
  ]
})
export class FfbeModule {
}
