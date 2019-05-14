import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowPersonalFileRoutingModule } from './show-personal-file-routing.module';
import { ShowPersonalFileComponent } from './pages/show-personal-file.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { IgniteModule } from 'src/app/shared/ignite/ignite.module';

@NgModule({
  declarations: [ShowPersonalFileComponent],
  imports: [
    CommonModule,
    ShowPersonalFileRoutingModule,
    MaterialModule,
    IgniteModule
  ]
})
export class ShowPersonalFileModule { }
