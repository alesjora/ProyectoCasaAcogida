import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowPersonalFileRoutingModule } from './show-personal-file-routing.module';
import { ShowPersonalFileComponent } from './pages/show-personal-file.component';

@NgModule({
  declarations: [ShowPersonalFileComponent],
  imports: [
    CommonModule,
    ShowPersonalFileRoutingModule
  ]
})
export class ShowPersonalFileModule { }
