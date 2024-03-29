import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/pages/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'forgot_password',
    loadChildren: './views/forgot-password/forgot-password.module#ForgotPasswordModule'
  },
  {
    path: 'change_password',
    loadChildren: './views/change-password/change-password.module#ChangePasswordModule'
  },
  {
    path: 'dashboard',
    loadChildren: './views/dashboard/dashboard.module#DashboardModule',
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
