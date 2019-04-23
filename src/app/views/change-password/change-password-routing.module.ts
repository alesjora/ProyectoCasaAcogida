import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './pages/change-password.component';
import { PasswordMatcherDirective } from 'src/app/shared/password-matcher.directive';

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PasswordMatcherDirective]
})
export class ChangePasswordRoutingModule { }
