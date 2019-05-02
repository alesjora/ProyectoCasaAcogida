import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPersonalFileComponent } from './pages/search-personal-file.component';

const routes: Routes = [
  {
    path: '',
    component: SearchPersonalFileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchPersonalFileRoutingModule { }
