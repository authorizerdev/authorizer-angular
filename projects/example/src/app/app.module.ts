import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthorizerAngularModule } from 'authorizer-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AuthorizerAngularModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
