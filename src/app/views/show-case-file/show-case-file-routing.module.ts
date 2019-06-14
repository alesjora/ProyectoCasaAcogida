import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowCaseFileComponent } from './show-case-file.component';

const routes: Routes = [
  {
  path: '',
  component: ShowCaseFileComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowCaseFileRoutingModule { }
