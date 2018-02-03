import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {FfbeModule} from './ffbe/ffbe.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FfbeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
