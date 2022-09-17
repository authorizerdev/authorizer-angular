import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardView, LoginView, ResetPasswordView } from './views';

const routes: Routes = [
  {
    path: '',
    component: LoginView,
  },
  {
    path: 'dashboard',
    component: DashboardView,
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
