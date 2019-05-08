import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewEntryComponent } from './pages/new-entry.component';

const routes: Routes = [
  {
    path: '',
    component: NewEntryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewEntryRoutingModule { }
