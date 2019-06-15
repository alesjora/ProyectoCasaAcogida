import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationFormRoutingModule } from './registration-form-routing.module';
import { RegistrationFormComponent } from './pages/registration-form.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IgniteModule } from 'src/app/shared/ignite/ignite.module';

@NgModule({
  declarations: [RegistrationFormComponent],
  imports: [
    CommonModule,
    RegistrationFormRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    IgniteModule
  ],
  exports: [RegistrationFormComponent],
  providers: []
})
export class RegistrationFormModule { }
