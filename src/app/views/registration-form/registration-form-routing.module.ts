import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationFormComponent } from './pages/registration-form.component';
import { ConserjeGuard } from 'src/app/shared/guards/conserje.guard';

const routes: Routes = [
  {
    path: '',
    component: RegistrationFormComponent,
    //canActivate: [ConserjeGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationFormRoutingModule { }
