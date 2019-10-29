import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // angular
    BrowserModule,
    BrowserAnimationsModule,
    // core & shared
    CoreModule,
    SharedModule,

    // app
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
