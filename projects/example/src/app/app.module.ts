import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthorizerModule, AuthorizerContextService } from 'authorizer-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './auth-guard.service';
import { LoginView, DashboardView, ResetPasswordView } from './views';

@NgModule({
  declarations: [AppComponent, LoginView, DashboardView, ResetPasswordView],
  imports: [BrowserModule, AppRoutingModule, AuthorizerModule],
  providers: [AuthorizerContextService, AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
