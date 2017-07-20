import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule }           from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from 'clarity-angular';

import { MdSlideToggleModule } from '@angular/material';

import { AppComponent } from './app.component';

import { AppService } from './app.service';
import { DbService } from './db.service';

import 'hammerjs';

import { StatusComponent } from './status/status.component';

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(DbService),
    AppRoutingModule,
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
