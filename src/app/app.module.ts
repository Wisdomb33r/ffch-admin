import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {CharactersComponent} from './ffbe/characters/characters.component';
import {FfbeModule} from './ffbe/ffbe.module';
import {CommonModule} from '@angular/common';
import {MenusComponent} from './menus/menus.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SkillsComponent} from './ffbe/skills/skills.component';
import {EnhancementsComponent} from './ffbe/enhancements/enhancements.component';
import {ItemRecipesComponent} from './ffbe/item-recipes/item-recipes.component';
import {ItemsComponent} from './ffbe/items/items.component';
import {LatentSkillsComponent} from './ffbe/latent-skills/latent-skills.component';
import {CharactersResolver} from './ffbe/characters/characters.resolver';

const appRoutes: Routes = [
  {path: 'ffbe/characters', component: CharactersComponent, resolve: {characters: CharactersResolver}},
  {path: 'ffbe/skills', component: SkillsComponent},
  {path: 'ffbe/enhancements', component: EnhancementsComponent},
  {path: 'ffbe/latent-skills', component: LatentSkillsComponent},
  {path: 'ffbe/items', component: ItemsComponent},
  {path: 'ffbe/recipes', component: ItemRecipesComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    MenusComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    FfbeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [MenusComponent]
})
export class AppModule {
}
