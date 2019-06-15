import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './pages/reports.component';
import { EntryByGenderComponent } from './components/entry-by-gender/entry-by-gender.component';
import { EntryBetweenDateComponent } from './components/entry-between-date/entry-between-date.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent
  },
  {
    path: 'registrosPorSexo',
    component: EntryByGenderComponent
  },
  {
    path: 'registrosEntreFechas',
    component: EntryBetweenDateComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
