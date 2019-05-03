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
      path: 'inicio',
      loadChildren: './../inicio/inicio.module#InicioModule'
    },
    {
      path: 'nueva-ficha-personal',
      loadChildren: './../registration-form/registration-form.module#RegistrationFormModule'
    },
    {
      path: 'buscar-ficha-personal',
      loadChildren: './../search-personal-file/search-personal-file.module#SearchPersonalFileModule'
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
