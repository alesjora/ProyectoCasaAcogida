import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowPersonalFileComponent } from './pages/show-personal-file.component';

const routes: Routes = [
  {
    path: '',
    component: ShowPersonalFileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowPersonalFileRoutingModule { }
