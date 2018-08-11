import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {CharactersComponent} from './ffbe/characters/characters.component';
import {FfbeModule} from './ffbe/ffbe.module';
import {CommonModule} from '@angular/common';
import {MenusComponent} from './menus/menus.component';
import {MatButtonModule, MatCardModule, MatMenuModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SkillsComponent} from './ffbe/skills/skills.component';
import {EnhancementsComponent} from './ffbe/enhancements/enhancements.component';

const appRoutes: Routes = [
  {path: 'ffbe/characters', component: CharactersComponent},
  {path: 'ffbe/skills', component: SkillsComponent},
  {path: 'ffbe/enhancements', component: EnhancementsComponent},
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
