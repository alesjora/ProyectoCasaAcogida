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
      path: 'ocupacion',
      loadChildren: './../show-ocupation/show-ocupation.module#ShowOcupationModule'
    },
    {
      path: 'nuevo-ingreso',
      loadChildren: './../new-entry/new-entry.module#NewEntryModule'
    },
    {
      path: 'registros',
      loadChildren: './../entry-records/entry-records.module#EntryRecordsModule'
    },
    {
      path: 'fichas-personales',
      loadChildren: './../search-personal-file/search-personal-file.module#SearchPersonalFileModule'
    },
    {
      path: 'informes',
      loadChildren: './../reports/reports.module#ReportsModule'
    },
    {
      path: 'ficha-personal/:id',
      loadChildren: './../show-personal-file/show-personal-file.module#ShowPersonalFileModule'
    },
    {
      path: 'formulario-expediente/:id',
      loadChildren: './../case-file-form/case-file-form.module#CaseFileFormModule'
    },
    {
      path: 'ver-expediente/:id',
      loadChildren: './../show-case-file/show-case-file.module#ShowCaseFileModule'
    },
    {
      path: 'logout',
      component: LogoutComponent
    },
    // {
    //   path: '**',
    //   redirectTo: ''
    // }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
