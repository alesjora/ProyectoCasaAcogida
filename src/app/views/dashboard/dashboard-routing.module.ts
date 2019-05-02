import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  {
  path: '',
  component: DashboardComponent,
  children: [
    {
      path: 'registration-form',
      loadChildren: './../registration-form/registration-form.module#RegistrationFormModule'
    },
    {
      path: 'logout',
      component: LogoutComponent
    },
    {
      path: '**',
      redirectTo: ''
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
