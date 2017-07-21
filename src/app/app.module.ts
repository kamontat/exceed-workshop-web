import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule, JsonpModule }           from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from 'clarity-angular';

import { MdSlideToggleModule } from '@angular/material';

import { AppComponent } from './app.component';

import { AppService } from './app.service';
import { DbService } from './db.service';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    JsonpModule,
    InMemoryWebApiModule.forRoot(DbService),
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MdSlideToggleModule,
    ClarityModule.forRoot()
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
