import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardView, LoginView, ResetPasswordView } from './views';
import { AuthGuardService as AuthGuard } from './auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LoginView,
  },
  {
    path: 'dashboard',
    component: DashboardView,
    canActivate: [AuthGuard],
  },
  {
    path: 'reset-password',
    component: ResetPasswordView,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
