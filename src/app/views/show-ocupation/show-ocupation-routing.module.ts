import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowOcupationComponent } from './pages/show-ocupation.component';

const routes: Routes = [
  {
    path: '',
    component: ShowOcupationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowOcupationRoutingModule { }
