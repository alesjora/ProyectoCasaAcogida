import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaseFileFormComponent } from './case-file-form.component';

const routes: Routes = [
  {
    path: '',
    component: CaseFileFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseFileFormRoutingModule { }
