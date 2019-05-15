import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowPersonalFileRoutingModule } from './show-personal-file-routing.module';
import { ShowPersonalFileComponent } from './pages/show-personal-file.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { IgniteModule } from 'src/app/shared/ignite/ignite.module';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShowPersonalFileComponent, DateFormatPipe],
  imports: [
    CommonModule,
    ShowPersonalFileRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    IgniteModule
  ]
})
export class ShowPersonalFileModule { }
