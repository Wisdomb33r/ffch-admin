import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {CharactersComponent} from './ffbe/characters/characters.component';
import {FfbeModule} from './ffbe/ffbe.module';

const appRoutes: Routes = [
  {path: 'ffbe/characters', component: CharactersComponent},
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FfbeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
