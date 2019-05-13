import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryRecordsComponent } from './pages/entry-records.component';

const routes: Routes = [
  {
    path: '',
    component: EntryRecordsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryRecordsRoutingModule { }
