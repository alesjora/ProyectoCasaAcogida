import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowOcupationRoutingModule } from './show-ocupation-routing.module';
import { ShowOcupationComponent } from './pages/show-ocupation.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { IgniteModule } from 'src/app/shared/ignite/ignite.module';

@NgModule({
  declarations: [ShowOcupationComponent],
  imports: [
    CommonModule,
    ShowOcupationRoutingModule,
    MaterialModule,
    IgniteModule
  ]
})
export class ShowOcupationModule { }
