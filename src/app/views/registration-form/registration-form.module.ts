import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationFormRoutingModule } from './registration-form-routing.module';
import { RegistrationFormComponent } from './pages/registration-form.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IgxDatePickerModule, IgxIconModule, IgxInputGroupModule } from 'igniteui-angular';

@NgModule({
  declarations: [RegistrationFormComponent],
  imports: [
    CommonModule,
    RegistrationFormRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    IgxDatePickerModule,
    IgxIconModule,
		IgxInputGroupModule
  ],
  exports: [RegistrationFormComponent]
})
export class RegistrationFormModule { }
